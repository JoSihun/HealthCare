import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from "../../components/support/SideBar";

const ChatRoom = (props) => {
    const handleEnter = async (e) => {
        e.preventDefault();
    }
    const handleEdit = async (e) => {
        
    }

    const handleDelete = async (e) => {
        e.preventDefault();
    }

    return (
        <Card className="mb-3">
            <Link onClick={handleEnter} style={{ color:"black", textDecoration: "none" }}>
                <Card.Body >
                    <Card.Title><h5><strong>roomName-roomId</strong></h5>
                    <Badge pill bg="success">답변완료</Badge>&nbsp;
                    <Badge pill bg="primary">답변대기</Badge>&nbsp;
                    </Card.Title>
                </Card.Body>
            </Link>
            <div className="d-flex justify-content-end mx-2 mb-1">
                <Link onClick={handleEdit}><Badge className="me-1" bg="dark">답변</Badge></Link>
                <Link onClick={handleDelete}><Badge className="ms-1" bg="danger">삭제</Badge></Link>
            </div>
        </Card>
    );
}

const ChatRoomList = (props) => {
    return (
        <Row>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
            <Col className="col-md-6">
                <ChatRoom />
            </Col>
        </Row>
    );
}

export default function LiveChatList() {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card style={{ minHeight: "50vh", maxHeight: "75vh", overflow: "auto"}}>
                        <Card.Body>
                            <Card.Title><h2><strong>LiveChat Support(Admin)</strong></h2></Card.Title>
                            <hr/>
                            <ChatRoomList />

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}