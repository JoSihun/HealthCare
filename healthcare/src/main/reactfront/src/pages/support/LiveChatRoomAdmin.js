import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { SupportSideBar } from "../../components/SideBar";

import UserAPI from "../../api/user/UserAPI";
import LiveChatAPI from "../../api/support/LiveChatAPI";
import bg_black from "../../assets/images/bg_black.jpg";

const ChatMessageForm = (props) => {
    const { setChatMessages } = props;
    const [formValues, setFormValues] = useState({
        message: ""
    });
    
    const stompClient = useRef(null);
    const [searchParams] = useSearchParams();
    const [connected, setConnected] = useState(false);

    // SUBSCRIBE CHANNEL
    const subscribe = useCallback(() => {
        const channel = searchParams.get("uuid");
        stompClient.current.subscribe(`/sub/chat/${channel}`, (response) => {
            const message = JSON.parse(response.body);
            setChatMessages(_chatMessages => [..._chatMessages, message]);
        });
    }, [setChatMessages, searchParams]);

    // PUBLISH(SEND) MESSAGE
    const publish = useCallback((formValues) => {
        const TOKEN_TYPE = localStorage.getItem("tokenType");
        let ACCESS_TOKEN = localStorage.getItem("accessToken");
        let REFRESH_TOKEN = localStorage.getItem("refreshToken");

        const headers = {
            'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
            'X-Refresh-Token': `${REFRESH_TOKEN}`,
        }

        const channel = searchParams.get("uuid");
        stompClient.current.publish({
            headers: headers,
            destination: `/pub/chat/${channel}`,
            body: JSON.stringify(formValues),
        })
    }, [searchParams]);
    
    // CONNECT STOMP WEBSOCKET CLIENT
    const connect = useCallback(() => {
        const socket = new SockJS('/support/livechat');
        stompClient.current = new Client({
            // brokerURL: '/support/livechat',
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        })

        stompClient.current.onConnect = (frame) => {
            subscribe();
            setConnected(true);
        }

        stompClient.current.onStompError = (frame) => {
            console.log(frame);
        }

        stompClient.current.activate();
    }, [subscribe])

    // DISCONNECT STOMP WEBSOCKET CLIENT
    const disconnect = useCallback(() => {
        stompClient.current.deactivate();
    }, []);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    const handleChange = async (e) => {
        setFormValues({...formValues,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        publish(formValues);
        setFormValues({
            message: ""
        });
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="message" style={{ fontSize: "20px", fontWeight: "bold"}}>내용 입력</label>
                <textarea className="form-control" id="message" name="message" rows={3} value={formValues.message}
                    onChange={handleChange} disabled={!connected} required></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
                <Button type="submit" variant="dark" style={{ minWidth: "100px" }} disabled={!connected}>
                    {!connected ? "연결중" : "전송"}
                    {!connected && <Spinner className="ms-2" animation="border" size="sm" variant="secondary" />}
                </Button>
            </div>
        </form>
    );
}

const ChatMessageItem = (props) => {
    const { user, chatMessage } = props;

    const convertDate = (prevDate) => {
        const date = new Date(prevDate);
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        
        return `${year}.${month}.${day} ${hour}:${minute}`;
    }

    return (user.id === chatMessage.sender.id ? (
        <div className="mb-2">
            <div className="d-flex justify-content-end">
                <div className="me-1"><small>{convertDate(chatMessage.createdDate)}</small></div>
                <div className="ms-1"><strong>{chatMessage.sender.name}</strong></div>
            </div>
            <div className="d-flex justify-content-end">
                <div className="border border-secondary rounded mx-2 my-1 p-2">
                    {chatMessage.message}
                </div>
                <img className="rounded-circle" width="50" height="50"
                    src={bg_black} alt="profile" />
            </div>
        </div>
    ) : (
        <div className="mb-2">
            <div className="d-flex justify-content-start">
                <div className="me-1"><strong>운영자</strong></div>
                <div className="ms-1"><small>{convertDate(chatMessage.createdDate)}</small></div>
            </div>
            <div className="d-flex justify-content-start">
                <img className="rounded-circle" width="50" height="50"
                    src={bg_black} alt="profile" />
                <div className="border border-secondary rounded mx-2 my-1 p-2">
                    {chatMessage.message}
                </div>
            </div>
        </div>
    ));
}

const ChatMessageList = (props) => {
    const { user } = props;
    const [chatMessages, setChatMessages] = useState([]);
    
    const [searchParams] = useSearchParams();
    const chatRoomUuid = searchParams.get("uuid");

    useEffect(() => {
        LiveChatAPI.fetchChatMessages(null, chatRoomUuid)
        .then(response => setChatMessages(response))
        .catch(error => console.log(error));
    }, [chatRoomUuid]);

    const scrollRef = useRef(null);
    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });

    return (
        <Card>
            <Card.Body ref={scrollRef} style={{ minHeight: "25vh", maxHeight: "50vh", overflow: "auto" }}>
                {chatMessages.map((chatMessage, index) => (
                    <ChatMessageItem key={index} user={user} chatMessage={chatMessage} />
                ))}
            </Card.Body>
            <Card.Body className="border-top">
                <ChatMessageForm setChatMessages={setChatMessages} />
            </Card.Body>
        </Card>
    );
}

const LiveChatRoomBody = (props) => {
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState({});
    const [chatRoom, setChatRoom] = useState({});

    const [searchParams] = useSearchParams();
    const chatRoomUuid = searchParams.get("uuid");

    useEffect(() => {
        UserAPI.fetchUser()
        .then(response => setAdmin(response))
        .catch(error => console.log(error));

        if (chatRoomUuid) {
            LiveChatAPI.fetchChatRoomByUuid(chatRoomUuid)
            .then((response) => {
                setChatRoom(response);
                setUser(response.users[0]);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [chatRoomUuid]);

    const convertDate = (prevDate) => {
        const date = new Date(prevDate);
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        
        return `${year}.${month}.${day} ${hour}:${minute}`;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <h2><strong>LiveChat Support</strong></h2>
                    <h5><strong><small>관리자: {admin.name || "Undefined"}님({admin.email})</small></strong></h5>
                </Card.Title>
                <hr/>
                <Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-dark">
                            <div><h5><strong>{user.name || "Undefined"}님의 문의사항</strong></h5></div>
                            <div><h6><small>({chatRoom.uuid})</small></h6></div>
                        </div>
                        <div className="fs-6 text-secondary">
                            <div><small>문의생성일자: {convertDate(chatRoom.createdDate)}</small></div>
                            <div><small>문의수정일자: {convertDate(chatRoom.updatedDate)}</small></div>
                        </div>
                    </div>
                </Card.Title>

                <ChatMessageList user={user} />
            </Card.Body>
        </Card>
    );
}

export default function LiveChatRoomAdmin() {
    return (
        <Container fluid>
            <Row className="justify-content-center mt-3">
                <Col className="col-12 col-lg-2 mb-3">
                    <SupportSideBar />
                </Col>
                <Col className="col-12 col-lg-9 mb-3">
                    <LiveChatRoomBody />
                </Col>
            </Row>
        </Container>
    );
}
