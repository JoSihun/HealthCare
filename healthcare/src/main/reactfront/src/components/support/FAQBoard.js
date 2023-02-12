import './FAQBoard.css'
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
                    <Accordion.Item eventKey={ faq.id }>
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
                            <Link to="/support/faqboard" style={{ textDecoration: 'none' }}><div className="sidebarItem active">- FAQ</div></Link>
                            <Link to="/support/qnaboard" style={{ textDecoration: 'none' }}><div className="sidebarItem">- Q&A</div></Link>
                            <Link to="/support/livechat" style={{ textDecoration: 'none' }}><div className="sidebarItem">- LiveChat</div></Link>
                        </Row>
                    </Col>

                    {/* Main Content */}
                    <Col className="col-md-8 m-4">
                        <Row className="p-4 content h-75 align-content-start">
                            <h1><b>FAQ</b></h1>
                            <hr/>
                            <GetFAQList />
                        </Row>
                        <Row className="p-2 h-25 align-content-start">
                            <div className="p-0 d-flex justify-content-end">
                                <Link to="/support/faqboard/form" style={{ textDecoration: 'none' }}><Button className="mx-2">Create</Button></Link>
                                <Link to="/support/faqboard" style={{ textDecoration: 'none' }}><Button className="mx-2">Cancel</Button></Link>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FAQ;