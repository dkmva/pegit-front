import React, { Component } from 'react';
import { connect } from "react-redux";

import {Container, Row, Col, Card, Nav, Form, Button, ButtonGroup } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';

import { SeqViz } from 'seqvizcustom/viewer';
import { COLORS } from "seqvizcustom/utils/colors";

import { routePegRNADetail, routeJobDetail, routeJobSummary } from 'state/routes';
import OrganismBox from "view/Shared/OrganismBox";
import SequenceBox from "view/Shared/SequenceBox";
import JobStatusBox from "./components/JobStatusBox";
import { OligosBox } from "./components/OligosBox";
import EditBox from "./components/EditBox";

import { LoadingCard } from 'view/Loading';

import { IconContext } from "react-icons";
import { FaRegCheckCircle, FaRegTimesCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Header, onTargetFormatter, offTargetFormatter, spacerURL, strandFormatter, primerFormatter } from './components/formatters'
import { pegRNASpacerPosition, pegRNAExtensionPosition } from "./functions/positionCalculations";
import NucleaseBox from "../Shared/NucleaseBox";

export class Job extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'pegRNAs',
        }
    }

    render() {

        const { jobId, pegRNAs, organism, edits=[], edit, status='Loading', queuePosition, editOptions, sequenceType,
                sequenceObject, warning, minPos, primers, routeJobDetail, routeJobSummary,
                chosenEdit, visualSequence, translations, nuclease } = this.props;
        const { annotations } = sequenceObject;
        const { selectedTab } = this.state;
        const chosenEditIndex = edits.map((e, i) => 'edit' + i).indexOf(chosenEdit);

        const pegRNAColumns = [{
            dataField: 'spacer',
            text: 'Spacer',
            formatter: (cell ) => spacerURL(routePegRNADetail(jobId, chosenEdit, cell), cell),
            headerFormatter: (column) => Header(column, 'Sequence of the sgRNA spacer'),
        }, {
            dataField: 'distance',
            text: 'Distance',
            headerFormatter: (column) => Header(column, 'Distance between Cas9 nicking site and mutation'),
        }, {
            dataField: 'pamDisrupted',
            text: 'PAM disrupted',
            headerFormatter: (column) => Header(column, 'Whether the pegRNA PAM will be disrupted by the edit'),
            formatter: (cell, row) => (
                cell ? <IconContext.Provider value={{ className: "text-success" }}><FaRegCheckCircle /></IconContext.Provider>
                : (row.pamSilenced ? <IconContext.Provider value={{ className: "text-warning" }}><FaRegCheckCircle /></IconContext.Provider>
                : <IconContext.Provider value={{ className: "text-danger" }}><FaRegTimesCircle /></IconContext.Provider> ))
        }, {
            dataField: 'oligos',
            isDummyField: true,
            text: 'Oligos',
            headerFormatter: (column) => Header(column, 'Oligos for recommended design'),
            formatter: (cell, row) => <OligosBox pegRNA={row} />
        }, {
            dataField: 'strand',
            text: 'Strand',
            formatter: strandFormatter,
            headerFormatter: (column) => Header(column, 'Spacer strand, relative to target sequence'),
        }, {
            dataField: 'pbsLength',
            text: 'PBS length',
            headerFormatter: (column) => Header(column, 'Length of the pegRNA primer binding site'),
        }, {
            dataField: 'rtTemplateLength',
            text: 'RTT length',
            headerFormatter: (column) => Header(column, 'Length of the pegRNA reverse transcriptase template'),
        }, {
            dataField: 'score',
            text: 'On Target Score',
            formatter: onTargetFormatter,
            headerFormatter: (column) => Header(column, 'Score based on Doench et. al, 2016'),
        }, {
            dataField: 'offtargets',
            text: 'Targets',
            formatter: offTargetFormatter,
            headerFormatter: (column) => Header(column, 'Potential Targets with [0,1,2,3] mismatches. Also includes on target if present in the genome.'),
        },
        ];

        const primerColumns = [
            {
                dataField: 'primers.LEFT.SEQUENCE',
                text: 'Left primer',
                //headerFormatter: (column) => Header(column, 'Distance between Cas9 nicking site and mutation'),
            }, {
                dataField: 'primers.LEFT.TM',
                text: 'Left primer TM',
                //headerFormatter: (column) => Header(column, 'Distance between Cas9 nicking site and mutation'),
            }, {
                dataField: 'primers.RIGHT.SEQUENCE',
                text: 'Right primer',
                //headerFormatter: (column) => Header(column, 'Distance between Cas9 nicking site and mutation'),
            }, {
                dataField: 'primers.RIGHT.TM',
                text: 'Right primer TM',
                //headerFormatter: (column) => Header(column, 'Distance between Cas9 nicking site and mutation'),
            }, {
                dataField: 'primers.PAIR.PRODUCT_SIZE',
                text: 'Product size',
                //headerFormatter: (column) => Header(column, 'Distance between Cas9 nicking site and mutation'),
            }, {
                dataField: 'productCount',
                text: 'Products',
                formatter: (cell) => primerFormatter(cell, status),
            }
        ];

        let seqvizPegRNAs = [];

        pegRNAs.forEach((pegRNA, i) => {
            seqvizPegRNAs.push({
                primerName: `SPACER ${i+1}`,
                id: `SPACER ${i+1}`,
                seq: pegRNA.visualSpacer,
                color: COLORS[i%12],
                direction: pegRNA.strand,
                //start: pegRNA.position,
                //end: pegRNA.position + pegRNA.visualSpacer.length,
                ...pegRNASpacerPosition(pegRNA, visualSequence),
            });

            seqvizPegRNAs.push({
                primerName: `EXTENSION ${i+1}`,
                id: `EXTENSION ${i+1}`,
                seq: pegRNA.visualExtension,
                color: COLORS[i%12],
                direction: -pegRNA.strand,
                ...pegRNAExtensionPosition(pegRNA, visualSequence),
            });
        });

        return (
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Button variant="outline-dark" onClick={() => routeJobSummary(jobId)}>
                            <FaArrowLeft />Back to edit list
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            as="select"
                            custom
                            onChange={(e) => routeJobDetail(jobId, e.target.value)}
                            value={chosenEdit}
                        >
                            {edits.map((e, i) => <option value={'edit' + i} key={i}>{e.sequenceType === 'custom' ? e.sequence.split(',')[0] : e.sequence} {e.edit} {e.options}</option>)}
                        </Form.Control>
                    </Col>
                    <Col md={3}>
                        <ButtonGroup style={{float: 'right'}}>
                        <Button variant="outline-dark" onClick={ () => routeJobDetail(jobId, 'edit' + (chosenEditIndex - 1)) } disabled={ chosenEditIndex === 0 }>
                            <FaArrowLeft/>Prev
                        </Button>
                        <Button variant="outline-dark" onClick={ () => routeJobDetail(jobId, 'edit' + (chosenEditIndex + 1)) } disabled={ chosenEditIndex === edits.length - 1 }>
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
                                <Col>
                                    <OrganismBox organism={organism} />
                                    <br />
                                    <SequenceBox baseURL={organism.sequenceSearch} sequenceType={sequenceType} sequenceObject={sequenceObject} />
                                    <br />
                                    <NucleaseBox nuclease={nuclease} />
                                </Col>
                                <Col style={{borderLeft: '1px solid rgba(0,0,0,.1)'}}>
                                    <JobStatusBox jobId={jobId} jobStatus={status} warning={warning} queuePosition={queuePosition}/>
                                </Col>
                                <Col style={{borderLeft: '1px solid rgba(0,0,0,.1)'}}>
                                    <EditBox edit={edit} editOptions={editOptions}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    { !['Loading'].includes(status) ? <SeqViz
                                        name="jobSequence"
                                        seq={visualSequence}
                                        annotations={annotations}
                                        showAnnotations={false}
                                        translations={translations}
                                        primers={seqvizPegRNAs}
                                        showPrimers={true}
                                        style={{ height: "45vh", width: "100%", backgroundColor: "#fff", marginBottom: "10px" }}
                                        viewer="linear"
                                        showComplement={false}
                                        showIndex={true}
                                        zoom={{ linear: 11 }}
                                        upstream={-minPos}
                                        //copyEvent={event => event.key === "c" && (event.metaKey || event.ctrlKey)}
                                        //findBindingSites={true}
                                    /> : <LoadingCard size={10} style={{ lineHeight: "calc(45vh - 40px)", height: "45vh" }}/>}
                                </Col>
                            </Row>
                        </Card>
                        <Nav variant="tabs" activeKey={selectedTab} onSelect={(k) => this.setState({selectedTab: k})} fill>
                            <Nav.Item>
                                <Nav.Link eventKey='pegRNAs'>pegRNAs</Nav.Link>
                            </Nav.Item>
                            {primers.length > 0 && <Nav.Item>
                                <Nav.Link eventKey='primers'>Sequencing primers</Nav.Link>
                            </Nav.Item>}
                        </Nav>
                        <Card>
                            <Row>
                                <Col>
                                    {selectedTab === 'pegRNAs' ? <BootstrapTable
                                        keyField='idx'
                                        bootstrap4={true}
                                        bordered={false}
                                        data={pegRNAs.map((p, i) => ({...p, idx: i}))}
                                        columns={pegRNAColumns}
                                        striped
                                        hover
                                    /> : <BootstrapTable
                                        keyField='id'
                                        bootstrap4={true}
                                        bordered={false}
                                        data={primers}
                                        columns={primerColumns}
                                        striped
                                        hover
                                        />
                                    }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {

    let { jobId, organism, edits, status, nuclease } = state.job.summary;
    organism = organism ? organism : {name: undefined, assembly: undefined, source: undefined };
    let { pegRNAs=[], primers=[], edit, queuePosition, warning, options='', sequenceType, start, nickingOffset, visualSequence, translations=[] } = state.job.detail;

    let {sequenceObject = {id: 'undefined', name: 'undefined', source: 'undefined', sequence: ''}} = state.job.detail;

    return {
        organism,
        jobId,
        pegRNAs,
        edit,
        status,
        warning,
        editOptions: options || '',
        sequenceObject,
        visualSequence,
        translations: translations.map(t => ({...t, direction: 1})),
        sequenceType,
        primers,
        queuePosition,
        edits,
        minPos: start + nickingOffset,
        chosenEdit: state.location.payload.edit,
        nuclease,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        routeJobDetail: (jobId, idx) => dispatch(routeJobDetail(jobId, idx)),
        routeJobSummary: (jobId) => dispatch(routeJobSummary(jobId)),
    }
};

export const ConnectedJob = connect(mapStateToProps, mapDispatchToProps)(Job);