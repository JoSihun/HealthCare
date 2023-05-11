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
        <Row className="justify-content-center">
            <Card>
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
                            <Button className="me-1" onClick={handleClick} variant="danger" style={{ width: "8%" }}>취소</Button>
                            <Button className="ms-1" type="submit" variant="dark" style={{ width: "8%" }}>추가</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </Row>
    ) : (
        <Row className="justify-content-end">
            <Button onClick={handleClick} variant="dark" style={{ width: "8%" }}>추가</Button>
        </Row>
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
        <Row className="justify-content-center mt-3">
            <form onSubmit={handleSubmit}>
                <div className="border rounded mb-3 p-3">
                    <div className="form-group input-group mb-3">
                        <label className="input-group-text"><h5><strong>Q.</strong></h5></label>
                        <input className="form-control" type="text" id="title" name="title" onChange={handleChange} value={formValues.title} />
                    </div>
                    <div className="form-group input-group mb-3">
                        <label className="input-group-text"><h5><strong>A.</strong></h5></label>
                        <textarea className="form-control" type="text" id="content" name="content" rows={3} onChange={handleChange} value={formValues.content} />
                    </div>
                </div>
                <div className="form-group d-flex justify-content-end">
                    <Button className="me-1" onClick={handleClick} variant="danger" style={{ width: "8%" }}>취소</Button>
                    <Button className="ms-1" type="submit" variant="primary" style={{ width: "8%" }}>수정</Button>
                </div>
            </form>
        </Row>
    ) : (
        <Row className="justify-content-end">
            <Button className="me-1" onClick={handleClick} variant="primary" style={{ width: "8%" }}>수정</Button>
            <Button className="ms-1" onClick={handleDelete} variant="danger" style={{ width: "8%" }}>삭제</Button>
        </Row>
    ));
}

const FAQBoardItem = (props) => {
    const { id } = props;
    const [post, setPost] = useState({});

    useEffect(() => {
        PostAPI.fetchPost(id)
        .then(response => setPost(response))
        .catch(error => console.log(error));
    }, []);

    return (post &&
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
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        PostAPI.fetchPostPage("faq-board")
        .then((response) => {
            setPageData(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Row className="justify-content-center mb-4">
            <Card style={{ minHeight: "50vh" }}>
                <Card.Body>
                    <Card.Title className="fs-2 fw-bold fst-italic">
                        FAQ
                    </Card.Title>
                    <hr/>
                    <Accordion>
                        {pageData.content && pageData.content.map((item, index) => (
                            <FAQBoardItem id={item.id} key={index} />
                        ))}
                    </Accordion>
                </Card.Body>
            </Card>
        </Row>
    )
}

export default function FAQBoard() {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-1 my-4">
                    <SupportSideBar />
                </Col>
                <Col className="col-md-9 mx-1 my-4">
                    <FAQBoardList />
                    <AddForm />
                </Col>
            </Row>
        </Container>
    );
}
