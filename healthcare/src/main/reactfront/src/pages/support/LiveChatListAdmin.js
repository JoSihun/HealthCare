import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

import UserAPI from "../../api/user/UserAPI";
import LiveChatAPI from "../../api/support/LiveChatAPI";
import { SupportSideBar } from "../../components/SideBar";

const ModalCheck = (props) => {
    const { chatRoom, message } = props;
    const { modalShow, setModalShow } = props;

    const handleHide = async (e) => {
        setModalShow(false);
    }

    const handleEvent = async (e) => {
        if (message.includes("삭제")) {
            LiveChatAPI.deleteChatRoom(chatRoom.id)
            .then(() => {
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            });
        }

        if (message.includes("답변상태")) {
            chatRoom.answerYn = !chatRoom.answerYn
            LiveChatAPI.updateChatRoom(chatRoom.id, chatRoom)
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
                <Button variant="secondary" onClick={handleHide} style={{ minWidth: "100px" }}>취소</Button>
                <Button variant="dark" onClick={handleEvent} style={{ minWidth: "100px" }}>확인</Button>
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
        <Card>
            <Link onClick={handleEnter} style={{ color:"black", textDecoration: "none" }}>
                <Card.Body className="pb-0">
                    <Card.Title className="d-flex justify-content-between">
                        <div>
                            <div className="text-dark"><h5><strong>{chatRoom.users[0].name}님의 문의사항</strong></h5></div>
                            <div className="text-secondary"><h6><small>({chatRoom.uuid})</small></h6></div>
                            {chatRoom.answerYn
                            ? <Badge pill bg="success">답변완료</Badge>
                            : <Badge pill bg="primary">답변대기</Badge>}
                        </div>
                        <div className="fs-6 text-secondary">
                            <div><small>문의생성일자: {chatRoom.createdDate}</small></div>
                            <div><small>문의수정일자: {chatRoom.updatedDate}</small></div>
                        </div>
                    </Card.Title>
                </Card.Body>
            </Link>

            <Card.Body className="pt-0 pb-1">
                <Card.Title>
                    <div className="d-flex justify-content-end">
                        <Link onClick={handleStatus}><Badge className="me-1" bg="secondary">상태변경</Badge></Link>
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
    const { chatRooms } = props;

    return (
        <Row className="justify-content-start mt-3">
            {chatRooms.map((chatRoom, index) => (
                <Col className="col-12 col-lg-6 mb-3" key={index}>
                    <ChatRoomItem chatRoom={chatRoom} />
                </Col>
            ))}
        </Row>
    );
}

const LiveChatListBody = (props) => {
    const [user, setUser] = useState({});
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        UserAPI.fetchUser()
        .then(response => setUser(response))
        .catch(error => console.log(error));

        LiveChatAPI.fetchAdminChatRooms()
        .then(response => setChatRooms(response))
        .catch(() => window.location.assign(`/notfound`));
    }, []);

    return (
        <Card>
            <Card.Body className="border-bottom">
                <Card.Title>
                    <div className="fs-2 fw-bold">LiveChat Support({chatRooms.length})</div>
                    <div className="fs-5 fw-bold"><small>관리자: {user.name || "Undefined"}님({user.email})</small></div>
                </Card.Title>
            </Card.Body>

            <Card.Body className="py-0" style={{ minHeight: "50vh", maxHeight: "75vh", overflow: "auto" }}>
                <ChatRoomList chatRooms={chatRooms} />
            </Card.Body>

            <Card.Body className="border-top">
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-dark" style={{ width: "100px" }} to={`/support/livechat/room`}>
                        문의사항
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default function LiveChatListAdmin() {
    return (
        <Container fluid>
            <Row className="justify-content-center mt-3">
                <Col className="col-12 col-lg-2 mb-3">
                    <SupportSideBar />
                </Col>
                <Col className="col-12 col-lg-9 mb-3">
                    <LiveChatListBody />
                </Col>
            </Row>
        </Container>
    )
}