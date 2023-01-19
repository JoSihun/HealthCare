import bg_black from '../img/bg_black.jpg';
import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function MyPage() {
    return (
        <>
            <Container fluid className="min-vh-100">
                <Row className="my-3">
                    <Col className="col-md-12">
                        <Card className="min-vh-100">
                            <Card.Body>
                                <Card.Title>
                                    <div className="">
                                        <div className="d-inline-flex d-inline-block me-md-2">
                                            <img
                                                className="rounded-circle"
                                                src={bg_black}
                                                width="100"
                                                height="100"
                                                alt="profile-image"
                                            />
                                        </div>
                                        <div className="d-inline-block mx-md-2">
                                            <div>Name: Profile</div>
                                            <div>Birth: 1990.01.01</div>
                                            <div>Height: 183cm</div>
                                            <div>Weight: 75kg</div>
                                        </div>
                                    </div>

                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MyPage;