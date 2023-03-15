import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "../../components/support/SideBar";
import bg_black from "../../assets/images/bg_black.jpg";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";

const ChatForm = (props) => {
    const client = useRef({});
    const [chatData, setChatData] = useState({
        sender: "User",
        message: "",
    });

    const connect = () => {
        client.current = new StompJS.Client({
            // brokerURL: `/support/livechat`,
            webSocketFactory: () => new SockJS(`/support/livechat`),    // endpoint
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: (frame) => {
                console.log(frame);
                subscribe();
            },
            onStompError: (frame) => {
                console.log(frame);
            },
        });

        client.current.activate();
    }

    const disconnect = () => {
        client.current.deactivate();
    }

    const subscribe = () => {
        client.current.subscribe(`/sub/chat`, (response) => {
            props.setChattings([...props.chattings, JSON.parse(response.body)]);
        });
    }

    const publish = () => {
        if (!client.current.connected) return;

        client.current.publish({
            destination: `/pub/chat`,
            body: JSON.stringify(chatData),
        });
    }

    useEffect(() => {
        connect();
        return () => disconnect();
    }, []);

    const handleChange = async (e) => {
        e.preventDefault();
        setChatData({...chatData,
            message: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        publish();
        setChatData({...chatData,
            message: "",
        });    
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용 입력</label>
                <textarea className="form-control" id="content" rows={3} onChange={handleChange} value={chatData.message}></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
                <Button type="submit" variant="dark" style={{ width: "100px" }}>전송</Button>
            </div>
        </form>
    );
}

const AdminChat = (props) => {
    return (
        <div className="mb-2">
            <div className="d-flex justify-content-start">
                <div className="me-1"><strong>운영자</strong></div>
                <div className="ms-1" style={{ color: "gray" }}><small>2023.03.08 15:53</small></div>
            </div>

            <div className="d-flex justify-content-start">
                <img className="rounded-circle me-1" width="50" height="50"
                    src={bg_black} alt="profile" />
                <div className="border border-secondary rounded m-1 p-2" style={{ width: "40vh"}}>
                    {props.chatting.message}
                </div>
            </div>
        </div>
    )
}

const UserChat = (props) => {
    return (
        <div className="mb-2">
            <div className="d-flex justify-content-end">
                <div className="me-1"><strong>{props.chatting.sender}</strong></div>
                <div className="ms-1" style={{ color: "gray" }}><small>2023.03.08 16:03</small></div>
            </div>

            <div className="d-flex justify-content-end">
                <div className="border border-secondary rounded m-1 p-2" style={{ width: "40vh"}}>
                    {props.chatting.message}
                </div>
                <img className="rounded-circle ms-1" width="50" height="50"
                    src={bg_black} alt="profile" />
            </div>
        </div>
    );
}

const ChatContent = (props) => {
    return (
        <>
        {props.chattings.map((chatting, index) => (
            <div key={index}>
                {/* Sender 조건문 추가 요망 */}
                <AdminChat chatting={chatting} />
                <UserChat chatting={chatting} />
            </div>
        ))}
        </>
    )
}

export default function LiveChat() {
    const [chattings, setChattings] = useState([]);
    

    return (
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
                                    <ChatContent chattings={chattings} />
                                </Card.Body>
                                <hr/>
                                <Card.Body>
                                    <ChatForm chattings={chattings} setChattings={setChattings} />
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}