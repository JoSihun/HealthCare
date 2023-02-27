import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";

export default function FreeBoardPost() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const axiosGetPost = async () => {
            await axios.get(`/support/freeboard/post/${id}`)
            .then((response) => {
                setPost(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        const axiosGetFiles = async () => {
            await axios.get(`/api/attachment/${id}`)
            .then((response) => {
                setFiles(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetPost();
        axiosGetFiles();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        // axios.delete(`/api/attachment/${id}`) 해야하는지 고민

        await axios.delete(`/api/post/${id}`)
        .then((response) => {
            window.location.href = `/support/freeboard`;
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />                
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>자유게시판</strong></h2></Card.Title>
                            <hr/>

                            <Card.Title><h3><strong>{ post.title }</strong></h3></Card.Title>
                            <Card className="mb-3" style={{ minHeight: "50vh" }}>
                                <Card.Body>
                                    <Card.Text>{ post.content }</Card.Text>
                                </Card.Body>
                            </Card>
                            {0 < files.length
                            ?
                            <Card className="mb-3">
                                <Card.Body>
                                    {files.map((file, index) => {
                                        return (
                                            // https://peachsoong.tistory.com/68
                                            <Card.Text key={index}>{ file.fileName } { file.createdDate }</Card.Text>
                                        )
                                    })}
                                </Card.Body>
                            </Card>
                            :
                            <></>
                            }


                            <div className="d-flex justify-content-end">
                                <Link to={`/support/freeboard/form/${post.id}`}>
                                    <Button variant="dark" className="ms-2" style={{ width: "100px" }}>수정</Button>
                                </Link>
                                <Button variant="danger" className="ms-2" style={{ width: "100px" }} onClick={handleDelete}>삭제</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
}