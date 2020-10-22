import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

import { Loading } from "../../Loading";

export default ({jobId, jobStatus, warning, queuePosition, designPercent}) => (
    <React.Fragment>
        <dt>Job Id:</dt>
        <dl>{jobId}</dl>
        <dt>Status:</dt>
        <dl>{jobStatus} {!['Failed', 'Completed', 'Not Found'].includes(jobStatus) && <Loading style={{  display:'inline-block', verticalAlign: 'bottom' }} size={3}/>}
                        {queuePosition && <React.Fragment><br/>Position {queuePosition}</React.Fragment>}
                        {designPercent && <ProgressBar now={designPercent} animated={true}/>}
        </dl>
        { warning && <React.Fragment>
            <dt>Warning:</dt>
            <dl>{warning}</dl>
        </React.Fragment> }

    </React.Fragment>
);