import React from "react";
import { Button, Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


export default ({ clinVarResults, handleClinVarSubmit }) => {

    return <Card body style={{maxHeight: '60vh', overflowY: 'auto'}}>
        { clinVarResults.map((obj, i) => (
            <Row key={i}>
                <Col md={10}>
                    <h4><a href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${obj.accession}`} target="_blank" rel="noopener noreferrer">{obj.title}</a></h4><br/>
                    <dl className="row">
                        <dt className="col-md-6">Variant type</dt><dd className="col">{obj.objType}</dd>
                        <dt className="col-md-6">Affected gene(s)</dt>
                        <dd className="col-md-6" style={{textOverflow: 'ellipsis', overflow: 'hidden', maxHeight:'50px'}}>
                            { obj.genes.map(gene => gene.symbol).join(',') }
                        </dd>
                        <dt className="col-md-6">Genomic location</dt>
                        <dd className="col-md-6">
                            { obj.variationSet[0].variationLoc.map((loc, j) => (
                                <React.Fragment key={obj.accession + '-' + j}>{loc.chr}:{loc.start}-{loc.stop} ({loc.assemblyName})<br/></React.Fragment>
                            ))}
                        </dd>
                        <dt className="col-md-6">Canonical SPDI</dt>
                        <dd className="col-md-6">{obj.variationSet[0].canonicalSpdi}</dd>
                    </dl>
                </Col>
                <Col md={2} className="align-self-center">
                    { obj.variationSet[0].canonicalSpdi.length > 0 ? <React.Fragment>
                            <Button variant="outline-danger" onClick={() => handleClinVarSubmit(obj.accession, false, i)}>Introduce</Button><br/><br/>
                            <Button variant="outline-success" onClick={() => handleClinVarSubmit(obj.accession, true, i)}>Repair</Button>
                        </React.Fragment> :
                        <React.Fragment>
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip id={`${obj.accession}-tooltip-install`}>
                                        Sorry, we do not provide this functionality, for variants without a canonical SPDI at this point.
                                    </Tooltip>
                                }
                            >
                                <span className="d-inline-block"><Button variant="outline-danger" disabled style={{ pointerEvents: 'none' }}>Introduce</Button></span>
                            </OverlayTrigger><br/><br/>
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip id={`${obj.accession}-tooltip-repair`}>
                                        Sorry, we do not provide this functionality, for variants without a canonical SPDI at this point.
                                    </Tooltip>
                                }
                            >
                                <span className="d-inline-block"><Button variant="outline-success" disabled style={{ pointerEvents: 'none' }}>Repair</Button></span>
                            </OverlayTrigger>
                        </React.Fragment>}

                </Col>
            </Row>
        ))}
    </Card>
}