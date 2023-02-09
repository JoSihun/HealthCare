import './FAQ.css'
import React, { useEffect, useState } from "react";
import {Accordion, Row, Col, Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import axios from 'axios';
//SideBar 참고: https://citylock77.tistory.com/130

const GetFAQList = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect( () => {
        // 방법3 비동기
        const getAxios = async () => {
            try {
                const response = await axios.get("/support/faq");
                setFaqs(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAxios();
    }, []);

    return (
        <>
            <Accordion>
                {faqs.map(faq => (
                    <Accordion.Item eventKey="0">
                    <Accordion.Header><h3>Q. { faq.title }</h3></Accordion.Header>
                    <Accordion.Body>
                        <h5>{ faq.content }</h5>
                    </Accordion.Body>
                </Accordion.Item>
                ))}
            </Accordion>
        </>
    );
}

function FAQ() {
    return (
        <div className="FAQ">
            <Container fluid>
                <Row className="justify-content-center vh-100">
                    {/* SideBar */}
                    <Col className="col-md-2 m-4">
                        <Row className="p-2 sidebar">
                            <div className="sidebarTitle">Support</div>
                            <hr/>
                            <Link to="/support/faq" style={{ textDecoration: 'none' }}><div className="sidebarItem active">- FAQ</div></Link>
                            <Link to="/support/qna" style={{ textDecoration: 'none' }}><div className="sidebarItem">- Q&A</div></Link>
                            <Link to="/support/livechat" style={{ textDecoration: 'none' }}><div className="sidebarItem">- LiveChat</div></Link>
                        </Row>
                    </Col>

                    {/* Main Content */}
                    <Col className="col-md-8 m-4">
                        <Row className="p-4 content h-75 align-content-start">
                            <h1><b>FAQ</b></h1>
                            <hr/>
                            <GetFAQList />
                            {/* <Accordion>
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
                            </Accordion> */}
                        </Row>
                        <Row className="p-2 h-25 align-content-start">
                            <div className="p-0 d-flex justify-content-end">
                                <Link to="/support/faq/form" style={{ textDecoration: 'none' }}><Button className="mx-2">Create</Button></Link>
                                <Link to="/support/faq/list" style={{ textDecoration: 'none' }}><Button className="mx-2">Delete</Button></Link>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FAQ;