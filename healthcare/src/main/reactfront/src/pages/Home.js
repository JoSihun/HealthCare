import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Card, Col, Row } from "react-bootstrap";
import CardImage from "../assets/images/bg_black.jpg";
import BackGroundImage from "../assets/images/bg_home.jpg";

const TestHomeAPI = (props) => {
    const [testData, setTestData] = useState("Test Data Before");
    useEffect(() => {
        const callAPI = async () => {
            axios.get(`/home`)
            .then((response) => {
                setTestData(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        callAPI();
    }, []);

    return <h1>{testData}</h1>
}

const CardItem = (props) => {
    return (
        <Card>
            <Card.Img variant="top" src={CardImage} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <div>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    <TestHomeAPI />
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

            <Row className="justify-content-center py-4" style={{ minHeight: "25vh" }}>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
            </Row>

            <Row className="justify-content-center pb-4" style={{ minHeight: "25vh" }}>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
            </Row>

            <Row className="justify-content-center pb-4" style={{ minHeight: "25vh" }}>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
            </Row>

            <Row className="justify-content-center pb-4" style={{ minHeight: "25vh" }}>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
                <Col className="col-md-3">
                    <CardItem />
                </Col>
            </Row>
            
        </Container>
    )
}