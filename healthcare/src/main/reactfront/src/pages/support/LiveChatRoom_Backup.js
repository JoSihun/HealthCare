import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import SideBar from "../../components/support/SideBar";
import bg_black from "../../assets/images/bg_black.jpg";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import { useSearchParams } from "react-router-dom";

const ChatForm = (props) => {
    const { activeForm } = props;
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
        })
    }, [props]);

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
                <textarea className="form-control" id="content" rows={3} onChange={handleChange} value={chatData.message} required disabled={!activeForm}></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
                <Button type="submit" variant="dark" style={{ minWidth: "100px" }} disabled={!activeForm}>
                    {activeForm ? "전송" : "연결중"}
                    {!activeForm && <Spinner className="ms-2" animation="border" size="sm" variant="secondary" />}
                </Button>
            </div>
        </form>
    );
}

const AdminChat = (props) => {
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

const UserChat = (props) => {
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

const ChatContent = (props) => {
    return (
        <>
        {props.chatMessages.map((chatMessage, index) => (
            <div key={index}>
                {/* Sender 조건문 정상동작 확인필요 */}
                {chatMessage["sender"] === "Admin"
                ? <AdminChat chatMessage={chatMessage} />
                : <UserChat chatMessage={chatMessage} />
                }
            </div>
        ))}
        </>
    )
}

export default function LiveChatRoom() {
    const [chatRoom, setChatRoom] = useState({});
    const [chatMessages, setChatMessages] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [roomUuid, setRoomUuid] = useState(searchParams.get("uuid"));

    useEffect(() => {
        const axiosGetChatRoom = async () => {
            const queryString = `uuid=${roomUuid}`;
            await axios.get(`/api/livechat/room?${queryString}`)
            .then((response) => {
                setChatRoom(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        
        const axiosGetChatMessages = async () => {
            const queryString = `uuid=${roomUuid}`;
            await axios.get(`/api/livechat/message?${queryString}`)
            .then((response) => {
                setChatMessages(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        if (roomUuid) {
            axiosGetChatRoom();
            axiosGetChatMessages();
        }
    }, [roomUuid]);

    const client = useRef({});
    const userId = "TestUserName";
    const [activeForm, setActiveForm] = useState(false);
    const [subscribeChannel, setSubscribeChannel] = useState(roomUuid ? roomUuid : userId);

    const subscribe = useCallback(() => {
        client.current.subscribe(`/sub/chat/${subscribeChannel}`, (response) => {
            searchParams.set("uuid", JSON.parse(response.body).roomUuid);
            setSearchParams(searchParams);
            setRoomUuid(JSON.parse(response.body).roomUuid);
            setSubscribeChannel(JSON.parse(response.body).roomUuid);
            setChatMessages(_chatMessages => [..._chatMessages, JSON.parse(response.body)]);
        });
    }, [searchParams, setSearchParams, subscribeChannel]);

    const publish = useCallback((chatData) => {
        // '/pub/{MessageMapping}'
        client.current.publish({
            destination: `/pub/chat`,           
            body: JSON.stringify(chatData),
        });      
    }, []);
    
    const connect = useCallback(() => {
        client.current = new StompJS.Client({
            // brokerURL: `/support/livechat`,
            onConnect: (frame) => {
                subscribe();
                setActiveForm(true);
                console.log(frame);
            },
            onStompError: (frame) => {
                console.log(frame);
            },
            // WebSocket Endpoint
            webSocketFactory: () => new SockJS(`/support/livechat`),    
        });
        client.current.activate();
    }, [subscribe]);

    const disconnect = useCallback(() => {
        setActiveForm(false);
        client.current.deactivate();
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
                    <SideBar />
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
                                    <ChatContent chatMessages={chatMessages} />
                                </Card.Body>
                                <hr/>
                                <Card.Body>
                                    <ChatForm userId={userId} roomUuid={roomUuid} publish={publish} activeForm={activeForm} />
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}