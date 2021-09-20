import React, { Component } from 'react';
import { connect } from "react-redux";

import {Container, Row, Col, Card, Nav, Button, Form, ButtonGroup} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { SeqViz } from 'seqvizcustom/viewer';
import { COLORS } from "seqvizcustom/utils/colors";

import OrganismBox from "view/Shared/OrganismBox";
import SequenceBox from "view/Shared/SequenceBox";
import EditBox from "./components/EditBox";
import { NickingOligosBox } from "./components/OligosBox";

import { routePegRNADetail, routeJobDetail, routeNickingDetail } from 'state/routes';

import { Header, offTargetFormatter, onTargetFormatter, spacerURL } from './components/formatters'
import { offTargetColumns, alternateColumns } from './components/columns'
import JobStatusBox from "./components/JobStatusBox";
import { pegRNASpacerPosition, pegRNAExtensionPosition, nickingGRNASpacerPosition } from "./functions/positionCalculations";

import NucleaseSense from './components/NucleaseSense'
import NucleaseAntiSense from './components/NucleaseAntiSense'
import NucleaseBox from "../Shared/NucleaseBox";

export class PegRNADetail extends Component {

    constructor(props) {
        super(props);
        const { pegRNA } = props;
        let { nicking= [] } = pegRNA;
        this.state = {
            selectedTab: nicking.length > 0 ? 'table' : 'extensions',
        }
    }

