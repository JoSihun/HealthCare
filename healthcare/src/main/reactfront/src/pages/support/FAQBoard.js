import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "../../components/support/SideBar";
import { createPostV1, deletePostV1, fetchPageV1, updatePostV1 } from "../../api/PostAPI";

const FAQAddForm = (props) => {
    const [values, setValues] = useState({
        title: "",
        content: "",
        category: "FAQ_BOARD",
        secretYn: false,
    });

    const handleChange = async (e) => {
        e.preventDefault();
        setValues({...values,
            [e.target.id]: e.target.value
        });
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        props.setShowAddForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createPostV1(values)
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Card border="dark">
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title"><h5><strong>자주 묻는 질문</strong></h5></label>
                        <input type="text" className="form-control" id="title" onChange={handleChange} value={ values.title } />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="content"><h5><strong>질문 답변</strong></h5></label>
                        <textarea className="form-control" id="content" rows={3} onChange={handleChange} value={ values.content } />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <Button className="me-1" variant="dark" style={{ width: "100px" }}
                        type="submit" >추가</Button>
                        <Button className="ms-1" variant="danger" style={{ width: "100px" }}
                        onClick={handleCancel} >취소</Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

const FAQEditForm = (props) => {
    const [values, setValues] = useState(props.faq);

    const handleChange = async (e) => {
        e.preventDefault();
        setValues({...values,
            [e.target.id]: e.target.value
        });
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        props.setShowEditForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        updatePostV1(props.faq.id, values)
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title"><h5><strong>자주 묻는 질문</strong></h5></label>
                        <input type="text" className="form-control" id="title" onChange={handleChange} value={ values.title } />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="content"><h5><strong>질문 답변</strong></h5></label>
                        <textarea className="form-control" id="content" rows={3} onChange={handleChange} value={ values.content } />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <Button className="me-1" variant="primary" style={{ width: "100px" }}
                        type="submit" >수정</Button>
                        <Button className="me-1" variant="danger" style={{ width: "100px" }}
                        onClick={handleCancel} >취소</Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

const FAQBoardList = (props) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async (params, e) => {
        e.preventDefault();
        deletePostV1(params)
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Accordion>
            {props.posts.map((faq, index) => (
                <Accordion.Item key={ index } eventKey={ faq.id }>
                    <Accordion.Header>
                        <h3><strong>Q. { faq.title }</strong></h3>
                    </Accordion.Header>
                    <Accordion.Body>
                        <h5>A. { faq.content }</h5>
                        {showEditForm
                        ?
                            <FAQEditForm faq={faq} setShowEditForm={setShowEditForm} />
                        :
                            <div className="d-flex justify-content-end">
                                <Button className="me-1" variant="primary" style={{ width: "100px" }}
                                onClick={(e) => { setShowEditForm(!showEditForm) }}>수정</Button>
                                <Button className="me-1" variant="danger" style={{ width: "100px" }}
                                onClick={(e) => { handleDelete(faq.id, e) }}>삭제</Button>
                            </div>
                        }
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}

export default function FAQBoard() {
    const [posts, setPosts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchPageV1("faq-board")
        .then((response) => {
            setPosts(response.content);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card style={{ minHeight: "50vh" }}>
                        <Card.Body>
                            <Card.Title><h2><strong>FAQ</strong></h2></Card.Title>
                            <hr/>
                            <FAQBoardList posts={posts} />
                        </Card.Body>
                    </Card>

                    {!showAddForm
                    ?
                        <div className="d-flex justify-content-end mt-3">
                            <Button className="me-1" variant="dark" style={{ width: "100px" }}
                            onClick={() => { setShowAddForm(!showAddForm) }}>추가</Button>
                        </div>
                    :
                        <div className="mt-4">
                            <FAQAddForm setShowAddForm={setShowAddForm} />
                        </div>
                    }                    
                </Col>
            </Row>
        </Container>
    );
}