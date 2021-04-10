import React from 'react';
import { Row, Col, Popover, OverlayTrigger} from "react-bootstrap";
import { FaExternalLinkAlt } from 'react-icons/fa';


const Nicking = ({nicking}) => (<>
    <Col sm={12}><b>Nicking oligos</b></Col>
    <dt className="col-sm-3">Top</dt><dd className="col-sm-9">{nicking.top}</dd>
    <dt className="col-sm-3">Bottom</dt><dd className="col-sm-9">{nicking.bottom}</dd>
</>)

const Pair = ({name, top, bottom}) => (<>
    <Col sm={12}><b>{name[0].toUpperCase() + name.substring(1)} oligos</b></Col>
    <dt className="col-sm-3">Top</dt><dd className="col-sm-9">{top}</dd>
    <dt className="col-sm-3">Bottom</dt><dd className="col-sm-9">{bottom}</dd>
</>)

const Single = ({name, oligo}) => (<>
    <dt className="col-sm-3">{name[0].toUpperCase() + name.substring(1)}</dt><dd className="col-sm-9">{oligo}</dd>
</>)

export const OligosBox = ({pegRNA, position="right"}) => {
    return <OverlayTrigger
        placement={position}
        trigger="click"
        overlay={
            <Popover id="pegRNAOligosTooltip">
                <Popover.Title>Recommended Designs</Popover.Title>
                <Popover.Content>
                    <Row>
                        <Col>
                        <b>pegRNA</b><br/>
                        <dl className="row">
                            <dt className="col-sm-3">Spacer</dt><dd className="col-sm-9">{pegRNA.spacer}</dd>
                            <dt className="col-sm-3">RT template ({pegRNA.rtTemplateLength} nt)</dt><dd className="col-sm-9">{pegRNA.rtTemplate}</dd>
                            <dt className="col-sm-3">PBS ({pegRNA.pbsLength} nt)</dt><dd className="col-sm-9">{pegRNA.pbs}</dd>
                            <dt className="col-sm-3">Extension sequence</dt><dd className="col-sm-9">{pegRNA.extension}</dd>
                            <dt className="col-sm-3">Full pegRNA sequence</dt><dd className="col-sm-9">{pegRNA.pegrna}</dd>
                        </dl>
                        {pegRNA && pegRNA.hasOwnProperty('nicking') && pegRNA.nicking.length > 0 && <>
                        <b>nsgRNA</b><br/>
                        <dl className="row">
                        <dt className="col-sm-3">Kind</dt><dd className="col-sm-9">{pegRNA.nicking[0].kind}</dd>
                        <dt className="col-sm-3">Position</dt><dd className="col-sm-9">{pegRNA.nicking[0].position}</dd>
                        <dt className="col-sm-3">Spacer</dt><dd className="col-sm-9">{pegRNA.nicking[0].spacer}</dd>
                        </dl></>}
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        {Object.keys(pegRNA.oligos).map(k => {
                            if(Object.keys(pegRNA.oligos[k]).length === 2){
                                return <Pair key={k} name={k} top={pegRNA.oligos[k].top} bottom={pegRNA.oligos[k].bottom} />
                            } else {
                                return <Single key={k} name={k} oligo={pegRNA.oligos[k]} />
                            }
                        })}
                        {pegRNA && pegRNA.hasOwnProperty('nicking') && pegRNA.nicking.length > 0  && pegRNA.nicking[0].hasOwnProperty('top') && <Pair name="Nicking" top={pegRNA.nicking[0].top} bottom={pegRNA.nicking[0].bottom}/> }
                        {pegRNA && pegRNA.hasOwnProperty('nicking') && pegRNA.nicking.length > 0  && pegRNA.nicking[0].hasOwnProperty('oligo')  && <Single name="Nicking" oligo={pegRNA.nicking[0].oligo} /> }
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
                    <dl className="row">
                        <dt className="col-sm-3">Top</dt>
                        <dd className="col-sm-9">{nicking && nicking.top}</dd>
                        <dt className="col-sm-3">Bottom</dt>
                        <dd className="col-sm-9">{nicking && nicking.bottom}</dd>
                    </dl>
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
            <Popover id="extensionOligosTooltip">
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