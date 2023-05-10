import AuthAPI from "../../api/user/AuthAPI";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import bg_signup from "../../assets/images/bg_signup.jpg";

const SignUpForm = (props) => {
    const navigate = useNavigate();
    const [failed, setFailed] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        contact: "",
        birthday: "",
        username: "",
        password: "",
    });

    const handleChange = async (e) => {
        setFormValues((prevValues) => ({...prevValues,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        AuthAPI.signup(formValues)
        .then((response) => {
            navigate("/signin");
        }).catch((error) => {
            setFailed(true);
            console.log(error);
        });
    }

    const ERROR_MESSAGE = "회원가입 실패. 아이디와 비밀번호를 확인하세요.";

    return (
        <Card style={{ minWidth: "75%" }}>
            <Card.Body>
                <Card.Title className="fs-2 fw-bold fst-italic">
                    SignUp
                </Card.Title>
                <hr/>

                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>이름</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            placeholder="홍길동"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>연락처</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="contact"
                            value={formValues.contact}
                            onChange={handleChange}
                            placeholder="010-1234-5678"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>생년월일</InputGroup.Text>
                        <Form.Control
                            type="date"
                            name="birthday"
                            value={formValues.birthday}
                            onChange={handleChange}
                            placeholder="생년월일"
                        />
                    </InputGroup>
                    <hr/>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            placeholder="example@example.com"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                            placeholder="username"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>비밀번호</InputGroup.Text>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            placeholder="password"
                        />
                    </InputGroup>

                    <Form.Group className="mb-3 d-flex justify-content-center align-items-end">
                        <Button type="submit" variant="dark" style={{ width: "75%" }}>회원가입</Button>
                    </Form.Group>

                    {failed && <div className="text-danger text-center mb-3">{ERROR_MESSAGE}</div>}
                    <div className="text-center text-secondary">
                        <p>Do you have an account? <Link to="/signup">Sign in</Link></p>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default function SignUp() {
    const pageRef = useRef(null);

    useEffect(() => {
        pageRef.current.scrollIntoView({
            block: "center",
            inline: "center",
            behavior: "smooth",
        });
    }, []);

    return (
        <Container fluid ref={pageRef}>
            <Row className="justify-content-center" style={{ minHeight: "100vh" }}>
                <Col className="col-md-6 d-flex justify-content-center align-items-center p-0" style={{ background: "black" }}>
                    <Image src={bg_signup} width="100%" height="100%" />
                </Col>
                <Col className="col-md-6 d-flex justify-content-center align-items-center p-0" style={{ background: "lightgray" }}>
                    <SignUpForm />
                </Col>
            </Row>
        </Container>
    );
}
