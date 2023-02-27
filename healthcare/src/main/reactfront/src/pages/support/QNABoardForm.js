import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import { useNavigate, useParams } from "react-router-dom";
// 파일 업로드: https://cookinghoil.tistory.com/114

const FormButtons = ({id}) => {
    return (
        <div>
        { id 
        ?
            <div>
                <Button type="submit" className="me-1" style={{ width: "100px" }} variant="dark">수정</Button>
                <Button href="/support/qnaboard" className="ms-1" style={{ width: "100px" }} variant="danger">취소</Button>
            </div>
        :
            <div>
                <Button type="submit" className="me-1" style={{ width: "100px" }} variant="dark">등록</Button>
                <Button href="/support/qnaboard" className="ms-1" style={{ width: "100px" }} variant="danger">취소</Button>
            </div>
        }
        </div>
    );
}

export default function QNABoardForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const axiosGetPost = async () => {
            await axios.get(`/support/qnaboard/post/${id}`)
            .then((response) => {
                setPost(response.data)
                setTitle(response.data.title)       // 임시방편
                setContent(response.data.content)   // 임시방편
            }).catch((error) => {
                console.log(error)
            });
        }

        if (id !== undefined) { axiosGetPost(); }
    }, [id]);

    const handleChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
        setPost({...post,
            "title": e.target.value
        });
    }

    const handleChangeContent = (e) => {
        e.preventDefault();
        setContent(e.target.value);
        setPost({...post,
            "content": e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id !== undefined) {
            await axios.put(`/api/post/${id}`, {
                title: post.title,
                content: post.content,
                author: "Admin",
                hits: 0,
                category: "QNABoard",
                secreteYn: false
            }).then((response) => {
                navigate('/support/qnaboard/post/' + response.data)
            }).catch((error) => {
                console.log(error)
            });
        } else {
            await axios.post('/api/post', {
                title: title,
                content: content,
                author: "Admin",
                hits: 0,
                category: "QNABoard",
                secreteYn: false
            }).then((response) => {
                navigate('/support/qnaboard/post/' + response.data)
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    return (
        <div>
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Text><h2><strong>Q&A</strong></h2></Card.Text>
                            <hr/>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="title" style={{ fontSize: "20px", fontWeight: "bold"}}>제목</label>
                                    <input type="text" className="form-control" id="title" onChange={handleChangeTitle} value={title}></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="file" style={{ fontSize: "20px", fontWeight: "bold"}}>첨부파일</label>
                                    <input type="file" className="form-control" id="file" multiple="multiple"></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용</label>
                                    <textarea className="form-control" id="content" rows="20" onChange={handleChangeContent} value={content}></textarea>
                                </div>
                                <div className="form-group d-flex justify-content-end">
                                    <FormButtons id={id} />
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
}