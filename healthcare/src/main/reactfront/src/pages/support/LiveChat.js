import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import SideBar from "../../components/support/SideBar";
import bg_black from "../../assets/images/bg_black.jpg"

export default function LiveChat() {
    return (
        <div className="LiveChat">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="col-md-2 mx-2 my-4">
                        <SideBar />
                    </Col>

                    <Col className="col-md-9 mx-2 my-4">
                        <Card>
                            <Card.Body>
                                <Card.Title><h2><strong>LiveChat Support</strong></h2></Card.Title>
                                <hr/>
                                <Card>
                                    <Card.Body style={{ minHeight: "25vh", maxHeight: "75vh", overflow: "auto" }}>
                                        {/* 추후 더 깔끔하게 정리할 수 있다면 수정 */}
                                        <div className="mb-2">
                                            <div className="d-flex justify-content-start">
                                                <div className="me-1" style={{ fontWeight: "bold" }}>운영자</div>
                                                <div className="ms-1" style={{ color: "gray", fontSize: "small", verticalAlign: "bottom" }}>2023.02.02 15:30</div>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <div className="d-inline-block me-1">
                                                    <img
                                                        className="rounded-circle"
                                                        src={bg_black}
                                                        width="50"
                                                        height="50"
                                                        alt="profile"
                                                    />
                                                </div>
                                                <div className="d-inline-block border border-secondary rounded m-1 p-2">
                                                    이거슨 답변답변입니다.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <div className="d-flex justify-content-end">
                                                <div className="me-1" style={{ fontWeight: "bold" }}>사용자</div>
                                                <div className="ms-1" style={{ color: "gray", fontSize: "small" }}>2023.02.02 15:30</div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <div className="d-inline-block border border-secondary rounded m-1 p-2">
                                                    이거슨 질문질문입니다.
                                                </div>
                                                <div className="d-inline-block ms-1">
                                                    <img
                                                        className="rounded-circle"
                                                        src={bg_black}
                                                        width="50"
                                                        height="50"
                                                        alt="profile"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </Card.Body>
                                    <hr/>
                                    <Card.Body>
                                        <form>
                                            <div className="form-group mb-3">
                                                <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용 입력</label>
                                                <textarea className="form-control" id="content" rows="3"></textarea>
                                            </div>
                                            <div className="form-group d-flex justify-content-end">
                                                <Button variant="dark" style={{ width: "100px" }}>전송</Button>
                                            </div>
                                        </form>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                        {/* <Row className="p-4 content h-100 align-content-start">
                            <h1><b>LiveChat Support</b></h1>
                            <hr/>
                            <Card className="mb-3" style={{ minHeight: 700 }}>
                                <Card.Body>This is some message content text within a card body.</Card.Body>
                            </Card>
                            <div className="d-flex flex-column justify-content-center">
                                <input className="mb-3" placeholder="Type Text" />
                                <button>Send</button>
                            </div>
                        </Row> */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}