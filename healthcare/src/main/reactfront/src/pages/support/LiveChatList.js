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

    const handleDelete = async (e) => {
        LiveChatAPI.deleteChatRoom(chatRoom.id)
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Modal show={modalShow} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title><strong>삭제확인</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>{message}</div>
                <div>(uuid={chatRoom.uuid})</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleHide} style={{ minWidth: "100px" }}>취소</Button>
                <Button variant="danger" onClick={handleDelete} style={{ minWidth: "100px" }}>삭제</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ChatRoomItem = (props) => {
    const { user, chatRoom } = props;
    const [modalShow, setModalShow] = useState(false);

    const handleEnter = async (e) => {
        e.preventDefault();
        const queryString = `uuid=${chatRoom.uuid}`;
        window.location.href = `/support/livechat/room?${queryString}`;
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setModalShow(true);
    }

    return (
        <Card>
            <Link onClick={handleEnter} style={{ color:"black", textDecoration: "none" }}>
                <Card.Body className="pb-0">
                    <Card.Title className="d-flex justify-content-between">
                        <div>
                            <div className="text-dark"><h5><strong>{user.name}님의 문의사항</strong></h5></div>
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
                        <Link onClick={handleEnter}><Badge className="me-1" bg="dark">문의보기</Badge></Link>
                        <Link onClick={handleDelete}><Badge className="ms-1" bg="danger">삭제</Badge></Link>
                    </div>
                    <ModalCheck modalShow={modalShow} setModalShow={setModalShow}
                        chatRoom={chatRoom} message={"해당 문의사항을 정말 삭제하시겠습니까?"}/>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

const ChatRoomList = (props) => {
    const { chatRooms } = props;
    const [user, setUser] = useState({});

    useEffect(() => {
        UserAPI.fetchUser()
        .then(response => setUser(response))
        .catch(error => console.log(error));
    }, []);

    return (
        <Row className="justify-content-center mt-3">
            {chatRooms.map((chatRoom, index) => (
                <Col className="col-12 col-lg-12 mb-3" key={index}>
                    <ChatRoomItem user={user} chatRoom={chatRoom} />
                </Col>
            ))}
        </Row>
    );
}

const LiveChatListBody = (props) => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        LiveChatAPI.fetchChatRooms()
        .then((response) => {
            setChatRooms(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Card>
            <Card.Body className="border-bottom">
                <Card.Title className="fs-2 fw-bold">
                    LiveChat Support({chatRooms.length})
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

export default function LiveChatList() {
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
    );
}
