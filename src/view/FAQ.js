
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
                    <p>We need a GFF3 annotation file and corresponding genome sequence in fasta format, and if possible a codon usage table.<br/> <Link to={routeContact()}>Contact us about adding the organism</Link></p>
                    <h3>Is there a command-line tool?</h3>
                    <p>pegIT can be downloaded <a href="https://github.com/dkmva/pegit">here</a>, and be run locally, as a web and command-line tool</p>
                    <h3>How do i reference pegIT in my work?</h3>
                    <p>Manuscript is currently in preparation</p>
                </Card>
            </Col>
        </Row>
    </Container>
)