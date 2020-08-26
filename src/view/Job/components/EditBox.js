import React from 'react';

export default ({edit, editOptions}) => (
    <React.Fragment>
        <dl className="row">
        <dt className="col-sm-6">Edit</dt>
        <dd className="col-sm-6">{edit && edit.replace(/([A-Z])/g, " $1")}</dd>
            {editOptions.split(',').map(ed => {
                let par = ed.split('=');
                return <React.Fragment key={ed}>
                    <dt className="col-sm-6">{par[0]}</dt>
                    <dd className="col-sm-6">{par[1]}</dd>
                    <br/>
                </React.Fragment>
            })
            }
        </dl>
    </React.Fragment>
)