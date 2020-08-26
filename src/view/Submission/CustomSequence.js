import { connect } from "react-redux";

import { requestAddEdit } from 'state/home';
import { Submission } from "./Submission";

const mapStateToProps = (state) => {
    const { submitting: isSubmitting, error: submitError } = state.home.addEdit;
    const { sequence, name } = state.customsequence;
    const { selectedOrganism: organism={} } = state.home;

    const { edits } = state.edits;

    return {
        isSubmitting,
        submitError,
        sequenceType: 'DNA sequence',
        sequenceId: null,
        organism,
        sequenceObject: {id: null, name, source: null, sequence},
        canSubmit: sequence.length,
        edits: edits.map(ed => ({ ...ed, disabled: !ed.allowGenomic})),
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    return {
        ...stateProps,
        submitJob: (jobData) => {
            jobData = { ...jobData, sequenceType: 'custom', sequence: stateProps.sequenceObject.name+','+stateProps.sequenceObject.sequence };
            dispatch(requestAddEdit(jobData));
        },
    }
};

export const CustomSequence = connect(mapStateToProps, null, mergeProps)(Submission);