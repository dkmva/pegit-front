
import React from 'react'

import { FaRegQuestionCircle } from 'react-icons/fa';
import { Card, Col, Container, Row } from "react-bootstrap";

export const Instructions = () => (
    <Container>
        <Row>
            <Col>
                <h1>Instructions</h1>
                <Card body>
                    <h3>Selecting a gene of interest.</h3>
                    <p>The first step is to select an organism. This allows searching for the gene of interest.</p>
                    <p>Genes can be searched by symbol or gene id. After a gene has been chosen, you can select either the gene, or if available, a transcript in the view below.</p>
                    <h3>Non-coding regions / custom sequences</h3>
                    <p>When working with genes not in the database, DNA sequences can be pasted instead. Click the 'Custom sequence / Genomic coordinates' button, to reveal a text input.</p>
                    <p>The pasted sequence should contain atleast 200 nucleotides flanking the the desired genetic edit, or more if larger PCR products are desired.</p>
                    <p>For non-coding regions, genomic coordinates can be entered into this box, to retrieve the corresponding DNA sequence.</p>
                    <h3>Specifying the desired changes.</h3>
                    <p>The next step is to input the desired genetic change. First you must choose which kind of edit to perform, from a list of available edits.</p>
                    <p>The input form changes corresponding to the selected edit. For information on how to fill the form, click on the <FaRegQuestionCircle /> above the edit selection</p>
                    <p>When the desired inputs have been filled, click 'Add to edit list'. Repeat for more edits. When the desired edits have been added. Click submit to start the job.</p>
                    <p>To design pegRNAs for reverting a mutation to wild type, the corresponding mutation must be entered, and the 'Repair mutation?' checkbox checked.<br/>
                    eg. to insert a missing CTT in a mutated sequence, enter the corresponding CTT deletion, and check 'Repair mutation?'.<br/>
                    Alternatively, one can enter the mutated sequence as a custom sequence and design a CTT insertion based on this sequence.</p>
                    <h3>ClinVar edits</h3>
                    <p>When selecing ClinVar under 'organisms', it is possible to search the clinVar database for variants, and design pegRNAs to introduce or repair the given variant.</p>
                    <h3>Uploading edits</h3>
                    <p>It is also possible to upload desired edits in a tab-separated file, with no header line.</p>
                    <p>For regular edits. 4 columns are required, (sequence_type, sequence, edit, options), example for Homo Sapiens - Gencode Release 33 (GRCh38.p13) <a href={process.env.PUBLIC_URL + 'example_edits_gencode_release_33'} download>Download example file</a></p>
                    <pre>
                        transcript	HBB-201	AminoAcidAlteration	alteration=V2A<br/>
                        gene	HBB	Insertion	insert=ATG,position=200<br/>
                        genomic	chr3	Deletion	delete=ACAGTCAGTATCAATTCTGGAAGAATTTCCAG,position=46373453<br/>
                    </pre>
                    <p>For custom sequences, the sequence_type should be custom, and the sequence field contain the DNA sequence. Custom sequences can be named, by providing the sequene as NAME,SEQUENCE</p>
                    <pre>
                        custom GFP,atggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtgtccggcgagggcgagggcgatgccacctacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccctgacctacggcgtgcagtgcttcagccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatcttcttcaaggacgacggcaactacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaactacaacagccacaacgtctatatcatggccgacaagcagaagaacggcatcaaggtgaacttcaagatccgccacaacatcgaggacggcagcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagcacccagtccgccctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaag  Insertion    insert=A,position=250
                    </pre>
                    <p>For clinVar edits. 2 columns are required, (clinVar id, repair) <a href={process.env.PUBLIC_URL + 'example_edits_clinvar'} download>Download example file</a></p>
                    <pre>
                        VCV000834692	false<br/>
                        VCV000834692	true
                    </pre>
                </Card>
            </Col>
        </Row>
    </Container>
)