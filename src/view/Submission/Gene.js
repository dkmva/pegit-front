import { connect } from "react-redux";

import { requestAddEdit } from 'state/home';
import { Submission } from "./Submission";

const mapStateToProps = (state) => {
    const { gene, loading, error: sequenceError } = state.gene;
    const { submitting: isSubmitting, error: submitError } = state.home.addEdit;

    const { selectedOrganism: organism={} } = state.home;

    const { edits } = state.edits;

    return {
        loading,
        sequenceError,
        isSubmitting,
        submitError,
        sequenceType: 'Gene',
        sequenceId: gene.id,
        organism,
        canSubmit: !!organism.id && !!gene.id,
        sequenceObject: {id: gene.geneId, name: gene.name, source: gene.source, sequence: gene.sequence},
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

export const ConnectedGene = connect(mapStateToProps, mapDispatchToProps)(Submission);