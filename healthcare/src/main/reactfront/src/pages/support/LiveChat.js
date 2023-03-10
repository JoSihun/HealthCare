// import React, { useEffect, useRef, useState } from "react";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "../../components/support/SideBar";
import bg_black from "../../assets/images/bg_black.jpg";
// import * as SocketJs from "sockjs-client";
// import * as StompJs from "@stomp/stompjs";

// const ChatForm = (props) => {
//     // const socketJS = new SockJS("/support/livechat");
//     // const stomp = Stomp.over(socketJS);

//     const client = useRef({});
//     const [chatMessages, setChatMessages] = useState([]);

//     useEffect(() => {
//         connect();
//         return () => disconnect();
//     }, []);

//     const connect = () => {
//         client.current = new StompJs.Client({
//             // brokerURL: `/support/livechat`,
//             webSocketFactory: () => new SocketJs(`/support/livechat`),
//             connectHeaders: {
//                 "auth-token": "spring-chat-auth-token",
//             },
//             debug: (str) => {
//                 console.log(str);
//             },
//             reconnectDelay: 5000,
//             heartbeatIncoming: 4000,
//             heartbeatOutgoing: 4000,
//             onConnect: () => {
//                 subscribe();
//             },
//             onStompError: (frame) => {
//                 console.error(frame);
//             },
//         });
//         client.current.activate();
//     }

//     const disconnect = () => {
//         client.current.deactivate();
//     };

//     const subscribe = () => {
//         // client.current.subscribe(`/sub/chat/room`, ({ body }) => {
//         //     setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
//         // });
//         client.current.subscribe(`/sub/chat/room`, ({ body }) => {
//             setChatMessages([...chatMessages, JSON.parse(body)]);
//         });
//     };
    
//     const publish = () => {
//         if (!client.current.connected) {
//             return;
//         }
    
//         client.current.publish({
//             destination: "/pub/chat",
//             body: JSON.stringify(data),
//         });
    
//         setData({...data,
//             message: "",
//         })
//     };

//     const [data, setData] = useState({
//         sender: "User",
//         message: "",
//     })

//     const handleChange = async (e) => {
//         e.preventDefault();
//         setData({...data,
//             message: e.target.value
//         })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         publish();
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//                 <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용 입력</label>
//                 <textarea className="form-control" id="content" rows={3} onChange={handleChange} value={data.message}></textarea>
//             </div>
//             <div className="form-group d-flex justify-content-end">
//                 <Button type="submit" variant="dark" style={{ width: "100px" }}>전송</Button>
//             </div>
//         </form>
//     );
// }

const ChatForm = (props) => {
    const [data, setData] = useState({
        sender: "User",
        message: "",
    })

    const handleChange = async (e) => {
        e.preventDefault();
        setData({...data,
            message: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용 입력</label>
                <textarea className="form-control" id="content" rows={3} onChange={handleChange} value={data.message}></textarea>
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
                    이거슨 답변입니다. 이거슨 답변일까요? 이거슨 답변이었습니다. 이거슨 답변일겁니다.
                </div>
            </div>
        </div>
    )
}

const UserChat = (props) => {
    return (
        <div className="mb-2">
            <div className="d-flex justify-content-end">
                <div className="me-1"><strong>사용자</strong></div>
                <div className="ms-1" style={{ color: "gray" }}><small>2023.03.08 16:03</small></div>
            </div>

            <div className="d-flex justify-content-end">
                <div className="border border-secondary rounded m-1 p-2" style={{ width: "40vh"}}>
                    이거슨 질문입니다. 이거슨 질문일까요? 이거슨 질문이었습니다. 이거슨 질문일겁니다.
                </div>
                <img className="rounded-circle ms-1" width="50" height="50"
                    src={bg_black} alt="profile" />
            </div>
        </div>
    );
}

const ChatContent = (props) => {
    return (
        <div>
            <AdminChat />
            <UserChat />
            <AdminChat />
            <UserChat />
            <AdminChat />
            <UserChat />
            <AdminChat />
            <UserChat />
            <AdminChat />
            <UserChat />
            <AdminChat />
            <UserChat />
        </div>
    )
}

export default function LiveChat() {
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
                                    <ChatContent />
                                </Card.Body>
                                <hr/>
                                <Card.Body>
                                    <ChatForm />
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}