import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const SingInForm = (props) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = async (e) => {
        e.preventDefault();
        setFormData({...formData,
            [e.target.id]: e.target.value
        });
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post(`/api/v1/user/signin`, formData)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            setVisible(true);
            console.log(error);
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-3" controlId="email">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" placeholder="이메일" onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>아이디 or 이메일</Form.Label>
                <Form.Control type="text" placeholder="이름" onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호" onChange={handleChange} />
                {visible &&
                    <Form.Text className="text-danger">
                        없는 계정이거나 비밀번호가 일치하지 않습니다.
                    </Form.Text>
                }
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <div className="d-flex justify-content-end">
                <Button variant="dark" type="submit">SignIn</Button>
            </div>
        </Form>
    );
}

export default function SignIn() {
    return (
        <Container fluid>
            <Row className="justify-content-center" style={{ minHeight: "100vh" }}>
                <Col className="col-md-6 d-flex justify-content-center" style={{ background: "gray" }}>
                    <h1>Some Images</h1>
                </Col>
                <Col className="col-md-6 d-flex justify-content-center" style={{ background: "skyblue" }}>
                    <Card className="align-self-center" style={{ minWidth: "50vh" }}>
                        <Card.Body>
                            <Card.Title><h2><strong>SignIn</strong></h2></Card.Title>
                            <hr/>
                            <SingInForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}