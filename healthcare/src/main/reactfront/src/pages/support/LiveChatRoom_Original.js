import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import LiveChatAPI from "../../api/support/LiveChatAPI";
import { SupportSideBar } from "../../components/SideBar";
import bg_black from "../../assets/images/bg_black.jpg";

const ChatMessageForm = (props) => {
    const { activeChatForm } = props;
    const [chatData, setChatData] = useState({
        roomUuid: props.roomUuid,
        sender: props.userId,
        message: "",
    });

    useEffect(() => {
        setChatData({
            roomUuid: props.roomUuid,
            sender: props.userId,
            message: "",
        });
    }, [props.roomUuid, props.userId]);

    const handleChange = async (e) => {
        e.preventDefault();
        setChatData({...chatData,
            message: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.publish(chatData);
        setChatData({...chatData,
            message: "",
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용 입력</label>
                <textarea className="form-control" id="content" rows={3} value={chatData.message}
                onChange={handleChange} disabled={!activeChatForm} required></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
                <Button type="submit" variant="dark" style={{ minWidth: "100px" }} disabled={!activeChatForm}>
                    {activeChatForm ? "전송" : "연결중"}
                    {!activeChatForm && <Spinner className="ms-2" animation="border" size="sm" variant="secondary" />}
                </Button>
            </div>
        </form>
    );
}

const AdminMessageItem = (props) => {
    return (
        <div className="mb-2">
            <div className="d-flex justify-content-start">
                <div className="me-1"><strong>운영자</strong></div>
                <div className="ms-1" style={{ color: "gray" }}><small>{props.chatMessage.createdDate}</small></div>
            </div>

            <div className="d-flex justify-content-start">
                <img className="rounded-circle me-1" width="50" height="50"
                    src={bg_black} alt="profile" />
                <div className="border border-secondary rounded m-1 p-2" style={{ width: "40vh"}}>
                    {props.chatMessage.message}
                </div>
            </div>
        </div>
    )
}

const UserMessageItem = (props) => {
    return (
        <div className="mb-2">
            <div className="d-flex justify-content-end">
                <div className="me-1"><strong>{props.chatMessage.sender}</strong></div>
                <div className="ms-1" style={{ color: "gray" }}><small>{props.chatMessage.createdDate}</small></div>
            </div>

            <div className="d-flex justify-content-end">
                <div className="border border-secondary rounded m-1 p-2" style={{ width: "40vh"}}>
                    {props.chatMessage.message}
                </div>
                <img className="rounded-circle ms-1" width="50" height="50"
                    src={bg_black} alt="profile" />
            </div>
        </div>
    );
}

const ChatMessageList = (props) => {
    return (
        <>
        {props.chatMessages.map((chatMessage, index) => (
            <div key={index}>
                {chatMessage["sender"] === props.userId
                ? <UserMessageItem chatMessage={chatMessage} />
                : <AdminMessageItem chatMessage={chatMessage} />}
            </div>
        ))}
        </>
    )
}

export default function LiveChatRoom() {
    const userId = "TestUserName";
    const [chatRoom, setChatRoom] = useState({});
    const [chatMessages, setChatMessages] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [roomUuid, setRoomUuid] = useState(searchParams.get("uuid"));

    useEffect(() => {
        if (roomUuid) {
            LiveChatAPI.fetchChatRoomByUuid(roomUuid)
            .then((response) => {
                setChatRoom(response);
            }).catch((error) => {
                console.log(error);
            });
    
            LiveChatAPI.fetchChatMessages(roomUuid)
            .then((response) => {
                setChatMessages(response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [roomUuid]);

    ////////////////////////////////////////////////////////////////////////////////////////////////
    const client = useRef({});
    const [activeChatForm, setActiveChatForm] = useState(false);
    const [subscribeChannel, setSubscribeChannel] = useState(roomUuid ? roomUuid : userId);

    // Receive Message
    const subscribe = useCallback(() => {
        client.current.subscribe(`/sub/chat/${subscribeChannel}`, (response) => {
            if (subscribeChannel !== JSON.parse(response.body).roomUuid) {
                setRoomUuid(JSON.parse(response.body).roomUuid);
                setSubscribeChannel(JSON.parse(response.body).roomUuid);
                searchParams.set("uuid", JSON.parse(response.body).roomUuid);
                setSearchParams(searchParams);
            }
            setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(response.body)]);
        }, {});
    }, [searchParams, setSearchParams, subscribeChannel]);

    // Send Message
    const publish = useCallback((chatData) => {
        client.current.send(`/pub/chat`, {}, JSON.stringify(chatData));
    }, []);

    // WebSocket Connect
    const connect = useCallback(() => {
        const sockJs = new SockJS(`/support/livechat`);
        client.current = Stomp.over(sockJs);
        // client.current.debug = null;

        client.current.connect({}, (frame) => {
            subscribe();
            console.log(frame);         // 디버깅 코드 추후 삭제
            setActiveChatForm(true);
        });
    }, [subscribe]);

    // WebSocket Disconnect
    const disconnect = useCallback(() => {
        setActiveChatForm(false);
        client.current.disconnect();
    }, []);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    const scrollRef = useRef(null);
    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SupportSideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>LiveChat Support</strong></h2></Card.Title>
                            <hr/>
                            <Card.Title className="d-flex justify-content-between">
                                <div>
                                    <div><h4><strong>{userId}님의 문의사항</strong></h4></div>
                                    {roomUuid && 
                                    <div style={{ color: "gray" }}><h6><small>({chatRoom.uuid})</small></h6></div>}
                                </div>
                                {roomUuid && 
                                <div style={{ color: "gray" }}>
                                    <div className="d-flex justify-content-end"><h6><small>문의생성일자: {chatRoom.createdDate}</small></h6></div>
                                    <div className="d-flex justify-content-end"><h6><small>문의수정일자: {chatRoom.updatedDate}</small></h6></div>
                                </div>}
                            </Card.Title>
                            
                            <Card>
                                <Card.Body ref={scrollRef} style={{ minHeight: "25vh", maxHeight: "50vh", overflow: "auto"}}>
                                    <ChatMessageList userId={userId} chatMessages={chatMessages} />
                                </Card.Body>
                                <hr/>
                                <Card.Body>
                                    <ChatMessageForm userId={userId} roomUuid={roomUuid} publish={publish} activeChatForm={activeChatForm} />
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}