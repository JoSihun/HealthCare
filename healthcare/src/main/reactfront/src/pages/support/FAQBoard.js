import '../../styles/FAQBoard.css'
import React, { useEffect, useState } from "react";
import {Accordion, Row, Col, Button, Card} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import SideBar from "../../components/support/SideBar";
import FAQPostForm from './FAQPostForm';
//SideBar 참고: https://citylock77.tistory.com/130
//React GET, POST 통신: https://velog.io/@easyhyun00/Spring-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Spring-React-%EC%97%B0%EA%B2%B0

const FAQList = ({ visibleEdit }) => {
    const [faqs, setFaqs] = useState([]);
    const [visibleEditForm, setVisibleEditForm] = useState(false);

    useEffect(() => {
        const axiosGetFaqs = async () => {
            await axios.get(`/support/faqboard`)
            .then((response) => {
                setFaqs(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetFaqs();
    }, []);
    
    const handleDelete = async (e) => {
        e.preventDefault();
        await axios.delete(`/api/post/${e.target.parentElement.id}`)
        .then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <Accordion>
                {faqs.map((faq, index) => (
                    <Accordion.Item key={ index } eventKey={ faq.id }>
                        <Accordion.Header>
                            <h3><strong>{ 'Q. ' + faq.title }</strong></h3>
                        </Accordion.Header>
                        <Accordion.Body>
                            <h5>{ faq.content }</h5>
                            {visibleEdit
                            ? visibleEditForm
                                ?
                                <div id={ faq.id } className='d-flex justify-content-end'>
                                    <Button variant='primary' className='me-1' style={{ width: "100px" }}
                                    onClick={() => { setVisibleEditForm(!visibleEditForm) }}>수정</Button>
                                    <Button variant='danger' className='ms-1' style={{ width: "100px" }}
                                    onClick={handleDelete}>삭제</Button>
                                </div>
                                :
                                <div>
                                    <div id={ faq.id } className='d-flex justify-content-end'>
                                        <Button variant='dark' className='me-1' style={{ width: "100px" }}
                                        onClick={() => { setVisibleEditForm(!visibleEditForm) }}>닫기</Button>
                                        <Button variant='danger' className='ms-1' style={{ width: "100px" }}
                                        onClick={handleDelete}>삭제</Button>
                                    </div>

                                    {/* 추후 각 질문에 대해 input value값 설정하는 기능 구현 필요 */}
                                    <FAQPostForm faq={faq} />

                                    {/* <Card className='my-3'>
                                        <Card.Body>
                                        <form id={ faq.id } onSubmit={handleSubmit}>
                                            <div className='form-group'>
                                                <label htmlFor='title' style={{ fontSize: "20px", fontWeight: "bold"}}>수정할 질문</label>
                                                <input type='text' className='form-control' id='title' onChange={handleChange}></input>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='content' style={{ fontSize: "20px", fontWeight: "bold"}}>질문 답변</label>
                                                <textarea className='form-control' id='content' rows='3' onChange={handleChange}></textarea>
                                            </div>
                                            <div className='d-flex justify-content-end mt-3'>
                                                    <Button variant='dark' className='ms-1' style={{ width: "100px" }}
                                                    type='submit'>수정</Button>
                                                    <Button variant='danger' className='ms-1' style={{ width: "100px" }}
                                                    onClick={() => { setVisibleEditForm(!visibleEditForm) }}>취소</Button>
                                            </div>
                                        </form>
                                        </Card.Body>
                                    </Card> */}
                                </div>
                            :
                            <div>

                            </div>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}

export default function FAQBoard() {
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);

    const [addTitle, setAddTitle] = useState("");
    const [addContent, setAddContent] = useState("");

    const handleChangeTitle = (e) => {
        e.preventDefault();
        setAddTitle(e.target.value);
    }

    const handleChangeContent = (e) => {
        e.preventDefault();
        setAddContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/post/`, {
            title: addTitle,
            content: addContent,
            author: "Admin",
            hits: 0,
            category: "FAQBoard",
            secretYn: false
        }).then((response) => {
            setAddTitle("");
            setAddContent("");
            setVisibleAdd(!visibleAdd);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col className='col-md-2 mx-2 my-4'>
                        <SideBar />
                    </Col>

                    <Col className='col-md-9 mx-2 my-4'>
                        <Card style={{ minHeight: "50vh" }}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: "35px", fontWeight: "bold" }}>FAQ</Card.Title>
                                <hr/>
                                <FAQList visibleEdit={visibleEdit}/>
                                <div className='d-flex justify-content-end mt-3'>
                                    {!visibleEdit
                                    ?
                                    <Button variant='primary' className='me-1' style={{ width: "100px"}}
                                    onClick={() => { setVisibleEdit(!visibleEdit) }}>수정</Button>
                                    :
                                    <Button variant='danger' className='me-1' style={{ width: "100px"}}
                                    onClick={() => { setVisibleEdit(!visibleEdit) }}>취소</Button>
                                    }

                                    {!visibleAdd
                                    ?
                                    <Button variant='dark' className='ms-1' style={{ width: "100px" }}
                                    onClick={() => { setVisibleAdd(!visibleAdd) }}>추가</Button>
                                    :
                                    <Button variant='dark' className='ms-1' style={{ width: "100px" }}
                                    onClick={() => { setVisibleAdd(!visibleAdd) }}>닫기</Button>
                                    }
                                </div>
                            </Card.Body>
                        </Card>

                        {visibleAdd
                        ?
                        <div className='mt-3'>
                            <Card>
                                <Card.Body>
                                    <form onSubmit={handleSubmit}>
                                        <div className='form-group'>
                                            <label htmlFor='title' style={{ fontSize: "20px", fontWeight: "bold"}}>자주 묻는 질문</label>
                                            <input type='text' className='form-control' id='title' onChange={handleChangeTitle}></input>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='content' style={{ fontSize: "20px", fontWeight: "bold"}}>질문 답변</label>
                                            <textarea className='form-control' id='content' rows='3' onChange={handleChangeContent}></textarea>
                                        </div>
                                        <div className='d-flex justify-content-end mt-3'>
                                            <Button variant='dark' className='ms-1' style={{ width: "100px" }}
                                            type='submit'>등록</Button>
                                            <Button variant='danger' className='ms-1' style={{ width: "100px" }}
                                            onClick={() => { setVisibleAdd(!visibleAdd) }}>취소</Button>
                                        </div>
                                    </form>
                                </Card.Body>
                            </Card>
                        </div>
                        :
                        null
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}