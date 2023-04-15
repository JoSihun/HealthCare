import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsGoogle, BsHeadset, BsInfoCircle, BsInstagram, BsLink, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Footer() {
    return (
        <div className="text-center text-white bg-dark">
            <Container fluid className="p-4 pb-0">
                <Row className="p-3" >
                    <Col className="col-md-6 text-start">
                        <h5 className="text-uppercase"><strong>Footer Content</strong></h5>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
                            Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam,
                            est atque cumque eum delectus sint!
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
                            Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam,
                            est atque cumque eum delectus sint!
                        </p>
                    </Col>
                    <Col className="col-md-3 text-start">
                        <h5 className="text-uppercase"><strong><BsInfoCircle /> Introduce</strong></h5>
                        <hr/>
                        <Link className="d-block mb-1" style={{ color: "white", textDecoration: "none" }}
                            to={`/introduce/staff`}><BsLink /> Staff</Link>
                        <Link className="d-block mb-1" style={{ color: "white", textDecoration: "none" }}
                            to={`/introduce/facility`}><BsLink /> Facility</Link>
                        <Link className="d-block mb-1" style={{ color: "white", textDecoration: "none" }}
                            to={`/introduce/direction`}><BsLink /> Direction</Link>
                    </Col>
                    <Col className="col-md-3 text-start">
                        <h5 className="text-uppercase"><strong><BsHeadset /> Support</strong></h5>
                        <hr/>
                        <Link className="d-block mb-1" style={{ color: "white", textDecoration: "none" }}
                            to={`/support/faqboard`}><BsLink /> FAQ</Link>
                        <Link className="d-block mb-1" style={{ color: "white", textDecoration: "none" }}
                            to={`/support/qnaboard`}><BsLink /> Q&A</Link>
                        <Link className="d-block mb-1" style={{ color: "white", textDecoration: "none" }}
                            to={`/support/freeboard`}><BsLink /> 자유게시판</Link>
                        <Link className="d-block me-1" style={{ color: "white", textDecoration: "none" }}
                            to={`/support/livechat`}><BsLink /> LiveChat</Link>
                    </Col>
                </Row>
            </Container>
            
            <div className="p-3">
                <h4>
                    <Link style={{ color: "white", textDecoration: "none" }} to={`https://google.com/`}><BsGoogle /></Link>&nbsp;&nbsp;
                    <Link style={{ color: "white", textDecoration: "none" }} to={`https://twitter.com/`}><BsTwitter /></Link>&nbsp;&nbsp;
                    <Link style={{ color: "white", textDecoration: "none" }} to={`https://facebook.com/`}><BsFacebook /></Link>&nbsp;&nbsp;
                    <Link style={{ color: "white", textDecoration: "none" }} to={`https://instagram.com/`}><BsInstagram /></Link>&nbsp;&nbsp;
                    <Link style={{ color: "white", textDecoration: "none" }} to={`https://linkedin.com/`}><BsLinkedin /></Link>&nbsp;&nbsp;
                    <Link style={{ color: "white", textDecoration: "none" }} to={`https://github.com/`}><BsGithub /></Link>&nbsp;&nbsp;
                </h4>
            </div>

            <div className="p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                <div>
                    <strong>
                        © 2023 Copyright:&nbsp;
                        <Link to={`https://healthcare.com/`} style={{ color: "white", textDecoration: "none" }}>
                            HealthCare.com
                        </Link>
                    </strong>
                </div>
            </div>
        </div>

    )
}
