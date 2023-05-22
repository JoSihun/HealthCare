import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function NotFound() {
    return (
        <Container fluid>
            <Row className="my-3">
                <Col className="col-12 col-lg-6">
                    <img className="img-fluid"
                    alt="404 Not Found"
                    // src="https://blog.thomasnet.com/hubfs/shutterstock_774749455.jpg"
                    src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000"
                    />
                </Col>
                <Col className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <div className="border-top border-bottom border-danger border-2 rounded p-4">
                        <div className="d-flex justify-content-center mb-1">
                            <h1 className="display-4 fw-bold text-secondary">Oops! Page Not Found</h1>
                        </div>
                        <div className="d-flex justify-content-center mb-2">
                            <h4 className="fw-bold text-primary">The page you are looking for does not exist.</h4>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button className="fw-bold" variant="dark" href="/">Go Back to Homepage</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
