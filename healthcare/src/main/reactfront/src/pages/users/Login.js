import {Row, Col} from "react-bootstrap";
import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


//import styled from "styled-components";

function Login() {
    return (
        <div className="Login">
            <container fluid>
                <Row className="justify-content-center">
                    <Col className="col-md-3 m-5 py-5">
                    <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                        </Col>
                </Row>
            </container>
        </div>
    );
}

export default Login;