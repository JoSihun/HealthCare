import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from "../../components/support/SideBar";

const ChatRoom = (props) => {
    const { id, roomId, roomName, answerYn } = props;
    const { createdDate, updatedDate } = props;

    const handleEnter = async (e) => {
        e.preventDefault();
        console.log(props.chatRoom);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await axios.delete(`/support/livechat/list/${id}`)
        .then((response) => {
            
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Card className="mb-3">
            <Link onClick={handleEnter} style={{ color:"black", textDecoration: "none" }}>
                <Card.Body>
                    <Card.Title>
                        <div className="d-flex justify-content-between">
                            <div><h5><strong>{roomName}-{roomId}</strong></h5></div>
                            <div style={{ color: "gray"}}><small>{createdDate}</small></div>
                        </div>
                        <div className="d-flex justify-content-between">
                            {answerYn
                            ?
                            <Badge pill bg="success">답변완료</Badge>
                            :
                            <Badge pill bg="primary">답변대기</Badge>
                            }

                            {/* <Badge pill bg="success">답변완료</Badge>&nbsp; */}
                            {/* <Badge pill bg="primary">답변대기</Badge>&nbsp; */}
                            <div style={{ color: "gray"}}><small>{updatedDate}</small></div>
                        </div>
                    </Card.Title>            
                </Card.Body>
            </Link>
            <Card.Body className="px-2 py-0">
                <Card.Title>
                    <div className="d-flex justify-content-end">
                        <Link onClick={handleEnter}><Badge className="me-1" bg="dark">답변</Badge></Link>
                        <Link onClick={handleDelete}><Badge className="ms-1" bg="danger">삭제</Badge></Link>
                    </div>
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
                    <ChatRoom chatRoom={chatRoom} />
                </Col>
            ))}
        </Row>
    );
}

export default function LiveChatList() {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const axiosGetChatRooms = async () => {
            await axios.get(`/support/livechat/list`)
            .then((response) => {
                setChatRooms(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetChatRooms();
    }, [chatRooms.length]);

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
                            <ChatRoomList chatRooms={chatRooms} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}