import React, { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

import UserAPI from "../api/user/UserAPI";
import logo from '../logo.svg';

export default function Navigation() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            UserAPI.fetchUser()
            .then(response => setUser(response))
            .catch(error => console.log(error))
        }
    }, [])

    const handleLogout = async () => {
        setUser(null);
        localStorage.clear();
        window.location.assign("/");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand className="d-flex align-items-center" href="/">
                    <img className="img-fluid" width="45" src={logo} alt="Logo" />
                    <div className="fw-bold">HealthCare</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="fw-bold" href="/">Home</Nav.Link>

                        <NavDropdown className="fw-bold" title="Introduce" id="collasible-nav-dropdown">
                            <NavDropdown.Item className="fw-bold" href="/introduce/staff">Staff</NavDropdown.Item>
                            <NavDropdown.Item className="fw-bold" href="/introduce/facility">Facility</NavDropdown.Item>
                            <NavDropdown.Item className="fw-bold" href="/introduce/direction">Direction</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="fw-bold" title="Support" id="collasible-nav-dropdown">
                            <NavDropdown.Item className="fw-bold" href="/support/faqboard">FAQ</NavDropdown.Item>
                            <NavDropdown.Item className="fw-bold" href="/support/qnaboard">Q&A</NavDropdown.Item>
                            <NavDropdown.Item className="fw-bold" href="/support/livechat">LiveChat</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="fw-bold" href="/support/freeboard">자유게시판</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {user ? (
                        <Nav>
                            <NavDropdown className="fw-bold" title={`${user.name}님 환영합니다.`} id="collasible-nav-dropdown">
                                <NavDropdown.Item className="fw-bold" href="/my-page/bmi">BMI</NavDropdown.Item>
                                <NavDropdown.Item className="fw-bold" href="/my-page/diet">내 식단</NavDropdown.Item>
                                <NavDropdown.Item className="fw-bold" href="/my-page/routine">운동루틴</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="fw-bold" href="/my-page">MyPage</NavDropdown.Item>
                                <NavDropdown.Item className="fw-bold" onClick={handleLogout}>로그아웃</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link className="fw-bold" href="/signin">Login</Nav.Link>
                            <Nav.Link className="fw-bold" href="/signup">SignUp</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
