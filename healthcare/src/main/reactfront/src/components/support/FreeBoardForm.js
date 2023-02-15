import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "./SidBar";
import { useNavigate } from "react-router-dom";
// 파일 업로드: https://cookinghoil.tistory.com/114

const labelFont = {
    color: "black",
    fontSize: "20px",
    fontWeight: "bold"
}

export default function FreeBoardForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/post', {
            title: title,
            content: content,
            author: "Admin",
            hits: 0,
            category: "FreeBoard",
            secreteYn: false
        }).then((response) => {
            navigate('/support/freeboard/post/' + response.data)
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />
                </Col>
                <Col className="col-md-8 mx-2 my-4">
                    <Card style={{ minHeight: "75vh" }}>
                        <Card.Body>
                            <Card.Text><h2><strong>자유게시판</strong></h2></Card.Text>
                            <hr/>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label for="title" style={ labelFont }>제목</label>
                                    <input type="text" className="form-control" id="title" onChange={handleChangeTitle}></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label for="file" style={ labelFont }>첨부파일</label>
                                    <input type="file" className="form-control" id="file" multiple="multiple"></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label for="content" style={ labelFont }>내용</label>
                                    <textarea className="form-control" id="content" rows="20" onChange={handleChangeContent}></textarea>
                                </div>
                                <div className="form-group d-flex justify-content-end">
                                    <Button type="submit" className="me-1" style={{ width: "100px" }} variant="dark">등록</Button>
                                    <Button href="/support/freeboard" className="ms-1" style={{ width: "100px" }} variant="danger">취소</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}