import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
//React GET, POST 통신: https://infodon.tistory.com/m/116
//React GET, POST 통신: https://velog.io/@easyhyun00/Spring-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Spring-React-%EC%97%B0%EA%B2%B0

function FAQPostForm() {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const handleChangeTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleChangeContent = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/post', {
            title: title,
            content: content,
            author: "Admin",
            hits: 0,
            category: "FAQBoard",
            secreteYn: false
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <>
            <Container fluid>
                <Row className="vh-100">
                    {/* SideBar */}
                    <Col className="col-md-2 m-4">
                        <SideBar />
                    </Col>

                    {/* Main Content */}
                    <Col className="col-md-8 m-4">
                        <form onSubmit={handleSubmit}>
                            <Row className="p-4 content h-75 align-content-start">
                                <h1><b>Add FAQ</b></h1>
                                <hr/>
                                
                                <div className="my-2">
                                    <input className="form-control" onChange={handleChangeTitle} placeholder="Title" />
                                </div>
                                <div className="my-2">
                                    <textarea className="form-control" onChange={handleChangeContent} placeholder="Content" />
                                </div>

                                {/* Attachment */}
                                {/* <form id="faq_form" encType="multipart/form-data">

                                </form> */}
                            </Row>

                            <Row className="p-2 h-25 align-content-start">
                                
                                <div className="p-0 d-flex justify-content-end">
                                    <Button className="mx-2" type="submit">Save</Button>
                                    <Link to="/support/faqboard" style={{ textDecoration: 'none' }}><Button className="mx-2">Cancel</Button></Link>
                                </div>
                            </Row>
                        </form>
                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default FAQPostForm;