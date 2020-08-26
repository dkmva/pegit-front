import React from 'react';
import { Row, Col, Popover, OverlayTrigger} from "react-bootstrap";
import { FaExternalLinkAlt } from 'react-icons/fa';

export const OligosBox = ({pegRNA}) => {
    return <OverlayTrigger
        placement="right"
        trigger="click"
        overlay={
            <Popover id="pegRNAOligosTooltip">
                <Popover.Title>Recommended oligos</Popover.Title>
                <Popover.Content>
                    <Row>
                        <Col sm={12}><label>Spacer oligos</label></Col>
                        <dt className="col-sm-3">Top</dt>
                        <dl className="col-sm-9">{pegRNA && pegRNA.hasOwnProperty('oligos') && pegRNA.oligos.spacer.top}</dl>
                        <dt className="col-sm-3">Bottom</dt>
                        <dl className="col-sm-9">{pegRNA && pegRNA.hasOwnProperty('oligos') && pegRNA.oligos.spacer.bottom}</dl>

                        <Col sm={12}><label>Extension oligos</label></Col>
                        <dt className="col-sm-3">Top</dt>
                        <dl className="col-sm-9">{pegRNA && pegRNA.hasOwnProperty('oligos') && pegRNA.oligos.extension.top}</dl>
                        <dt className="col-sm-3">Bottom</dt>
                        <dl className="col-sm-9">{pegRNA && pegRNA.hasOwnProperty('oligos') && pegRNA.oligos.extension.bottom}</dl>

                        <Col sm={3}><label>Nicking oligos</label></Col>
                        <Col sm={3}><label>Kind: {pegRNA && pegRNA.hasOwnProperty('nicking') && pegRNA.nicking.length > 0 && pegRNA.nicking[0].kind}</label></Col>
                        <Col sm={6}><label>Position: {pegRNA && pegRNA.hasOwnProperty('nicking') && pegRNA.nicking.length > 0 && pegRNA.nicking[0].position}</label></Col>
                        <dt className="col-sm-3">Top</dt>
                        <dl className="col-sm-9">{pegRNA && pegRNA.hasOwnProperty('nicking') && pegRNA.nicking.length > 0 && pegRNA.nicking[0].top}</dl>
                        <dt className="col-sm-3">Bottom</dt>
                        <dl className="col-sm-9">{pegRNA && pegRNA.hasOwnProperty('nicking') && pegRNA.nicking.length > 0 && pegRNA.nicking[0].bottom}</dl>
                    </Row>
                </Popover.Content>
            </Popover>
        }
    >
        <FaExternalLinkAlt/>
    </OverlayTrigger>
};

export const NickingOligosBox = ({nicking}) => {
    return <OverlayTrigger
        placement="right"
        trigger="click"
        overlay={
            <Popover id="nickingOligosTooltip">
                <Popover.Title>Oligos</Popover.Title>
                <Popover.Content>
                    <Row>
                        <dt className="col-sm-3">Top</dt>
                        <dl className="col-sm-9">{nicking && nicking.top}</dl>
                        <dt className="col-sm-3">Bottom</dt>
                        <dl className="col-sm-9">{nicking && nicking.bottom}</dl>
                    </Row>
                </Popover.Content>
            </Popover>
        }
    >
        <FaExternalLinkAlt/>
    </OverlayTrigger>
};
export const ExtensionOligosBox = ({extension}) => {
    return <OverlayTrigger
        placement="right"
        trigger="click"
        overlay={
            <Popover id="nickingOligosTooltip">
                <Popover.Title>Oligos</Popover.Title>
                <Popover.Content>
                    <Row>
                        <dt className="col-sm-3">Top</dt>
                        <dl className="col-sm-9">{extension.oligos && extension.oligos.top}</dl>
                        <dt className="col-sm-3">Bottom</dt>
                        <dl className="col-sm-9">{extension.oligos && extension.oligos.bottom}</dl>
                    </Row>
                </Popover.Content>
            </Popover>
        }
    >
        <FaExternalLinkAlt/>
    </OverlayTrigger>
};