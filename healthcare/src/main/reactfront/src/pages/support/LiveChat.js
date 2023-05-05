import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "../../components/support/SideBar";
import bg_black from "../../assets/images/bg_black.jpg";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { SupportSideBar } from "../../components/SideBar";

const ChatForm = (props) => {
    const [chatData, setChatData] = useState({
        roomId: null,
        sender: "User",
        message: "",
    });

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
                <textarea className="form-control" id="content" rows={3} onChange={handleChange} value={chatData.message} required></textarea>
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
    const client = useRef({});
    const [chatRoom, setChatRoom] = useState({});
    const [chattings, setChattings] = useState([]);
    // const {searchParams, setSearchParams} = useSearchParams();
    // const queryString = `roomId=`;
    // window.location.href = `/support/livechat?${queryString}`;

    useEffect(() => {
        const axiosGetChatRoom = async () => {
            await axios.get(`/support/livechat?roomId=${chatRoom.roomdId}`)
            .then((response) => {
                setChatRoom(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        axiosGetChatRoom();

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
                setChattings(_chattings => [..._chattings, JSON.parse(response.body)]);
            });
        }

        connect();
        return () => disconnect();
    }, []);

    const publish = (chatData) => {
        if (!client.current.connected) {
            console.log("WebSocket NOT CONNECTED!!!");
            return;
        }

        client.current.publish({
            destination: `/pub/chat`,
            body: JSON.stringify(chatData),
        });        
    }

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
                            <Card>
                                <Card.Body ref={scrollRef} style={{ minHeight: "25vh", maxHeight: "75vh", overflow: "auto"}}>
                                    <ChatContent chattings={chattings} />
                                </Card.Body>
                                <hr/>
                                <Card.Body>
                                    <ChatForm publish={publish} />
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}