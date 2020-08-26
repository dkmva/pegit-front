import React   from 'react';

import { Button, Form, Col, Popover, OverlayTrigger } from "react-bootstrap";
import { FaRegQuestionCircle } from 'react-icons/fa';
import ReactMarkdown from "react-markdown";


export default ({ edits, selectedEdit, editChange, optionChange, staticOptionChange, handleSubmit, canSubmit, isSubmitting, error }) => {

    return <Form onSubmit={handleSubmit}>
        <Form.Row className="justify-content-md-center">
            <Form.Group as={Col}>
                <Form.Label>Edit {edits.length && <OverlayTrigger
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
                                        <Popover.Title>{edits[selectedEdit].name.replace(/([A-Z])/g, " $1")}</Popover.Title>
                                        <Popover.Content><ReactMarkdown
                                            source={edits[selectedEdit].docstring}/></Popover.Content>
                                    </Popover>
                                }
                            >
                                <FaRegQuestionCircle/>
                            </OverlayTrigger>
                        </span>
                    </OverlayTrigger>}
                </Form.Label>
                <Form.Control as="select" onChange={editChange}>
                    {edits.map((edit, index) => <option key={edit.name} disabled={edit.disabled}
                                                        value={index}>{edit.name.replace(/([A-Z])/g, " $1")}</option>)}
                </Form.Control>
            </Form.Group>
            {edits.length && Object.entries(edits[selectedEdit].options).map(([k, v]) => (
                <Form.Group key={k} as={Col}>
                    <Form.Label>{k}</Form.Label>
                    { v.type === 'select' ?
                        <Form.Control
                            key={k + selectedEdit}
                            onChange={(e) => (optionChange(k, e.target.value))}
                            required={v.required}
                            pattern={v.pattern}
                            as={v.type}
                        >
                            <option disabled selected value>Select a tag</option>
                            {v.pattern.map(option => <option key={option} value={option}>{option}</option>)}
                        </Form.Control>
                        :
                    <Form.Control
                        key={k + selectedEdit}
                        onChange={(e) => (optionChange(k, e.target.value))}
                        required={v.required}
                        pattern={v.pattern}
                        type={v.type}
                    /> }
                </Form.Group>
            ))}
        </Form.Row>
        <Form.Row className="justify-content-center" style={{textAlign: 'center'}}>
            <Col md={"auto"}>
            <div>Repair mutation? <OverlayTrigger
                    placement="right"
                    overlay={
                        <Popover id="repairTooltip">
                            <Popover.Content>If checked, pegRNAs will be designed to revert the entered mutation to the reference sequence.</Popover.Content>
                        </Popover>
                    }
                >
                    <FaRegQuestionCircle/>
                </OverlayTrigger>
            </div>
            <Form.Check
                type="checkbox"
                onChange={(e) => (staticOptionChange('repairMutation', e.target.checked))}
            />
            </Col>
            <Col md={2}/>
            <Col md={"auto"} >
                <div>Silence PAM? <OverlayTrigger
                        placement="right"
                        overlay={
                            <Popover id="repairTooltip">
                                <Popover.Content>
                                    Method for silencing PAM if possible.<br/>
                                    Changes in coding regions assumes reading frame of the wild type sequence<br/>
                                    Relaxed: Allow all nucleotide changes outside coding regions. <br/>
                                    Strict: Only allows changes inside coding regions.<br/>
                                    Disabled: Do not try to silence PAM.
                                </Popover.Content>
                            </Popover>
                        }
                    >
                        <FaRegQuestionCircle/>
                    </OverlayTrigger>
                </div>
                <Form.Check type="radio" inline label='Relaxed' value='relaxed' name='silencePAM' onChange={(e) => (staticOptionChange('silencePAM', e.target.value))}/>
                <Form.Check type="radio" inline label='Strict' value='strict' name='silencePAM' onChange={(e) => (staticOptionChange('silencePAM', e.target.value))}/>
                <Form.Check type="radio" inline label='Disabled' value={false} name='silencePAM' defaultChecked onChange={(e) => (staticOptionChange('silencePAM', e.target.value))}/>
            </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
            <Button variant="outline-success"
                    disabled={!canSubmit || isSubmitting}
                    type="submit"
            >{isSubmitting ? 'Validating...' : 'Add to edit list'}</Button>
        </Form.Row>
        <Form.Row className="justify-content-center">
            <p className="text-danger">{error}</p>
        </Form.Row>
    </Form>
}