import bg_black from '../../assets/images/bg_black.jpg'
import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function MyPage() {
    return (
        <>
            <Container fluid>
                <Row className="my-md-3">
                    <Col className="col-md-6">
                        <Card className="h-100">
                            <Card.Body>
                                <Row>
                                    <Col className="col-md-2">
                                        <img
                                            className="rounded-circle"
                                            src={bg_black}
                                            width="100"
                                            height="100"
                                            alt="profile"
                                        />
                                    </Col>
                                    <Col className="col-md-10">
                                        <div>이름: Profile</div>
                                        <div>생년월일: 2000.01.01</div>
                                        <div>신장/체중: 180cm / 75kg</div>
                                        <div><h3><b><u>프로필 인적사항 미확정</u></b></h3></div>
                                    </Col>
                                </Row>
                                <hr/>
                                <Card.Title>This is Card Title (Purpose & Goal or Something)</Card.Title>
                                <Card.Text>
                                    This is Card Text (Like Target BMI)<br/>
                                    This is Card Text (Like Target Weight)<br/>
                                    This is Card Text (Like Target Fat Mass)<br/>
                                    This is Card Text (Like Target Muscle Mass)<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-3">
                        <Card className="h-100">
                            <Card.Body>
                                <div className="d-flex justify-content-center">
                                    <img
                                        className="rounded-circle"
                                        src={bg_black}
                                        width="200"
                                        height="200"
                                        alt="profile"
                                    />
                                </div>
                                <hr/>
                                <Card.Title>This is Card Title (BMI Graph)</Card.Title>
                                <Card.Text>
                                    This is Card Text (Not Decided)<br/>
                                    This is Card Text (Maybe BMI지수?)<br/>
                                    This is Card Text (Maybe 골격근량?)<br/>
                                    This is Card Text (Maybe 체지방량?)<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>This is Card Title (BMI Details)</Card.Title><hr/>
                                <Card.Text>
                                    BMI Detail 1: This is Card Text (Maybe BMI지수?)<br/>
                                    BMI Detail 2: This is Card Text (Maybe 비만여부?)<br/>
                                    BMI Detail 3: This is Card Text (Maybe 골격근량?)<br/>
                                    BMI Detail 4: This is Card Text (Maybe 체지방량?)<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="my-md-3">
                    <Col className="col-md-6">
                        <Card className="h-100">
                            <Card.Body>
                                <div className="d-flex justify-content-center">
                                    <img
                                        className="rounded"
                                        src={bg_black}
                                        width="800"
                                        height="400"
                                        alt="undefined"
                                    />
                                </div>
                                <hr/>
                                <Card.Title>This is Card Title (Calendar or Something)</Card.Title>
                                <Card.Text>
                                    This is Card Text (Not Decided)<br/>
                                    This is Card Text (Not Decided)<br/>
                                    This is Card Text (Not Decided)<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>This is Card Title (Recommended Routine)</Card.Title><hr/>
                                <Card.Text>
                                    Routine 1: This is Card Text<br/>
                                    Routine 2: This is Card Text<br/>
                                    Routine 3: This is Card Text<br/>
                                    Routine 4: This is Card Text<br/>
                                    Routine 5: This is Card Text<br/>
                                    Routine 6: This is Card Text<br/>
                                    Routine 7: This is Card Text<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-md-3">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>This is Card Title (Recommended Diet)</Card.Title><hr/>
                                <Card.Text>
                                    Diet Menu 1: This is Card Text<br/>
                                    Diet Menu 2: This is Card Text<br/>
                                    Diet Menu 3: This is Card Text<br/>
                                    Diet Menu 4: This is Card Text<br/>
                                    Diet Menu 5: This is Card Text<br/>
                                    Diet Menu 6: This is Card Text<br/>
                                    Diet Menu 7: This is Card Text<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MyPage;