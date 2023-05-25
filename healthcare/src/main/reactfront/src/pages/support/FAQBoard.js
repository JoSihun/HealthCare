import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import { SupportSideBar } from "../../components/SideBar";
import PostAPI from "../../api/support/PostAPI";

const AddForm = (props) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        boardType: "FAQ_BOARD",
    });
    
    const handleClick = () => {
        setShowAddForm(!showAddForm)
    }

    const handleChange = async (e) => {
        setFormValues({...formValues,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        PostAPI.createPostV1(formValues)
        .then(window.location.reload())
        .catch(error => console.log(error));
    }
    
    return (showAddForm ? (
        <Card className="border-secondary">
            <Card.Body>
                <Card.Title className="fs-2 fw-bold fst-italic">
                    FAQ 추가
                </Card.Title>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title"><h5><strong>자주 묻는 질문</strong></h5></label>
                        <input className="form-control" type="text" id="title" name="title" onChange={handleChange} value={formValues.title} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="content"><h5><strong>자주 묻는 질문 답변</strong></h5></label>
                        <textarea className="form-control" type="text" id="content" name="content" rows={3} onChange={handleChange} value={formValues.content} />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <div className="col-2 d-flex justify-content-center">
                            <Button className="me-1" onClick={handleClick} variant="danger" style={{ width: "100%" }}>취소</Button>
                            <Button className="ms-1" type="submit" variant="dark" style={{ width: "100%" }}>추가</Button>
                        </div>
                    </div>
                </form>
            </Card.Body>
        </Card>
    ) : (
        <div className="d-flex justify-content-end">
            <div className="col-1 d-flex justify-content-center">
                <Button onClick={handleClick} variant="dark" style={{ width: "100%" }}>추가</Button>
            </div>
        </div>
    ));
}

const EditForm = (props) => {
    const { post } = props;
    const [formValues, setFormValues] = useState(post);
    const [showEditForm, setShowEditForm] = useState(false);
    
    const handleClick = async (e) => {
        setFormValues(post);
        setShowEditForm(!showEditForm);
    }

    const handleChange = async (e) => {
        setFormValues({...formValues,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        PostAPI.updatePostV1(post.id, formValues)
        .then(window.location.reload())
        .catch(error => console.log(error));
    }

    const handleDelete = async (e) => {
        PostAPI.deletePostV1(post.id)
        .then(window.location.reload())
        .catch(error => console.log(error));
    }
    
    return (showEditForm ? (
        <div className="border border-2 rounded mt-3 p-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group input-group mb-3">
                    <label className="input-group-text"><h5><strong>Q.</strong></h5></label>
                    <input className="form-control" type="text" id="title" name="title" onChange={handleChange} value={formValues.title} />
                </div>
                <div className="form-group input-group mb-3">
                    <label className="input-group-text"><h5><strong>A.</strong></h5></label>
                    <textarea className="form-control" type="text" id="content" name="content" rows={3} onChange={handleChange} value={formValues.content} />
                </div>
                <div className="form-group d-flex justify-content-end">
                    <div className="col-2 d-flex justify-content-center">
                        <Button className="me-1" onClick={handleClick} variant="danger" style={{ width: "100%" }}>취소</Button>
                        <Button className="ms-1" type="submit" variant="primary" style={{ width: "100%" }}>수정</Button>
                    </div>
                </div>
            </form>
        </div>
    ) : (
        <div className="d-flex justify-content-end">
            <div className="col-2 d-flex justify-content-center">
                <Button className="me-1" onClick={handleClick} variant="primary" style={{ width: "100%" }}>수정</Button>
                <Button className="ms-1" onClick={handleDelete} variant="danger" style={{ width: "100%" }}>삭제</Button>                
            </div>
        </div>
    ));
}

const FAQBoardItem = (props) => {
    const { id } = props;
    const [post, setPost] = useState({});

    useEffect(() => {
        PostAPI.fetchPost(id)
        .then(response => setPost(response))
        .catch(error => console.log(error));
    }, [id]);

    return (
        <Accordion.Item eventKey={post.id}>
            <Accordion.Header>
                <h3><strong>Q. {post.title}</strong></h3>
            </Accordion.Header>
            <Accordion.Body>
                <h5><strong><i>A. {post.content}</i></strong></h5>
                <EditForm post={post}/>
            </Accordion.Body>
        </Accordion.Item>
    );
}

const FAQBoardList = (props) => {
    const [data, setData] = useState({});

    useEffect(() => {
        PostAPI.fetchPostPage("faq-board", { size: 10 })
        .then((response) => {
            setData(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Card className="vh-50 mb-3">
            <Card.Body>
                <Card.Title className="fs-2 fw-bold fst-italic">
                    FAQ
                </Card.Title>
                <hr/>
                <Accordion>
                    {data.content && data.content.map((item, index) => (
                        <FAQBoardItem id={item.id} key={index} />
                    ))}
                </Accordion>
            </Card.Body>
        </Card>
    );
}

export default function FAQBoard() {
    return (
        <Container fluid>
            <Row className="justify-content-center mt-3">
                <Col className="col-12 col-lg-2 mb-3">
                    <SupportSideBar />
                </Col>

                <Col className="col-12 col-lg-9 mb-3">
                    <FAQBoardList />
                    <AddForm />
                </Col>
            </Row>
        </Container>
    );
}
