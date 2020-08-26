import { connect } from "react-redux";

import { requestAddEdit } from 'state/home';
import { Submission } from "./Submission";

const mapStateToProps = (state) => {
    const { transcript, loading, error: sequenceError } = state.transcript;
    const { submitting: isSubmitting, error: submitError } = state.home.addEdit;
    const { selectedOrganism: organism={} } = state.home;
    const { edits } = state.edits;

    return {
        loading,
        sequenceError,
        isSubmitting,
        submitError,
        sequenceType: 'Transcript',
        sequenceId: transcript.id,
        organism,
        canSubmit: !!organism.id && !!transcript.id,
        sequenceObject: {id: transcript.transcriptId, name: transcript.name, source: transcript.source, sequence: transcript.sequence},
        edits: transcript.transcriptType === 'protein_coding' ? edits : edits.map(ed => ({ ...ed, disabled: !ed.allowGenomic})),
        annotations: transcript.exons ? transcript.exons.map((exon, i) => ({
                name: 'Exon ' + (i+1).toString(),
                id: 'Exon ' + (i+1).toString(),
                start: transcript.strand === '+' ? exon.start - transcript.start : transcript.end - exon.end,
                end: transcript.strand === '+' ? exon.end - transcript.start + 1 : transcript.end - exon.start + 1,
                direction: 1,
                color: "#6B81FF",
            })) : [],
        translations: transcript.codingSequences ? transcript.codingSequences.map((cds, i) => ({
                start: transcript.strand === '+' ? cds.start - transcript.start : transcript.end - cds.end,
                end: transcript.strand === '+' ? cds.end - transcript.start + 1 : transcript.end - cds.start + 1,
                direction: 1,
                offset: i,
            })) : [],
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitJob: (jobData) => {
            dispatch(requestAddEdit(jobData));
        },
    }
};

export const ConnectedTranscript = connect(mapStateToProps, mapDispatchToProps)(Submission);