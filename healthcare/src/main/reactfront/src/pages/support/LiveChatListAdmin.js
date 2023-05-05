import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteChatRoom, fetchAdminChatRooms, updateChatRoom } from "../../api/LiveChatAPI";
import { SupportSideBar } from "../../components/SideBar";

const ModalCheck = (props) => {
    const { chatRoom, message } = props;
    const { modalShow, setModalShow } = props;

    const handleHide = async (e) => {
        setModalShow(false);
    }

    const handleEvent = async (e) => {
        if (message.includes("삭제")) {
            deleteChatRoom(chatRoom.id)
            .then(() => {
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            });
        }

        if (message.includes("답변상태")) {
            chatRoom.answerYn = !chatRoom.answerYn
            updateChatRoom(chatRoom.id, chatRoom)
            .then(() => {
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <Modal show={modalShow} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title><strong>확인</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>{message}</div>
                <div>(uuid={chatRoom.uuid})</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleHide} style={{ minWidth: "100px" }}>
                    취소
                </Button>
                <Button variant="dark" onClick={handleEvent} style={{ minWidth: "100px" }}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const ChatRoomItem = (props) => {
    const { chatRoom } = props;
    const [modalShow, setModalShow] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleEnter = async (e) => {
        e.preventDefault();
        const queryString = `uuid=${chatRoom.uuid}`;
        window.location.href = `/support/livechat/room/admin?${queryString}`;
    }

    const handleStatus = async (e) => {
        e.preventDefault();
        setModalMessage("해당 문의사항의 답변상태를 변경하시겠습니까?");
        setModalShow(true);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setModalMessage("해당 문의사항을 정말 삭제하시겠습니까?");
        setModalShow(true);
    }

    return (
        <Card className="mb-3">
            <Link onClick={handleEnter} style={{ color:"black", textDecoration: "none" }}>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                        <div>
                            <div><h5><strong>{chatRoom.roomName}님의 문의사항</strong></h5></div>
                            <div style={{ color: "gray" }}><h6><small>({chatRoom.uuid})</small></h6></div>
                            {chatRoom.answerYn
                            ? <Badge pill bg="success">답변완료</Badge>
                            : <Badge pill bg="primary">답변대기</Badge>}
                        </div>
                        <div style={{ color: "gray" }}>
                            <div className="d-flex justify-content-end"><h6><small>문의생성일자: {chatRoom.createdDate}</small></h6></div>
                            <div className="d-flex justify-content-end"><h6><small>문의수정일자: {chatRoom.updatedDate}</small></h6></div>
                        </div>
                    </Card.Title>            
                </Card.Body>
            </Link>

            <Card.Body className="px-2 py-0">
                <Card.Title>
                    <div className="d-flex justify-content-end">
                        <Link onClick={handleStatus}><Badge className="me-1" bg="light" text="dark">상태변경</Badge></Link>
                        <Link onClick={handleEnter}><Badge className="mx-1" bg="dark">답변하기</Badge></Link>
                        <Link onClick={handleDelete}><Badge className="ms-1" bg="danger">삭제</Badge></Link>
                    </div>
                    <ModalCheck chatRoom={chatRoom} message={modalMessage}
                    modalShow={modalShow} setModalShow={setModalShow} />
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

const ChatRoomList = (props) => {
    return (
        <Row>
            {props.chatRooms.map((chatRoom, index) => (
                <Col className="col-md-6" key={index}>
                    <ChatRoomItem chatRoom={chatRoom} />
                </Col>
            ))}
        </Row>
    );
}

export default function LiveChatList() {
    const userId = "Admin";
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        // 관리자 유효성 검사, Front & Back 더블체크
        if (userId === "Admin") {
            fetchAdminChatRooms()
            .then((response) => {
                setChatRooms(response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SupportSideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card style={{ minHeight: "50vh", maxHeight: "75vh" }}>
                        <Card.Body>
                            <Card.Title>
                                <h2><strong>LiveChat Support({chatRooms.length})</strong></h2>
                                <h5><strong><small>관리자ID: {userId}</small></strong></h5>
                            </Card.Title>
                            <hr className="mb-0" />
                        </Card.Body>

                        <Card.Body style={{ overflow: "auto" }}>
                            <ChatRoomList chatRooms={chatRooms} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}