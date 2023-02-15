import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "./SidBar";

export default function FreeBoardPost() {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPost = async () => {
            await axios.get(`/support/freeboard/post/${id}`)
            .then((response) => {
                setPost(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            });
        }
        getPost();
    }, [id]);

    return (
        <>
        <Container fluid className="">
            <Row className="justify-content-center vh-100">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />                
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title><h2><strong>자유게시판</strong></h2></Card.Title>
                            <hr/>
                            <Card.Title><h3><strong>{ post.title }</strong></h3></Card.Title>

                                <Card className="mb-3" style={{ minHeight: "720px" }}>
                                    <Card.Body>
                                        <Card.Text>{ post.content }
                                            글이 길어지면 화면이 깨짐, 추후 수정 필요
                                            글이 길어지면 화면이 깨짐, 추후 수정 필요
                                            글이 길어지면 화면이 깨짐, 추후 수정 필요
                                            글이 길어지면 화면이 깨짐, 추후 수정 필요
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            <div className="d-flex justify-content-end">
                                <Button variant="dark" className="ms-2">수정</Button>
                                <Button variant="danger" className="ms-2">삭제</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>


        </Container>
        </>
    );
}