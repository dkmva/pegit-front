import React from "react";

import { ExtensionOligosBox } from "./OligosBox";
import { Header } from "./formatters";

export const offTargetColumns = [{
    dataField: 'off target site',
    text: 'Target Site',
    headerFormatter: (column) => Header(column, 'Target site sequence. Mismatches in lowercase'),
}, {
    dataField: 'mismatches',
    text: 'Mismatches',
    headerFormatter: (column) => Header(column, 'Number of mismatches'),
}, {
    dataField: 'chr',
    text: 'Chromosome',
    headerFormatter: (column) => Header(column, 'Chromosome (or contig) of detected target site'),
}, {
    dataField: 'position',
    text: 'position',
    headerFormatter: (column) => Header(column, 'Position of the target site'),
}, {
    dataField: 'pam',
    text: 'PAM',
    headerFormatter: (column) => Header(column, 'Target site PAM'),
},
];

export const alternateColumns = [{
    dataField: 'sequence',
    text: 'Sequence',
    headerFormatter: (column) => Header(column, 'Extension sequence'),
}, {
    dataField: 'oligos',
    dummyField: true,
    text: 'Oligos',
    formatter: (cell, row) => <ExtensionOligosBox extension={row} />,
    headerFormatter: (column) => Header(column, 'Oligos for cloning nicking extension sequence.'),
},
{
    dataField: 'pbsLength',
    text: 'PBS length',
    headerFormatter: (column) => Header(column, 'Length of the primer binding site'),
}, {
    dataField: 'pbsGc',
    text: 'PBS GC',
    headerFormatter: (column) => Header(column, 'GC content of the primer binding site'),
}, {
    dataField: 'rtTemplateLength',
    text: 'RTT length',
    headerFormatter: (column) => Header(column, 'Length of the reverse transcriptase template'),
}, {
    dataField: 'rtGc',
    text: 'RTT GC',
    headerFormatter: (column) => Header(column, 'GC content of the reverse transcriptase template'),
}
];
