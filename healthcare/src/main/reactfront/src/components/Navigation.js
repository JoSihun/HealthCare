import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css'

function Navigation() {
    return (
        <div className="Navigation">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">HealthCare</Navbar.Brand>
                    <Nav className="menu">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;