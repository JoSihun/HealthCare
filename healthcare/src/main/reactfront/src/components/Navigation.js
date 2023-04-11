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
                        <img src={logo} width="40" height="35" alt="" />
                        HealthCare
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto" alt="Nav Empty Space">

                        </Nav>
                        <Nav>
                            <Nav.Link href="/home">Home</Nav.Link>

                            <NavDropdown title="Introduce" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/introduce/facility">facility</NavDropdown.Item>
                                <NavDropdown.Item href="/introduce/staff">Staff</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Support" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/support/faqboard">FAQ</NavDropdown.Item>
                                <NavDropdown.Item href="/support/qnaboard">Q&A</NavDropdown.Item>
                                <NavDropdown.Item href="/support/freeboard">자유게시판</NavDropdown.Item>
                                <NavDropdown.Item href="/support/livechat">LiveChat</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Users" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
                                <NavDropdown.Item href="/signin">SignIn</NavDropdown.Item>
                                <NavDropdown.Item href="/my-page">MyPage</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;