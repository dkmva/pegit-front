import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

import Link from 'redux-first-router-link'
import { ROUTE_JOB_SUMMARY } from 'state/routes';

import { Loading } from "../../Loading";

export default ({jobId, jobStatus, warning, queuePosition, designPercent}) => (
    <React.Fragment>
        <dt>Job Id:</dt>
        <dl><Link to={{ type: ROUTE_JOB_SUMMARY, payload: { jobId } }}>{jobId}</Link></dl>
        <dt>Status:</dt>
        <dl>{jobStatus} {!['Failed', 'Completed', 'Not Found'].includes(jobStatus) && <Loading style={{  display:'inline-block', verticalAlign: 'bottom' }} size={3}/>}
                        {queuePosition && <React.Fragment><br/>Position {queuePosition}</React.Fragment>}
                        { jobStatus === 'Finding pegRNAs' && <ProgressBar now={Math.max(designPercent - 5, 0)} animated={true} label={`${Math.max(Math.round(designPercent) - 5, 0)}%`}/>}
        </dl>
        { warning && <React.Fragment>
            <dt>Warning:</dt>
            <dl>{warning}</dl>
        </React.Fragment> }

    </React.Fragment>
);