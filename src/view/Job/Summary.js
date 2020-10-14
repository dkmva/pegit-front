import React from 'react';
import {connect} from "react-redux";

import {Card, Col, Container, Row, Button } from "react-bootstrap";
import JobStatusBox from "./components/JobStatusBox";
import BootstrapTable from "react-bootstrap-table-next";

import OrganismBox from "view/Shared/OrganismBox";
import { routeJobDetail } from 'state/routes';

import { FaDownload } from 'react-icons/fa';
import NucleaseBox from "../Shared/NucleaseBox";
import nucleases from "../../state/nucleases";

export const Summary = ({ organism={}, jobId, status, summary=[], routeJobDetail, warning, options={}, queuePosition, nuclease, excelExported=false }) => {

    return <Container fluid>
            <Row>
                <Col>
                    <Card body>
                        <Row>
                            <Col>
                                <OrganismBox organism={organism} />
                                <br />
                                <NucleaseBox nuclease={nuclease} />
                            </Col>
                            <Col style={{borderLeft: '1px solid rgba(0,0,0,.1)'}}>
                                <JobStatusBox jobId={jobId} jobStatus={status} warning={warning} queuePosition={queuePosition}/>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <b>Options:</b>
                                <dl className="row">
                                    {Object.entries(options).map(([k, v]) => {
                                        return <React.Fragment key={k}>
                                            <dt className="col-sm-2">{k}</dt>
                                            <dd className="col-sm-1">{v}</dd>
                                        </React.Fragment>
                                    })
                                    }
                                </dl>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button style={{float: 'right', margin: '10px'}} href={"/api/jobs/" + jobId + "/download"} disabled={!excelExported}><FaDownload /> Download</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Row>
                            <Col>
                                <BootstrapTable
                                    keyField='idx'
                                    data={ summary.map((e, i) => ({...e, idx: i})) }
                                    columns={ [
                                        {dataField: 'sequenceType', text: 'Sequence Type'},
                                        {dataField: 'sequence', text: 'Sequence'},
                                        {dataField: 'edit', text: 'Edit'},
                                        {dataField: 'options', text: 'Options'},
                                        {dataField: 'pegRNAs', text: '# pegRNAs'},
                                        {dataField: 'detail', isDummyField: true, text: '', formatter: (cell, row) => (
                                                <Button variant="outline-secondary" size="sm" onClick={ () => routeJobDetail(jobId, 'edit' + row.idx ) }>Details</Button> )}] }
                                    bootstrap4={true}
                                    bordered={false}
                                    striped
                                    hover
                                    height='60vh'
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
};

const mapStateToProps = (state) => {

    let { jobId, status, organism, summary, warning, options, queuePosition='', nuclease, excelExported=false } = state.job.summary;

    return {
        organism,
        jobId,
        status,
        summary,
        warning,
        options,
        queuePosition,
        nuclease,
        excelExported,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        routeJobDetail: (jobId, idx) => dispatch(routeJobDetail(jobId, idx)),
    }
};

export const ConnectedSummary = connect(mapStateToProps, mapDispatchToProps)(Summary);
