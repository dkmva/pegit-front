import { findMismatches } from "seqvizcustom/utils/bindingSites";
import { reverseComplement } from "seqvizcustom/utils/parser";

export const pegRNASpacerPosition = (pegRNA, sequence, offset=0) => {
    let start, end, mismatches;
    start = pegRNA.position;
    if (pegRNA.strand === -1) {
        start -= (pegRNA.visualSpacer.length - 1);
    }
    start += offset;
    end = start + pegRNA.visualSpacer.length;

    if(pegRNA.strand === 1){
        mismatches = findMismatches(sequence.substring(start, end), pegRNA.visualSpacer).mismatches;
    } else {
        mismatches = findMismatches(reverseComplement(sequence.substring(start, end)), pegRNA.visualSpacer).mismatches;
    }

    return { start, end, mismatches }
};

export const pegRNAExtensionPosition = (pegRNA, sequence, offset=0) => {
    let start, end, mismatches;
    if(pegRNA.strand === 1){
        start = pegRNA.position + (pegRNA.visualSpacer.length - 3) - pegRNA.pbsLength;
        start -= (pegRNA.visualSpacer.match(/-/g) || []).length;

    } else {
        start = pegRNA.position - (pegRNA.visualSpacer.length - 3) - pegRNA.rtTemplateLength + pegRNA.extension.length - pegRNA.visualExtension.length + 1;
        start += (pegRNA.visualSpacer.match(/-/g) || []).length;

    }
    start += offset;
    end = start + pegRNA.visualExtension.length;

    if(pegRNA.strand === 1){
        mismatches = findMismatches(reverseComplement(sequence.substring(start, end)), pegRNA.visualExtension).mismatches;
    } else {
        mismatches = findMismatches(sequence.substring(start, end), pegRNA.visualExtension).mismatches;
    }

    return { start, end, mismatches}
};

export const nickingGRNASpacerPosition = (pegRNA, nickingRNA, sequence, offset=0) => {
    let start, end, mismatches=[];

    if(pegRNA.strand === 1){
        start = pegRNA.position + (nickingRNA.position - 3) + (pegRNA.visualSpacer.length - 3);
        start += nickingRNA.push
    } else {
        start = pegRNA.position - (pegRNA.visualSpacer.length - 1) + 3;

        start += -nickingRNA.position - nickingRNA.offset;
        start += nickingRNA.push + (pegRNA.visualSpacer.match(/-/g) || []).length;
    }

    start += offset;
    end = start + nickingRNA.visualSpacer.length;

    if(pegRNA.strand === 1){
        mismatches = findMismatches(reverseComplement(sequence.substring(start, end)), nickingRNA.visualSpacer).mismatches;
    } else {
        mismatches = findMismatches(sequence.substring(start, end), nickingRNA.visualSpacer).mismatches;
    }

    return { start, end, mismatches}
};