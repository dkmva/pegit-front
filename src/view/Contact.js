import React from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";


export const Contact = () => (
    <Container>
        <Row>
            <Col>
                <h1>Contact</h1>
                <Card body>
                    <p>For any pegIT related inquiries, contact <a href="mailto:madsanderson@gmail.com">Mads</a></p>
                </Card>
            </Col>
        </Row>
    </Container>
)