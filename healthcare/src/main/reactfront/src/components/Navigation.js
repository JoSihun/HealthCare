import logo from '../logo.svg';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import {NavDropdown} from "react-bootstrap";
import { useEffect, useState } from 'react';
import { fetchUser } from '../api/UserAPI';

export default function Navigation() {
    const [user, setUser] = useState({});
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [ACCESS_TOKEN]);

    const handleLogout = async () => {
        localStorage.clear();
    }

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
                                <NavDropdown.Item href="/introduce/direction">Direction</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Support" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/support/faqboard">FAQ</NavDropdown.Item>
                                <NavDropdown.Item href="/support/qnaboard">Q&A</NavDropdown.Item>
                                <NavDropdown.Item href="/support/freeboard">자유게시판</NavDropdown.Item>
                                <NavDropdown.Item href="/support/livechat">LiveChat</NavDropdown.Item>
                            </NavDropdown>

                            {ACCESS_TOKEN
                            ?
                            <NavDropdown title={user.username + "님 환영합니다"} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/my-page">MyPage</NavDropdown.Item>
                                <NavDropdown.Item href="/" onClick={handleLogout}>로그아웃</NavDropdown.Item>
                            </NavDropdown>
                            :
                            <>
                                <Nav.Link href="/signup">SignUp</Nav.Link>
                                <Nav.Link href="/signin">LogIn</Nav.Link>
                            </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
