import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";

import CardImage from "../assets/images/bg_black.jpg";
import BackGroundImage from "../assets/images/bg_home.jpg";

const CardItem = (props) => {
    return (
        <Card>
            <Card.Img variant="top" src={CardImage} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <div>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </div>
            </Card.Body>
        </Card>
    );
}

export default function Home() {
    return (
        <Container fluid className="min-vh-100 bg-white text-black"
            style={{ backgroundImage: `url(${BackGroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed" }}>

            <Row className="min-vh-25 justify-content-center pt-3">
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
            </Row>

            <Row className="min-vh-25 justify-content-center pt-3">
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
            </Row>

            <Row className="min-vh-25 justify-content-center pt-3">
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
            </Row>

            <Row className="min-vh-25 justify-content-center pt-3">
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <CardItem />
                </Col>
            </Row>
        </Container>
    );
}
