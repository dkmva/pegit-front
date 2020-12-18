import React  from 'react';
import {Button, Card, Col, Form, OverlayTrigger, Popover, Row} from "react-bootstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import {FaUndo, FaDownload, FaUpload, FaRegQuestionCircle} from 'react-icons/fa';

import AdvancedOptions from "./AdvancedOptions";
import ReactMarkdown from "react-markdown";


export default ({ edits, invalid, editColumns, removeEdit, resetEditList, selectedOrganism, handleJobSubmit, parseImportFile, changeAdvancedOption, advancedOptions, isParsing, nucleases, selectedNuclease, selectNuclease, isSubmitting, selectedCloningStrategy, selectCloningStrategy, runBowtie, changeRunBowtie, designPrimers, changeDesignPrimers }) => {

    let nucleaseObject = {name: '', cloningStrategies: []};
    if(nucleases.length) {
        nucleaseObject = nucleases.find(n => n.name === selectedNuclease);
    }

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
                                    <Form.Label>&nbsp;</Form.Label>
                                    <Button variant="link" style={{color: 'black', fontWeight: 'bold'}}
                                            onClick={() => resetEditList()} block>
                                        <FaUndo /> Clear and reset
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>&nbsp;</Form.Label>
                                    <Button variant="outline-success " disabled={edits.length < 1 || isSubmitting} block
                                            onClick={handleJobSubmit}>
                                        { isSubmitting ? 'Submitting...' : 'Submit' }
                                    </Button>
                                </Col>

                                <Col md={2}>
                                    <Form.Label>Nuclease <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Popover id="editTooltip2">
                                                <Popover.Title>{nucleaseObject.name}</Popover.Title>
                                                <Popover.Content><ReactMarkdown
                                                    source={nucleaseObject.docstring}/></Popover.Content>
                                            </Popover>
                                        }
                                    >
                                        <FaRegQuestionCircle/>
                                    </OverlayTrigger></Form.Label>
                                    <Form.Control as="select" value={selectedNuclease} onChange={selectNuclease}>
                                        { nucleases.map((n) => <option key={n.name} value={n.name}>{n.name}</option>) }
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Cloning <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Popover id="editTooltip1">
                                                <Popover.Content>Click me for help</Popover.Content>
                                            </Popover>
                                        }
                                    >
                        <span>
                            <OverlayTrigger
                                placement="right"
                                trigger="click"
                                overlay={
                                    <Popover id="editTooltip2">
                                        <Popover.Title>{nucleaseObject.cloningStrategies.length ? nucleaseObject.cloningStrategies.find(c => c[0] === selectedCloningStrategy)[0] : ''}</Popover.Title>
                                        <Popover.Content><ReactMarkdown
                                            source={nucleaseObject.cloningStrategies.length ? nucleaseObject.cloningStrategies.find(c => c[0] === selectedCloningStrategy)[1] : ''}/></Popover.Content>
                                    </Popover>
                                }
                            >
                                <FaRegQuestionCircle/>
                            </OverlayTrigger>
                        </span>
                                    </OverlayTrigger></Form.Label>
                                    <Form.Control as="select" value={selectedCloningStrategy} onChange={selectCloningStrategy}>
                                        { nucleaseObject.cloningStrategies.map(s => <option key={s} value={s[0]}>{s[0]}</option>) }
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>&nbsp;</Form.Label>
                                    <Button variant="link" style={{color: 'black', fontWeight: 'bold'}}
                                            onClick={ () => props.csvProps.onExport() } block disabled={edits.length < 1}>
                                        <FaDownload /> Export edits
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>&nbsp;</Form.Label>
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