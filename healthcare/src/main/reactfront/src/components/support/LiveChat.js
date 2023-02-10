import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";

function LiveChat() {
    return (
        <div className="LiveChat">
            <Container fluid>
                <Row className="justify-content-center vh-100">
                    <Col className="col-md-2 m-4">
                        <Row className="p-2 sidebar">
                            <div className="sidebarTitle">Support</div>
                            <hr/>
                            <Link to="/support/faq" style={{ textDecoration: 'none' }}><div className="sidebarItem">- FAQ</div></Link>
                            <Link to="/support/qna" style={{ textDecoration: 'none' }}><div className="sidebarItem">- Q&A</div></Link>
                            <Link to="/support/livechat" style={{ textDecoration: 'none' }}><div className="sidebarItem active">- LiveChat</div></Link>
                        </Row>
                    </Col>
                    <Col className="col-md-8 m-4">
                        <Row className="p-4 content h-100 align-content-start">
                            <h1><b>LiveChat Support</b></h1>
                            <hr/>
                            <Card className="mb-3" style={{ minHeight: 700 }}>
                                <Card.Body>This is some message content text within a card body.</Card.Body>
                            </Card>
                            <div className="d-flex flex-column justify-content-center">
                                <input className="mb-3" placeholder="Type Text" />
                                <button>Send</button>
                            </div>

                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LiveChat;