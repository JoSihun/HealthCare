import logo from '../logo.svg';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import {NavDropdown} from "react-bootstrap";

function Navigation() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} width="40" height="35" />
                        HealthCare
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto" alt="Nav Empty Space">

                        </Nav>
                        <Nav>
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/introduce">Introduce</Nav.Link>
                            <NavDropdown title="Support" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/support/faq">FAQ</NavDropdown.Item>
                                <NavDropdown.Item href="/support/qna">Q&A</NavDropdown.Item>
                                <NavDropdown.Item href="/support/livechat">LiveChat</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/my-page">MyPage</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;