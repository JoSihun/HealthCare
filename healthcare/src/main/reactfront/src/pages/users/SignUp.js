import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { signUp } from "../../api/AuthAPI";
import backgroundImage from "../..//assets/images/bg_signup.jpg";

const SignUpForm = (props) => {
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
        if (formData.password !== formData.passwordCheck) {
            setVisible(true);
            return;
        }

        try {
            await signUp(formData);
            window.location.href = `/signin`;
        } catch (error) {
            console.log(error);
            console.error(error);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>이름</Form.Label>
                <Form.Control type="text" placeholder="이름" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" placeholder="이메일" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호" onChange={handleChange} />
                {visible &&
                    <Form.Text className="text-danger">
                        비밀번호가 일치하지 않습니다.
                    </Form.Text>
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="passwordCheck">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control type="passwordCheck" placeholder="비밀번호 확인" onChange={handleChange} />
                {visible &&
                    <Form.Text className="text-danger">
                        비밀번호가 일치하지 않습니다.
                    </Form.Text>
                }
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <div className="d-flex justify-content-end">
                <Button variant="dark" type="submit">SignUp</Button>
            </div>
        </Form>
    );
}

export default function SignUp() {
    return (
        <Container fluid>
            <Row className="justify-content-center" style={{ minHeight: "100vh" }}>
                <Col className="col-md-6 d-flex justify-content-center" style={{ background: "black" }}>
                    <div className="align-self-center text-center" style={{ width: "100%", height: "100%" }}>
                        <img src={backgroundImage} alt="background" width="75%" />
                    </div>
                </Col>
                <Col className="col-md-6 d-flex justify-content-center" style={{ background: "lightgray" }}>
                    <Card className="align-self-center" style={{ minWidth: "50vh" }}>
                        <Card.Body>
                            <Card.Title><h2><strong>SignUp</strong></h2></Card.Title>
                            <hr/>
                            <SignUpForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}