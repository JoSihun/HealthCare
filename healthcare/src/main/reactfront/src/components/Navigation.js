import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import UserAPI from '../api/user/UserAPI';
import logo from '../logo.svg';

export default function Navigation() {
    const [currentUser, setCurrentUser] = useState({});
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        if (accessToken) {
            UserAPI.fetchUser()
            .then(response => setCurrentUser(response))
            .catch(error => console.log(error));
        }
    }, [accessToken]);

    const handleLogout = async () => {
        setCurrentUser({});
        setAccessToken(null);
        localStorage.clear();
        window.location.assign("/home");
    }

    return (
        <Navbar bg='dark' variant='dark' fixed='top' expand='lg' collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} width="40" height="35" alt="" /> HealthCare
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" alt="Nav Empty Space">

                    </Nav>
                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <NavDropdown title="Introduce" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/introduce/staff">Staff</NavDropdown.Item>
                            <NavDropdown.Item href="/introduce/facility">Facility</NavDropdown.Item>
                            <NavDropdown.Item href="/introduce/direction">Direction</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Support" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/support/faqboard">FAQ</NavDropdown.Item>
                            <NavDropdown.Item href="/support/qnaboard">Q&A</NavDropdown.Item>
                            <NavDropdown.Item href="/support/freeboard">자유게시판</NavDropdown.Item>
                            <NavDropdown.Item href="/support/livechat">LiveChat</NavDropdown.Item>
                        </NavDropdown>
                        {accessToken ? (
                            <NavDropdown title={`${currentUser.username}님 환영합니다.`} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/my-page">MyPage</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link href="/signup">SignUp</Nav.Link>
                                <Nav.Link href="/signin">LogIn</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
