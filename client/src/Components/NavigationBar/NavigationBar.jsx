import React from "react";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='/dashboard/send_email'>Send E-mail</Nav.Link>
                        <Nav.Link href="/dashboard/create_template">Create a template</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;