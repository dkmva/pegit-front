import React from 'react'
import { Routes } from 'view/Routes'
import 'App.css';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "redux-first-router-link";

import { routeAbout, routeContact, routeFAQ, routeHome, routeInstructions } from 'state/routes'


const NavItem = ({to, text, disabled=false}) => (
    <Nav.Item>
        <NavLink to={to} className={disabled ? 'nav-link disabled' : 'nav-link'} isActive={() => false}>
            {text}
        </NavLink>
    </Nav.Item>
);

const navLinks = [
    {to: routeHome(), text: 'Home'},
    {to: routeInstructions(), text: 'Instructions'},
    {to: routeAbout(), text: 'About'},
    {to: routeContact(), text: 'Contact'},
    {to: routeFAQ(), text: 'FAQ'},
];

const App = () => {
    return (
        <React.Fragment>
            <Container>
                <Navbar bg="light" variant="light" style={{display: 'block'}} fixed="top">
                    <Nav fill>
                        {navLinks.map((item, i) => <NavItem key={item.text} to={item.to} text={item.text} disabled={item.disabled}/>)}
                    </Nav>
                </Navbar>
            </Container>
            <div style={{marginTop: "72px", paddingTop: "10px"}}>
                <Routes />
            </div>
            <br/>
        </React.Fragment>
    );
};

export default App;