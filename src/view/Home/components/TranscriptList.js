import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import Link from "redux-first-router-link";
import { FaExternalLinkAlt } from 'react-icons/fa';

import TranscriptPlot from "view/Home/components/TranscriptPlot";

export default ({selectedGene, selectedOrganism, routeTranscript}) => (
    <Card body>
        { selectedGene.transcripts.map(transcript => (
            <Row key={transcript.id}>
                <Col md={2}>
                    <a href={`${selectedOrganism.sequenceSearch}${transcript.transcriptId.replace('gene-', '').replace('rna-', '')}`} target="_blank"  rel="noopener noreferrer">{transcript.name} <FaExternalLinkAlt/></a><br/>
                    {transcript.transcriptType}<br/>
                </Col>
                <Col md={8}>
                    <TranscriptPlot gene={selectedGene} transcript={transcript}/>
                </Col>
                <Col md={2}>
                    <Link className="btn btn-outline-success" to={ routeTranscript(transcript.id) }>Select</Link>
                </Col>
            </Row>
        ))}
    </Card>
)