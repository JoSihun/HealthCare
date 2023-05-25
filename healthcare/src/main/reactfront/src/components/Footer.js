import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { BsFacebook, BsGithub, BsGoogle, BsHeadset, BsInfoCircle, BsInstagram, BsLink, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Footer() {
    return (
        <Container fluid className="bg-dark text-white">
            <Row className="justify-content-center pt-3">
                <Col className="col-12 col-lg-6 mb-3 ps-4">
                    <h5 className="fw-bold text-uppercase">Footer Content</h5>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
                        Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam,
                        est atque cumque eum delectus sint!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
                        Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam,
                        est atque cumque eum delectus sint!
                    </p>
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <h5 className="fw-bold text-uppercase"><BsInfoCircle /> Introduce</h5>
                    <hr/>
                    <Link className="d-block fw-bold mb-1" style={{ color: "white", textDecoration: "none" }}
                        to={`/introduce/staff`} ><BsLink /> Staff</Link>
                    <Link className="d-block fw-bold mb-1" style={{ color: "white", textDecoration: "none" }}
                        to={`/introduce/facility`} ><BsLink /> Facility</Link>
                    <Link className="d-block fw-bold mb-1" style={{ color: "white", textDecoration: "none" }}
                        to={`/introduce/direction`} ><BsLink /> Direction</Link>
                </Col>
                <Col className="col-12 col-lg-3 mb-3">
                    <h5 className="fw-bold text-uppercase"><BsHeadset /> Support</h5>
                    <hr/>
                    <Link className="d-block fw-bold mb-1" style={{ color: "white", textDecoration: "none" }}
                        to={`/support/faqboard`}><BsLink /> FAQ</Link>
                    <Link className="d-block fw-bold mb-1" style={{ color: "white", textDecoration: "none" }}
                        to={`/support/qnaboard`}><BsLink /> Q&A</Link>
                    <Link className="d-block fw-bold mb-1" style={{ color: "white", textDecoration: "none" }}
                        to={`/support/livechat`}><BsLink /> LiveChat</Link>
                    <Link className="d-block fw-bold mb-1" style={{ color: "white", textDecoration: "none" }}
                        to={`/support/freeboard`}><BsLink /> 자유게시판</Link>
                </Col>
            </Row>
            <Row className="justify-content-center pt-1"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}>
                <Col className="col-12 col-lg-12 mb-2">
                    <div className="d-flex justify-content-center fs-4">
                        <Link style={{ color: "white", textDecoration: "none" }} to={`https://google.com/`}><BsGoogle /></Link>&nbsp;&nbsp;
                        <Link style={{ color: "white", textDecoration: "none" }} to={`https://twitter.com/`}><BsTwitter /></Link>&nbsp;&nbsp;
                        <Link style={{ color: "white", textDecoration: "none" }} to={`https://facebook.com/`}><BsFacebook /></Link>&nbsp;&nbsp;
                        <Link style={{ color: "white", textDecoration: "none" }} to={`https://instagram.com/`}><BsInstagram /></Link>&nbsp;&nbsp;
                        <Link style={{ color: "white", textDecoration: "none" }} to={`https://linkedin.com/`}><BsLinkedin /></Link>&nbsp;&nbsp;
                        <Link style={{ color: "white", textDecoration: "none" }} to={`https://github.com/`}><BsGithub /></Link>&nbsp;&nbsp;
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center pt-2"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                <Col className="col-12 col-lg-12 mb-2">
                    <div className="d-flex justify-content-center fw-bold">
                        © 2023 Copyright:&nbsp;
                        <Link to={`/`} style={{ color: "white", textDecoration: "none" }}>
                            HealthCare.com
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
