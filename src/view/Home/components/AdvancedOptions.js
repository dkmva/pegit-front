import React, {useState} from "react";
import {Col, Collapse, Form, OverlayTrigger, Popover, Row} from "react-bootstrap";
import { FaRegQuestionCircle, FaAngleDown, FaAngleRight } from 'react-icons/fa';


function useToggleOpen(initial) {
    const [open, setOpen] = useState(initial);
    return [open, () => setOpen(!open)];
}

export default ({changeAdvancedOption, advancedOptions}) => {
    
    const [open, toggleOpen] = useToggleOpen(false);

    return <Col>
        <span
            onClick={toggleOpen}
            aria-controls="example-collapse-text"
            aria-expanded={open}
        >
            { open ? <FaAngleDown/> : <FaAngleRight/> }Advanced Options
        </span>
        <Collapse in={open}>
            <div id="example-collapse-text">
                <b>pegRNAs</b>
                <Form.Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>PBS length <OverlayTrigger
                            placement="right"
                            overlay={
                                <Popover id="pbsTooltip">
                                    <Popover.Content>
                                        Desired length of the primer binding site
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <FaRegQuestionCircle/>
                        </OverlayTrigger></Form.Label>
                        <Row>
                            <Col>
                                <Form.Label>From:</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('pbsMinLength', e.target.value))}
                                    type="number"
                                    value={advancedOptions.pbsMinLength}
                                />
                            </Col>
                            <Col>
                                <Form.Label>To:</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('pbsMaxLength', e.target.value))}
                                    type="number"
                                    value={advancedOptions.pbsMaxLength}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>RT length <OverlayTrigger
                            placement="right"
                            overlay={
                                <Popover id="repairTooltip">
                                    <Popover.Content>
                                        Desired homology downstream of mutations.
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <FaRegQuestionCircle/>
                        </OverlayTrigger></Form.Label>
                        <Row>
                            <Col>
                                <Form.Label>From:</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('rtMinLength', e.target.value))}
                                    type="number"
                                    value={advancedOptions.rtMinLength}
                                />
                            </Col>
                            <Col>
                                <Form.Label>To:</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('rtMaxLength', e.target.value))}
                                    type="number"
                                    value={advancedOptions.rtMaxLength}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group as={Col} md={9}>
                        <Form.Label>Spacers <OverlayTrigger
                            placement="right"
                            overlay={
                                <Popover id="repairTooltip">
                                    <Popover.Content>
                                        Searching range for pegRNA and nicking sgRNA spacers.
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <FaRegQuestionCircle/>
                        </OverlayTrigger></Form.Label>
                        <Row>
                            <Col>
                                <Form.Label>pegRNA</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('spacerSearchRange', e.target.value))}
                                    type="number"
                                    value={advancedOptions.spacerSearchRange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Nicking</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('nickingRange', e.target.value))}
                                    type="number"
                                    value={advancedOptions.nickingRange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Number of pegRNAs to design</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('numPegs', e.target.value))}
                                    type="number"
                                    value={advancedOptions.numPegs}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group as={Col} md={12}>
                        <Form.Label>Primers <OverlayTrigger
                            placement="right"
                            overlay={
                                <Popover id="repairTooltip">
                                    <Popover.Content>
                                        Parameters for primer design
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <FaRegQuestionCircle/>
                        </OverlayTrigger></Form.Label>
                        <Row>
                            <Col>
                                <Form.Label>Minimum product size</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('productMinSize', e.target.value))}
                                    type="number"
                                    value={advancedOptions.productMinSize}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Maximum product size</Form.Label>
                                <Form.Control
                                    onChange={(e) => (changeAdvancedOption('productMaxSize', e.target.value))}
                                    type="number"
                                    value={advancedOptions.productMaxSize}
                                />
                            </Col>
                        </Row><Row>
                        <Col>
                            <Form.Label>Minimum primer size</Form.Label>
                            <Form.Control
                                onChange={(e) => (changeAdvancedOption('primerMinLength', e.target.value))}
                                type="number"
                                value={advancedOptions.primerMinLength}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Maximum primer size</Form.Label>
                            <Form.Control
                                onChange={(e) => (changeAdvancedOption('primerMaxLength', e.target.value))}
                                type="number"
                                value={advancedOptions.primerMaxLength}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Optimal primer size</Form.Label>
                            <Form.Control
                                onChange={(e) => (changeAdvancedOption('primerOptLength', e.target.value))}
                                type="number"
                                value={advancedOptions.primerOptLength}
                            />
                        </Col>
                    </Row><Row>
                        <Col>
                            <Form.Label>Minimum primer TM</Form.Label>
                            <Form.Control
                                onChange={(e) => (changeAdvancedOption('primerMinTm', e.target.value))}
                                type="number"
                                value={advancedOptions.primerMinTm}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Maximum primer TM</Form.Label>
                            <Form.Control
                                onChange={(e) => (changeAdvancedOption('primerMaxTm', e.target.value))}
                                type="number"
                                value={advancedOptions.primerMaxTm}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Optimal primer TM</Form.Label>
                            <Form.Control
                                onChange={(e) => (changeAdvancedOption('primerOptTm', e.target.value))}
                                type="number"
                                value={advancedOptions.primerOptTm}
                            />
                        </Col>
                    </Row>
                    </Form.Group>
                </Form.Row>
            </div>
        </Collapse>
    </Col>
}