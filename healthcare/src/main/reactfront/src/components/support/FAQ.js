import './FAQ.css'
import React from "react";
import {Accordion, Row, Col} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
//SideBar 참고: https://citylock77.tistory.com/130

function FAQ() {
    return (
        <div className="FAQ">
            <Container fluid>
                <Row className="justify-content-center vh-100">
                    <Col className="col-md-2 m-4">
                        <Row className="p-2 sidebar">
                            <div className="sidebarTitle">Support</div>
                            <hr/>
                            <Link to="/support/faq" style={{ textDecoration: 'none' }}><div className="sidebarItem active">- FAQ</div></Link>
                            <Link to="/support/qna" style={{ textDecoration: 'none' }}><div className="sidebarItem">- Q&A</div></Link>
                            <Link to="/support/livechat" style={{ textDecoration: 'none' }}><div className="sidebarItem">- LiveChat</div></Link>
                        </Row>
                    </Col>
                    <Col className="col-md-8 m-4">
                        <Row className="p-4 content h-100 align-content-start">
                            <h1><b>FAQ</b></h1>
                            <hr/>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><h3>Q. Accordion Item #1</h3></Accordion.Header>
                                    <Accordion.Body>
                                        <h5>
                                            A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </h5>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><h3>Q. Accordion Item #2</h3></Accordion.Header>
                                    <Accordion.Body className="bg-primary">
                                        <h5>
                                            A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </h5>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><h3>Q. Accordion Item #3</h3></Accordion.Header>
                                    <Accordion.Body className="bg-primary">
                                        <h5>
                                            A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </h5>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FAQ;