import React from 'react';

import { Loading } from "../../Loading";

export default ({jobId, jobStatus, warning, queuePosition}) => (
    <React.Fragment>
        <dt>Job Id:</dt>
        <dl>{jobId}</dl>
        <dt>Status:</dt>
        <dl>{jobStatus} {!['Failed', 'Completed', 'Not Found'].includes(jobStatus) && <Loading style={{  display:'inline-block', verticalAlign: 'bottom' }} size={3}/>}{queuePosition && <React.Fragment><br/>Position {queuePosition}</React.Fragment>}</dl>
        { warning && <React.Fragment>
            <dt>Warning:</dt>
            <dl>{warning}</dl>
        </React.Fragment> }

    </React.Fragment>
);