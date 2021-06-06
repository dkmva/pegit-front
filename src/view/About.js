import React from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap';

export const About = () => (
    <Container>
        <Row>
            <Col>
                <h1>About</h1>
                <Card body>
                    <p>pegIT facilitates rapid and effective design of pegRNAs for prime editing based on simple inputs. Simply select the desired organism, and gene of interest and input the desired modifications.</p>
                    <p>For sequences not in the database, pegIT also supports custom DNA sequences that can be pasted directly into the software. Furthermore, variants can be imported directly from ClinVar and pegRNAs can be designed to introduce or repair the variant.</p>
                    <p>pegIT can be downloaded <a href="https://github.com/dkmva/pegit">here</a>, and be run locally, as a web and command-line tool</p>
                    <h3>Reference</h3>
                    <p>If you use our tool, please cite: <br/>
                        <strong>Anderson, M. V, Haldrup, J., Thomsen, E. A., Wolff, J. H., & Mikkelsen, J. G. <a href="https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gkab427/6290542?searchresult=1">pegIT - a web-based design tool for prime editing</a>. Nucleic Acids Research (2021).</strong>
                    </p>
                    <h3>Changelog</h3>
                    <p>June 2021:<br/>
                        Off-target search speed improved, PAM filtering done directly on bowtie output.<br/>
                        Bowtie query changed from: <code>-c [SPACER] -v 3</code> to: <code>-c [SPACER + 'N'*PAM_LENGTH] -n 3 -l [SPACER_LENGTH] -e [(PAM_LENGTH+3)*30)</code><br/>
                        SpCas9 example, changed from: <code>-c TGCGCTTCGGCGTCTGGGCA -v 3</code> to: <code>-c TGCGCTTCGGCGTCTGGGCANNN -n 3 -l 20 -e 180</code>
                    </p>
                </Card>
            </Col>
        </Row>
    </Container>
)