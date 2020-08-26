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
                    <p>Manuscript in preparation</p>
                </Card>
            </Col>
        </Row>
    </Container>
)