import AuthAPI from "../../api/user/AuthAPI";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import bg_signin from "../../assets/images/bg_signin.jpg";

const SignInForm = (props) => {
    const navigate = useNavigate();
    const [failed, setFailed] = useState(false);
    const [formValues, setFormValues] = useState({
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
        AuthAPI.login(formValues)
        .then((response) => {
            localStorage.clear();
            localStorage.setItem('tokenType', response.tokentype);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            navigate("/home");
        }).catch((error) => {
            setFailed(true);
            console.log(error);
        });
    }

    const ERROR_MESSAGE = "로그인 실패. 아이디와 비밀번호를 확인하세요.";
    
    return (
        <Card style={{ minWidth: "50%" }}>
            <Card.Body>
                <Card.Title className="fs-2 fw-bold fst-italic">
                    Login
                </Card.Title>
                <hr/>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label className="text-secondary">아이디</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="text-secondary">비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex justify-content-between align-items-end">
                        <Form.Check type="checkbox" label="Remember Me" className="text-secondary"/>
                        <Button type="submit" variant="dark" style={{ width: "100px" }}>로그인</Button>
                    </Form.Group>

                    {failed && <div className="text-danger text-center mb-3">{ERROR_MESSAGE}</div>}
                    <div className="text-center text-secondary">
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default function SignIn() {
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
                    <Image src={bg_signin} width="100%" height="100%" />
                </Col>

                <Col className="col-md-6 d-flex justify-content-center align-items-center p-0" style={{ background: "lightgray" }}>
                    <SignInForm />
                </Col>
            </Row>
        </Container>
    );
}
