import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from "../../components/support/SideBar";

const ModalCheck = (props) => {
    const { userId, chatRoom, setChatRooms } = props;
    const { message, modalShow, setModalShow } = props;
    const handleHide = () => setModalShow(false);

    const handleDelete = async (e) => {
        const queryString = `userId=${userId}&roomId=${chatRoom.id}`;
        await axios.delete(`/support/livechat/list?${queryString}`)
        .then((response) => {
            handleHide();
            setChatRooms(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Modal show={modalShow} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title><strong>삭제확인</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleHide}>
                    취소
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    삭제
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const ChatRoomItem = (props) => {
    const { userId } = props;
    const { chatRoom, setChatRooms } = props;
    const [modalShow, setModalShow] = useState(false);

    const handleEnter = async (e) => {
        e.preventDefault();
        const queryString = `id=${chatRoom.uuid}`;
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
                    <Card.Title>
                        <div className="d-flex justify-content-between">
                            <div><h5><strong>{chatRoom.roomName}님의 문의사항({chatRoom.uuid})</strong></h5></div>
                            <div style={{ color: "gray"}}><small>{chatRoom.createdDate}</small></div>
                        </div>
                        <div className="d-flex justify-content-between">
                            {chatRoom.answerYn
                            ?
                            <Badge pill bg="success">답변완료</Badge>
                            :
                            <Badge pill bg="primary">답변대기</Badge>
                            }
                            <div style={{ color: "gray"}}><small>{chatRoom.updatedDate}</small></div>
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
                    <ModalCheck chatRoom={chatRoom} setChatRooms={setChatRooms}
                    modalShow={modalShow} setModalShow={setModalShow} userId={userId}
                    message={"해당 문의사항을 삭제하시겠습니까?"}/>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

const ChatRoomList = (props) => {
    const { userId, chatRooms, setChatRooms } = props;

    return (
        <Row>
            {chatRooms.map((chatRoom, index) => (
                <Col className="col-md-12" key={index}>
                    <ChatRoomItem userId={userId} chatRoom={chatRoom} setChatRooms={setChatRooms}/>
                </Col>
            ))}
        </Row>
    );
}

export default function LiveChatList(props) {
    const userId = "TestUserName";
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const axiosGetChatRooms = async () => {
            await axios.get(`/api/livechat/list/${userId}`)
            .then((response) => {
                setChatRooms(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetChatRooms();
    }, []);

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card style={{ minHeight: "50vh", maxHeight: "75vh" }}>
                        <Card.Body style={{ overflow: "auto" }}>
                            <Card.Title><h2><strong>LiveChat Support</strong></h2></Card.Title>
                            <hr/>
                            <ChatRoomList userId={userId} chatRooms={chatRooms} setChatRooms={setChatRooms}/>
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