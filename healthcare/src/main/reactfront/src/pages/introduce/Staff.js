import user_pic from '../../assets/images/user_pic.jpg'
import '../../styles/Staff.css'
import React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import {Link} from "react-router-dom";
import SideBar from "../../components/introduce/SideBar";
//SideBar 참고: https://citylock77.tistory.com/130

function Staff() {
    return (
        <Container fluid>
        <Row className="justify-content-center">
            <Col className="col-md-2 mx-2 my-4">
                <SideBar />
            </Col>

            <Col className="col-md-9 mx-2 my-4">
                <Card>
                    <Card.Body>
                        <Card.Title><h2><strong>Staff</strong></h2></Card.Title>
                        <hr/>
                        <Row className="my-md-3">
                            <Col className="col-md-6">
                                <Card className='w-100'>
                                    <Card.Body>
                                        <Col className="col-md-2">
                                            <img
                                                className="rounded"
                                                src={user_pic}
                                                width="100"
                                                height="100"
                                                alt="profile"
                                            />
                                        </Col>
                                        <Col className="col-md-4">
                                            <div>역할: Role</div>
                                            <div>이름: Profile</div>
                                            <div>연락처: 010-xxxx-xxxx</div>
                                        </Col>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <div>
                                            <div>
                                                <img
                                                    className="rounded"
                                                    src={user_pic}
                                                    width="100"
                                                    height="100"
                                                    alt="profile"
                                                />
                                            </div>
                                            <div className="flex-fill ms-2">
                                                <div>역할: Role</div>
                                                <div>이름: Profile</div>
                                                <div>연락처: 010-xxxx-xxxx</div>    
                                            </div>
                                        </div>
                                    </Card.Body>              
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                        <Col className="col-md-6">
                                <Card className='w-100'>
                                    <Card.Body>
                                        <Col className="col-md-2">
                                            <img
                                                className="rounded"
                                                src={user_pic}
                                                width="100"
                                                height="100"
                                                alt="profile"
                                            />
                                        </Col>
                                        <Col className="col-md-4">
                                            <div>역할: Role</div>
                                            <div>이름: Profile</div>
                                            <div>연락처: 010-xxxx-xxxx</div>
                                        </Col>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <div>
                                            <div>
                                                <img
                                                    className="rounded"
                                                    src={user_pic}
                                                    width="100"
                                                    height="100"
                                                    alt="profile"
                                                />
                                            </div>
                                            <div className="flex-fill ms-2">
                                                <div>역할: Role</div>
                                                <div>이름: Profile</div>
                                                <div>연락처: 010-xxxx-xxxx</div>    
                                            </div>
                                        </div>
                                    </Card.Body>              
                                </Card>
                            </Col>
                        </Row>                                           
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    );
}

export default Staff;