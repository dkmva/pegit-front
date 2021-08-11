
import React from 'react'
import Link from 'redux-first-router-link'

import { routeContact } from 'state/routes'
import {Container, Card, Col, Row} from "react-bootstrap";

export const FAQ = () => (
    <Container>
        <Row>
            <Col>
                <h1>FAQ</h1>
                <Card body>
                    <h3>My desired organism is not available. Can you add it?</h3>
                    <p>We need a GFF3 annotation file and corresponding genome sequence in fasta format, and if possible a codon usage table.<br/>
                    Codon usage tables can eg., be obtained <a href="http://www.kazusa.or.jp/codon/">here</a>.<br/>
                    <Link to={routeContact()}>Contact us about adding the organism</Link><br/>
                    </p>
                    <h3>I would like to use a different expression plasmid. Can you add it?</h3>
                    <p><Link to={routeContact()}>Contact us about adding the plasmid</Link>.
                        Include information about how to obtain the plasmid, how the cloning should be performed, and if there are any rules for filtering pegRNAs or sgRNAs, eg., due to poor expression.</p>
                    <h3>I wish to design pegRNAs to revert a mutation to the wild type sequence.</h3>
                    <p>There are different ways to achieve this with pegIT.<br/>
                    <ul>
                        <li>If dealing with a mutation in ClinVar, you can search for the variant click the 'Repair' button</li>
                        <li>Alternatively, the wild type sequence can be searched and selected.
                            Input the parameters necessary to design pegRNAs to introduce the mutation, and check the 'Repair mutation?' checkbox.
                            pegIT will design pegRNAs to restore the wild type sequence.
                            eg. to restore a CTT deletion, enter this CTT deletion and check 'Repair mutation?'.
                        </li>
                        <li>The mutated sequence can also be entered as a custom sequence, and the corresponding repair edit can be entered.</li>
                    </ul>
                    </p>
                    <h3>Is there a command-line tool?</h3>
                    <p>pegIT can be downloaded <a href="https://github.com/dkmva/pegit">here</a>, and be run locally, as a web and command-line tool</p>
                    <h3>How do i reference pegIT in my work?</h3>
                    <p>If you use our tool, please cite: <br/>
                        <strong>Anderson, M. V, Haldrup, J., Thomsen, E. A., Wolff, J. H., & Mikkelsen, J. G. <a href="https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gkab427/6290542?searchresult=1">pegIT - a web-based design tool for prime editing</a>. Nucleic Acids Research (2021).</strong>
                    </p>
                </Card>
            </Col>
        </Row>
    </Container>
)