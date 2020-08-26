import React from 'react';
import {Col, Row} from "react-bootstrap";
import logo from "assets/logo.png";

export default () => <Row>
    <Col style={{textAlign: 'center'}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>pegRNAs for your desired edit</p>
    </Col>
</Row>