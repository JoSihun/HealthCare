import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Container, Card, Col, Row, Table} from "react-bootstrap";
import { fetchUser } from '../../api/UserAPI';
import { fetchBMI } from '../../api/BMIApi';

import bg_black from '../../assets/images/bg_black.jpg'
import ChartComponent from '../../components/user/ChartComponent';

const UserComponent = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser()
        .then((response) => {
            setUser(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Card style={{ minHeight: "100%" }}>
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
                    <Col className="col-md-5">
                        <div>이름: {user.username}</div>
                        <div>email: {user.email}</div>
                        <div>Contact: {user.contact}</div>
                    </Col>
                    <Col className="col-md-5">
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
    );
}

const BMIComponent = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchBMI()
        .then((response) => {
            setData(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Card style={{ minHeight: "100%" }}>
            <Card.Body>
                <Card.Title><h4><strong>Inbody BMI(체성분)</strong></h4></Card.Title>
                <hr/>
    
                <ChartComponent data={data} />
                <hr/>

                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th className='text-center' style={{ width: "5%" }}>#</th>
                            <th className='text-center' style={{ width: "8%" }}>신장</th>
                            <th className='text-center' style={{ width: "8%" }}>체중</th>
                            <th className='text-center' style={{ width: "7%" }}>BMI</th>
                            <th className='text-center' style={{ width: "7%" }}>체지방률</th>
                            <th className='text-center' style={{ width: "8%" }}>골격근량</th>
                            <th className='text-center' style={{ width: "8%" }}>체지방량</th>
                            <th className='text-center' style={{ width: "7%" }}>골격근률</th>
                            <th className='text-center' style={{ width: "8%" }}>체수분량</th>
                            <th className='text-center' style={{ width: "15%" }}>측정일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                        .slice(0, 5)
                        .map((item, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{item.height}cm</td>
                                <td className='text-center'>{item.weight}kg</td>
                                <td className='text-center'>{item.bodyMassIndex}%</td>
                                <td className='text-center'>{item.fatRate}%</td>
                                <td className='text-center'>{item.musculoskeletalMass}kg</td>
                                <td className='text-center'>{item.fatMass}kg</td>
                                <td className='text-center'>{item.musculoskeletalRate}%</td>
                                <td className='text-center'>{item.bodyWaterFraction}l</td>
                                <td className='text-center'>{item.createdDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className='d-flex justify-content-end me-3'>
                    <Link to={`/`} style={{ color: "black", textDecoration: "underline" }}>더보기</Link>
                </div>
            </Card.Body>
        </Card>
    );
}

const DietRecommend = (props) => {
    return (
        <Card style={{ minHeight: "100%" }}>
            <Card.Body>
                <Card.Title><h4><strong>추천 식단</strong></h4></Card.Title>
                <hr/>

                <div>
                    Diet Menu 1: This is Card Text<br/>
                    Diet Menu 2: This is Card Text<br/>
                    Diet Menu 3: This is Card Text<br/>
                    Diet Menu 4: This is Card Text<br/>
                    Diet Menu 5: This is Card Text<br/>
                    Diet Menu 6: This is Card Text<br/>
                    Diet Menu 7: This is Card Text<br/>
                </div>

            </Card.Body>
        </Card>

    );
}

export default function MyPage() {
    return (
        <Container fluid>
            <Row className="justify-content-center my-3">
                <Col className="col-md-4">
                    <UserComponent />
                </Col>

                <Col className="col-md-8">
                    <BMIComponent />
                </Col>
            </Row>

            <Row className="justify-content-center my-3">
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
                    <DietRecommend />
                </Col>
            </Row>
        </Container>
    );
}
