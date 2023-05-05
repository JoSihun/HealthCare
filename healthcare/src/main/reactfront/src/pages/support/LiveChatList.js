import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteChatRoom, fetchChatRooms } from "../../api/LiveChatAPI";
import { SupportSideBar } from "../../components/SideBar";

const ModalCheck = (props) => {
    const { chatRoom, message } = props;
    const { modalShow, setModalShow } = props;

    const handleHide = async (e) => {
        setModalShow(false);
    }

    const handleDelete = async (e) => {
        deleteChatRoom(chatRoom.id)
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
                <Button variant="secondary" onClick={handleHide} style={{ minWidth: "100px" }}>
                    취소
                </Button>
                <Button variant="danger" onClick={handleDelete} style={{ minWidth: "100px" }}>
                    삭제
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const ChatRoomItem = (props) => {
    const { chatRoom } = props;
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
                        <Link onClick={handleEnter}><Badge className="me-1" bg="dark">문의하기</Badge></Link>
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
    return (
        <Row>
            {props.chatRooms.map((chatRoom, index) => (
                <Col className="col-md-12" key={index}>
                    <ChatRoomItem chatRoom={chatRoom} />
                </Col>
            ))}
        </Row>
    );
}

export default function LiveChatList(props) {
    const userId = "TestUserName";
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        fetchChatRooms(userId)
        .then((response) => {
            setChatRooms(response);
        }).catch((error) => {
            console.log(error);
        });
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
                            <Card.Title><h2><strong>LiveChat Support({chatRooms.length})</strong></h2></Card.Title>
                            <hr className="mb-0" />
                        </Card.Body>

                        <Card.Body style={{ overflow: "auto" }}>
                            <ChatRoomList chatRooms={chatRooms} />
                        </Card.Body>

                        <div className="d-flex justify-content-end mx-3 my-3">
                            <Link to={"/support/livechat/room"}>
                                <Button variant="dark" style={{ width: "100px" }}>문의사항</Button>
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}