import React from 'react';
import {Row, Popover, OverlayTrigger} from "react-bootstrap";
import { FaExternalLinkAlt } from 'react-icons/fa';


export const ExtensionOligosBox = ({primer}) => {
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