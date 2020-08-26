import { connect } from "react-redux";

import { requestAddEdit } from 'state/home';
import { Submission } from "./Submission";

const mapStateToProps = (state) => {
    const { sequence, loading, error: sequenceError } = state.region;
    const { submitting: isSubmitting, error: submitError } = state.home.addEdit;
    const [chromosome, start] = state.location.payload.region.replace(':', '-').split('-');

    const { selectedOrganism: organism={} } = state.home;
    const { edits } = state.edits;

    return {
        loading,
        sequenceError,
        isSubmitting,
        submitError,
        sequenceType: 'Genomic',
        sequenceId: null,
        organism,
        chromosome,
        upstream: parseInt(start) - 1,
        canSubmit: !!organism.id && !!sequence,
        sequenceObject: {id: null, name: chromosome, source: null, sequence: sequence},
        edits: edits.map(ed => ({ ...ed, disabled: !ed.allowGenomic})),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitJob: (jobData) => {
            dispatch(requestAddEdit(jobData));
        },
    }
};

export const ConnectedRegion = connect(mapStateToProps, mapDispatchToProps)(Submission);