    render() {

        const { jobId, organism, sequenceObject, status, sequenceType, pegRNA, warning, edit, options,
                minPos, chosenEdit, routeJobDetail, routePegRNADetail, pegRNAs, chosenPegRNA,
                visualSequence, nickingOffset, translations, nuclease, showScore } = this.props;
        let { nicking=[], spacer='', offtargets=[[],[]], alternateExtensions=[]} = pegRNA;
        const { selectedTab } = this.state;
        const chosenPegRNAIndex = pegRNAs.map(p => p.spacer).indexOf(chosenPegRNA);

        let columns = [{
            dataField: 'spacer',
            text: 'Spacer',
            sort: true,
            formatter: (cell ) => spacerURL(routeNickingDetail(jobId, chosenEdit, pegRNA.spacer, cell), cell),
            headerFormatter: (column) => Header(column, 'Sequence of the sgRNA spacer'),
        }, {
            dataField: 'position',
            text: 'Position',
            sort: true,
            headerFormatter: (column) => Header(column, 'Position of the cut site, relative to pegRNA cut site'),
        }, {
            dataField: 'kind',
            text: 'Kind',
            sort: true,
            headerFormatter: (column) => Header(column, 'Whether the cut site unique for the mutation (3b) or not (3a)'),
        }, {
            dataField: 'oligos',
            dummyField: true,
            text: 'Oligos',
            formatter: (cell, row) => <NickingOligosBox nicking={row} />,
            headerFormatter: (column) => Header(column, 'Oligos for cloning nicking sgRNA.'),
        }];

        if(showScore) {
            columns.push({
                dataField: 'wtScore',
                text: 'Wild type score',
                formatter: onTargetFormatter,
                headerFormatter: (column) => Header(column, 'Target score on wild type sequence'),
            })
            columns.push({
                dataField: 'score',
                text: 'On Target Score',
                formatter: onTargetFormatter,
                headerFormatter: (column) => Header(column, 'Target score on edited sequence'),
            });
        }
        columns.push({
            dataField: 'offtargets',
            text: 'Targets',
            formatter: offTargetFormatter,
            headerFormatter: (column) => Header(column, 'Potential (off) targets with [0,1,2,3] mismatches'),
        });

        let primers = [];

        if(pegRNA.hasOwnProperty('visualSpacer')) {
            primers.push({
                primerName: `SPACER`,
                id: `SPACER`,
                seq: pegRNA.visualSpacer,
                color: 'red',
                opacity: .5,
                direction: pegRNA.strand,
                ...pegRNASpacerPosition(pegRNA, visualSequence, nickingOffset),
            });
            primers.push({
                primerName: `EXTENSION`,
                id: `EXTENSION`,
                seq: pegRNA.visualExtension,
                color: 'red',
                opacity: .5,
                direction: -pegRNA.strand,
                ...pegRNAExtensionPosition(pegRNA, visualSequence, nickingOffset),
            });
            primers = primers.concat(nicking.map((n,i) => ({
                primerName: `NICKING ${n.position}`,
                id: `NICKING ${n.position}`,
                seq: n.visualSpacer,
                color: COLORS[i%12],
                direction: -pegRNA.strand,
                //strict: n.kind === '3a',
                ...nickingGRNASpacerPosition(pegRNA, n, visualSequence, nickingOffset),
            })))
        }

        return (
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Button variant="outline-dark" onClick={() => routeJobDetail(jobId, chosenEdit)}>
                            <FaArrowLeft />Back to pegRNA list
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            as="select"
                            custom
                            onChange={(e) => routePegRNADetail(jobId, chosenEdit, e.target.value)}
                            value={pegRNA.spacer}
                        >
                            {pegRNAs.map(p => <option value={p.spacer} key={p.spacer}>{p.spacer}</option>)}
                        </Form.Control>
                    </Col>
                    <Col md={3}>
                        <ButtonGroup style={{float: 'right'}}>
                            <Button variant="outline-dark" onClick={ () => routePegRNADetail(jobId, chosenEdit, pegRNAs[chosenPegRNAIndex - 1].spacer) } disabled={ chosenPegRNAIndex === 0 }>
                                <FaArrowLeft/>Prev
                            </Button>
                            <Button variant="outline-dark" onClick={ () => routePegRNADetail(jobId, chosenEdit, pegRNAs[chosenPegRNAIndex + 1].spacer) } disabled={ chosenPegRNAIndex === pegRNAs.length - 1  }>
                                <FaArrowRight/>Next
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Card body>
                            <Row>
                                <Col md={4}>
                                    <OrganismBox organism={organism} />
                                    <SequenceBox baseURL={organism.sequenceSearch} sequenceType={sequenceType} sequenceObject={sequenceObject} />
                                    <NucleaseBox nuclease={nuclease} />
                                    <label style={{display: 'block'}}>Spacer sequence</label>
                                    <strong className="info text-primary mono">{spacer}</strong>
                                    <hr/>
                                    <JobStatusBox jobId={jobId} jobStatus={status} warning={warning}/>
                                    <hr/>
                                    <EditBox edit={edit} editOptions={options} nuclease={nuclease}/>
                                </Col>
                                <Col md={8}>
                                    {pegRNA.strand === 1 ?
                                        <NucleaseSense spacer={pegRNA.spacer} rtTemplate={pegRNA.rtTemplate}
                                                       pbs={pegRNA.pbs} /> :
                                        <NucleaseAntiSense spacer={pegRNA.spacer} rtTemplate={pegRNA.rtTemplate}
                                                           pbs={pegRNA.pbs} />
                                    }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <br/>
                    <Row>
                        <Col>
                            <Nav variant="tabs" activeKey={selectedTab} onSelect={(k) => this.setState({selectedTab: k})} fill>
                                { nicking.length > 0 && <Nav.Item>
                                    <Nav.Link eventKey='table'>Nicking sgRNAs Table</Nav.Link>
                                </Nav.Item> }
                                { nicking.length > 0 && <Nav.Item>
                                    <Nav.Link eventKey='sequence'>Nicking sgRNAs Sequence View</Nav.Link>
                                </Nav.Item> }
                                { offtargets[1] && <Nav.Item>
                                    <Nav.Link eventKey='offtargets'>Targets</Nav.Link>
                                </Nav.Item> }
                                { alternateExtensions.length > 0 && <Nav.Item>
                                    <Nav.Link eventKey='extensions'>Alternate extensions</Nav.Link>
                                </Nav.Item> }
                            </Nav>
                            <Card>
                                {selectedTab === 'table' &&
                                    <BootstrapTable
                                        keyField='spacer'
                                        data={ nicking }
                                        columns={ columns }
                                        bootstrap4={true}
                                        bordered={false}
                                        defaultSorted={[{dataField: 'kind', order: 'desc'}]}
                                        striped
                                        hover
                                        height='60vh'
                                    />}
                                {selectedTab === 'sequence' && <SeqViz
                                    name="jobSequence"
                                    seq={visualSequence}
                                    translations={translations}
                                    primers={primers}
                                    showPrimers={true}
                                    style={{ height: "90vh", width: "100%" }}
                                    viewer="linear"
                                    showComplement={false}
                                    upstream={-minPos}
                                    //copyEvent={event => event.key === "c" && (event.metaKey || event.ctrlKey)}
                                    //findBindingSites={true}
                                />}
                                {selectedTab === 'offtargets' &&
                                <BootstrapTable
                                    keyField='off target site'
                                    data={ offtargets[1] }
                                    columns={ offTargetColumns }
                                    bootstrap4={true}
                                    bordered={false}
                                    defaultSorted={[{dataField: 'kind', order: 'desc'}]}
                                    striped
                                    hover
                                    height='60vh'
                                />}
                                {selectedTab === 'extensions' &&
                                <BootstrapTable
                                    keyField='sequence'
                                    data={ alternateExtensions }
                                    columns={ alternateColumns }
                                    bootstrap4={true}
                                    bordered={false}
                                    striped
                                    hover
                                    height='60vh'
                                />}
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {


    let { jobId, organism, status, nuclease } = state.job.summary;
    organism = organism ? organism : {name: undefined, assembly: undefined, source: undefined };
    let { pegRNAs=[], edit, warning, options='', sequenceType, start, visualNicking, nickingOffset, translations=[] } = state.job.detail;

    let {sequenceObject = {id: 'undefined', name: 'undefined', source: 'undefined', sequence: ''}} = state.job.detail;

    let { pegRNA } = state.location.payload;
    pegRNA = pegRNAs.find(p => p.spacer === pegRNA) || {};

    let showScore = false;
    state.nucleases.nucleases.filter(e => e.name === nuclease).forEach(e => showScore = e.canScoreSpacers);

    return {
        organism,
        jobId,
        pegRNA,
        sequenceObject,
        status,
        sequenceType,
        warning,
        edit,
        options,
        visualSequence: visualNicking,
        nickingOffset,
        translations: translations.map(t => ({ ...t, start: t.start + nickingOffset, end: t.end + nickingOffset, direction: 1 })),
        minPos: start,
        chosenEdit: state.location.payload.edit,
        chosenPegRNA: state.location.payload.pegRNA,
        pegRNAs,
        nuclease,
        showScore,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        routeJobDetail: (jobId, edit) => dispatch(routeJobDetail(jobId, edit)),
        routePegRNADetail: (jobId, edit, pegRNA) => dispatch(routePegRNADetail(jobId, edit, pegRNA)),
    }
};

export const ConnectedPegRNADetail = connect(mapStateToProps, mapDispatchToProps)(PegRNADetail);