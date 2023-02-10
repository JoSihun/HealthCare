import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css'
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <div className="Navigation">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link className="navbar-brand" to="/">HealthCare</Link>
                    <Nav className="menu">
                        <Link className="nav-link" to="/home">Home</Link>
                        <Link className="nav-link" to="/introduce">Introduce</Link>
                        <Link className="nav-link" to="/support">Support</Link>
                        <Link className="nav-link" to="/my-page">MyPage</Link>
                        <Link className="nav-link" to="/Login">Login</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;