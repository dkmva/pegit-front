import React  from 'react';
import {Button, Card, Col, Form, OverlayTrigger, Popover, Row} from "react-bootstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import { FaUndo, FaDownload, FaUpload } from 'react-icons/fa';

import AdvancedOptions from "./AdvancedOptions";


export default ({ edits, invalid, editColumns, removeEdit, resetEditList, selectedOrganism, handleJobSubmit, parseImportFile, changeAdvancedOption, advancedOptions, isParsing, nucleases, selectedNuclease, selectNuclease, isSubmitting, selectedCloningStrategy, selectCloningStrategy, runBowtie, changeRunBowtie, designPrimers, changeDesignPrimers }) => {

    return <Row>
        <Col>
            <ToolkitProvider
                keyField='idx'
                data={edits.map((e, i) => ({...e, idx: i}))}
                columns={editColumns.map((e, i) => i === 0 ? { ...e, formatter: (cell, row) => (
                        <><button aria-label="Remove" className="close rbt-close" style={{float: 'left'}}
                                  type="button" onClick={() => removeEdit(row.idx)}><span
                            aria-hidden="true">×</span><span
                            className="sr-only">Remove</span>
                        </button> {cell + 1}</>)} : e)}
                exportCSV={ {
                    fileName: selectedOrganism ? selectedOrganism.name + ' - ' + selectedOrganism.annotation + ' edits.tsv' : 'pegIT.tsv',
                    ignoreHeader: true,
                    separator: '\t',
                } }
            >
                {
                    props => (
                        <Card body>
                            <Row>
                                <Col md={2}>
                                    <Button variant="link" style={{color: 'black', fontWeight: 'bold'}}
                                            onClick={() => resetEditList()} block>
                                        <FaUndo /> Clear and reset
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button variant="outline-success " disabled={edits.length < 1 || isSubmitting} block
                                            onClick={handleJobSubmit}>
                                        { isSubmitting ? 'Submitting...' : 'Submit' }
                                    </Button>
                                </Col>

                                <Col md={2}>
                                    <Form.Control as="select" value={selectedNuclease} onChange={selectNuclease}>
                                        { nucleases.map((n, i) => <option key={n.name} value={n.name}>{n.name}</option>) }
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Form.Control as="select" value={selectedCloningStrategy} onChange={selectCloningStrategy}>
                                        { selectedNuclease !== 0 && nucleases.find(n => n.name === selectedNuclease).cloningStrategies.map(s => <option key={s} value={s}>{s}</option>) }
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button variant="link" style={{color: 'black', fontWeight: 'bold'}}
                                            onClick={ () => props.csvProps.onExport() } block disabled={edits.length < 1}>
                                        <FaDownload /> Export edits
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <OverlayTrigger overlay={<Popover id="uploadTooltip"><Popover.Content>{selectedOrganism ? 'Check Instructions page for file format' : 'Select an organism to enable upload'}</Popover.Content></Popover>}>
                                                <span>
                                                <label className={"btn btn-link btn-block" + ((!selectedOrganism || isParsing) ? " disabled" : "") } style={{color: 'black', fontWeight: 'bold'}}>
                                                    <FaUpload /> {isParsing ? 'Parsing..' : 'Import edits'}
                                                    <input type="file" hidden onChange={parseImportFile} disabled={!selectedOrganism || isParsing}/>
                                                </label>
                                                </span>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <AdvancedOptions changeAdvancedOption={changeAdvancedOption} advancedOptions={advancedOptions} runBowtie={runBowtie}
                                                 changeRunBowtie={changeRunBowtie}
                                                 designPrimers={designPrimers}
                                                 changeDesignPrimers={changeDesignPrimers}/>
                            </Row>
                            <br/>
                            <BootstrapTable
                                { ...props.baseProps }
                                bootstrap4={true}
                                bordered={false}
                                striped
                                hover
                                height='60vh'
                            />
                                { invalid.length > 0 && <BootstrapTable
                                keyField='idx'
                                data={invalid.map((e, i) => ({...e, idx: i}))}
                                rowClasses="table-danger"
                                columns={[  {dataField: 'line', text: 'Line', csvType: 'Number'}, ...editColumns, {dataField: 'error', text: 'Error', csvType: 'Number'}] }
                                bootstrap4={true}
                                bordered={false}
                                striped
                                hover
                                height='30vh'
                            /> }
                        </Card>
                    )
                }
            </ToolkitProvider>
        </Col>
    </Row>
}