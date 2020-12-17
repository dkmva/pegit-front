import React from 'react';
import { Row, Col, Popover, OverlayTrigger} from "react-bootstrap";
import { FaExternalLinkAlt } from 'react-icons/fa';


const Nicking = ({nicking}) => (<>
    <Col sm={3}><label>Nicking oligos</label></Col>
    <Col sm={3}><label>Kind: {nicking.kind}</label></Col>
    <Col sm={6}><label>Position: {nicking.position}</label></Col>
    <dt className="col-sm-3">Top</dt>
    <dl className="col-sm-9">{nicking.top}</dl>
    <dt className="col-sm-3">Bottom</dt>
    <dl className="col-sm-9">{nicking.bottom}</dl>
</>)

const Pair = ({name, top, bottom}) => (<>
    <Col sm={12}><label>{name[0].toUpperCase() + name.substring(1)} oligos</label></Col>
    <dt className="col-sm-3">Top</dt>
    <dl className="col-sm-9">{top}</dl>
    <dt className="col-sm-3">Bottom</dt>
    <dl className="col-sm-9">{bottom}</dl>
</>)

const Single = ({name, oligo}) => (<>
    <Col sm={12}><label>{name[0].toUpperCase() + name.substring(1)} oligo</label></Col>
    <dt className="col-sm-3"></dt>
    <dl className="col-sm-9">{oligo}</dl>
</>)

export const OligosBox = ({pegRNA}) => {
    return <OverlayTrigger
        placement="right"
        trigger="click"
        overlay={
            <Popover id="pegRNAOligosTooltip">
                <Popover.Title>Recommended oligos</Popover.Title>
                <Popover.Content>
                    <Row>
                        {Object.keys(pegRNA.oligos).map(k => {
                            if(Object.keys(pegRNA.oligos[k]).length === 2){
                                return <Pair key={k} name={k} top={pegRNA.oligos[k].top} bottom={pegRNA.oligos[k].bottom} />
                            } else {
                                return <Single key={k} name={k} oligo={pegRNA.oligos[k]} />
                            }
                        })}
                        {pegRNA && pegRNA.hasOwnProperty('nicking') && pegRNA.nicking.length > 0 && <Nicking nicking={pegRNA.nicking[0]}/> }
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
                        {Object.keys(extension.oligos).map(k => {
                            if(Object.keys(extension.oligos[k]).length === 2){
                            return <Pair key={k} name={k} top={extension.oligos[k].top} bottom={extension.oligos[k].bottom} />
                        } else {
                            return <Single key={k} name={k} oligo={extension.oligos[k]} />
                        }
                        })}
                    </Row>
                </Popover.Content>
            </Popover>
        }
    >
        <FaExternalLinkAlt/>
    </OverlayTrigger>
};