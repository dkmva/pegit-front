import React, { Component } from 'react';
import { connect } from "react-redux";

import {Container, Row, Col, Card, Button, Form, ButtonGroup} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import OrganismBox from "view/Shared/OrganismBox";
import SequenceBox from "view/Shared/SequenceBox";
import EditBox from "./components/EditBox";
import JobStatusBox from "./components/JobStatusBox";
import { routePegRNADetail, routeNickingDetail } from 'state/routes';

import { offTargetColumns } from './components/columns'
import NucleaseSense from './components/NucleaseSense'
import NucleaseAntiSense from './components/NucleaseAntiSense'
import NucleaseBox from "../Shared/NucleaseBox";

export class NickingDetail extends Component {

    render() {

        const { jobId, organism, sequenceObject, status, sequenceType, nicking, edit, editOptions, warning, chosenEdit,
            pegRNAs, chosenPegRNA, pegRNA, chosenNicking, routePegRNADetail, routeNickingDetail, nuclease } = this.props;
        const { spacer='', offtargets=[[],[]] } = nicking;

        const chosenNickingIndex = pegRNA.nicking.map(n => n.spacer).indexOf(chosenNicking);
        return (
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Button variant="outline-dark" onClick={() => routePegRNADetail(jobId, chosenEdit, chosenPegRNA)}>
                            <FaArrowLeft />Back to nicking sgRNA list
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            as="select"
                            custom
                            onChange={(e) => routeNickingDetail(jobId, chosenEdit, chosenPegRNA, e.target.value)}
                            value={chosenNicking}
                        >
                            {pegRNA.nicking.map(p => <option value={p.spacer} key={p.spacer}>{p.kind}: {p.spacer} {p.position}</option>)}
                        </Form.Control>
                    </Col>
                    <Col md={3}>
                        <ButtonGroup style={{float: 'right'}}>
                            <Button variant="outline-dark" onClick={ () => routeNickingDetail(jobId, chosenEdit, chosenPegRNA, pegRNA.nicking[chosenNickingIndex - 1].spacer) } disabled={ chosenNickingIndex === 0 }>
                                <FaArrowLeft/>Prev
                            </Button>
                            <Button variant="outline-dark" onClick={ () => routeNickingDetail(jobId, chosenEdit, chosenPegRNA, pegRNA.nicking[chosenNickingIndex + 1].spacer) } disabled={ chosenNickingIndex === pegRNAs.length - 1  }>
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
                                    <EditBox edit={edit} editOptions={editOptions}/>
                                </Col>
                                <Col md={8}>
                                    {pegRNA.strand === -1 ?
                                        <NucleaseSense spacer={spacer}/> :
                                        <NucleaseAntiSense spacer={spacer}/>
                                    }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <br/>
                    <Row>
                        <Col>
                            <Card>
                                <BootstrapTable
                                    keyField='idx'
                                    data={ offtargets[1].map((obj, i) => ({...obj, idx: i})) }
                                    columns={ offTargetColumns }
                                    bootstrap4={true}
                                    bordered={false}
                                    defaultSorted={[{dataField: 'kind', order: 'desc'}]}
                                    striped
                                    hover
                                    height='60vh'
                                />
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
    let { pegRNAs=[], edit, warning, options='', sequenceType } = state.job.detail;

    let {sequenceObject = {id: 'undefined', name: 'undefined', source: 'undefined', sequence: ''}} = state.job.detail;

    let { pegRNA, nicking } = state.location.payload;
    pegRNA = pegRNAs.find(p => p.spacer === pegRNA) || {nicking: []};
    nicking = pegRNA.nicking.find(n => n.spacer === nicking) || {};


    return {
        organism,
        jobId,
        pegRNA,
        sequenceObject,
        status,
        sequenceType,
        nicking,
        warning,
        edit,
        editOptions: options,
        chosenEdit: state.location.payload.edit,
        chosenPegRNA: state.location.payload.pegRNA,
        chosenNicking: state.location.payload.nicking,
        pegRNAs,
        nuclease,
    }


};

const mapDispatchToProps = (dispatch) => {
    return {
        routePegRNADetail: (jobId, edit, pegRNA) => dispatch(routePegRNADetail(jobId, edit, pegRNA)),
        routeNickingDetail: (jobId, edit, pegRNA, nicking) => dispatch(routeNickingDetail(jobId, edit, pegRNA, nicking)),
    }
};

export const ConnectedNickingDetail = connect(mapStateToProps, mapDispatchToProps)(NickingDetail);