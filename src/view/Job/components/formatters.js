import React from "react";

import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaRegQuestionCircle } from 'react-icons/fa';

import Loading from 'view/Loading';
import Link from "redux-first-router-link";

const offTargetFormatter = (cell) => (
    cell ? cell[0].join(',') : <Loading size={3} count={15} style={{verticalAlign: 'bottom'}}/>
);

const primerFormatter = (cell, status) => {
    console.log(cell, status)
    return ['Queued', 'Finding pegRNAs', 'Queued for specificity check', 'Checking primer specificity'].includes(status) ? <Loading size={3} count={15} style={{verticalAlign: 'bottom'}}/> : cell
};

const onTargetFormatter = cell => (
    Math.round( cell * 1000 + Number.EPSILON ) / 1000
);

const strandFormatter = cell => (
    cell === 1 ? '+' : '-'
);

const spacerURL = (route, cell) => (
    <Link to={route}>{cell.toUpperCase()}</Link>
);

const Header = (column, tooltip) => (
    <React.Fragment>{column.text} <br/><OverlayTrigger
        placement="top"
        overlay={
            <Popover>
                <Popover.Content>{tooltip}</Popover.Content>
            </Popover>
        }
    >
        <FaRegQuestionCircle/>
    </OverlayTrigger>
    </React.Fragment>
);

export { Header, onTargetFormatter, offTargetFormatter, spacerURL, strandFormatter, primerFormatter }