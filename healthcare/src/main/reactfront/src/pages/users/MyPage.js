import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Container, Card, Col, Row, Table, Image, Button} from "react-bootstrap";
import { fetchUser } from '../../api/UserAPI';
import { fetchBMIList } from '../../api/BMIApi';

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
        <Container fluid className='h-100 m-0 p-0'>
            <Row className='justify-content-center'>
                <Col className='col-md-12'>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title><h2><strong>사용자 정보</strong></h2></Card.Title>
                            <hr/>
                            <div className='d-flex justify-content-start'>
                                <div className='text-center mx-2'>
                                    <div className='mb-2'>
                                        <Image src={bg_black} width="150" height="150" roundedCircle />
                                    </div>
                                    <div className='mt-2'>
                                        <Button variant='dark'>프로필 이미지 변경</Button>
                                    </div>
                                </div>

                                <div className='text-end ms-4 me-1'>
                                    <div><strong>이름:</strong></div>
                                    <div><strong>email:</strong></div>
                                    <div><strong>Contact:</strong></div>
                                </div>
                                
                                <div className='text-start mx-1'>
                                    <div>{user.username}</div>
                                    <div>{user.email}</div>
                                    <div>{user.contact}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='h-50 justify-content-center'>
                <Col className='col-md-12'>
                    <Card className='h-100 mb-3'>
                        <Card.Body>
                            <Card.Title><h4><strong>유저관련정보1</strong></h4></Card.Title>
                            <hr/>
                            <div className='d-flex justify-content-start'>
                                <div className='text-end mx-1'>
                                    <div><strong>성별/나이/신장:</strong></div>
                                    <div><strong>ColumnName:</strong></div>
                                    <div><strong>ColumnName:</strong></div>
                                </div>

                                <div className='text-start mx-1'>
                                    <div>남 / 32세 / / 180cm</div>
                                    <div>Value</div>
                                    <div>Value</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

const BMIComponent = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchBMIList()
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
    
                <ChartComponent data={data} size={10} />
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
                    <Link to={`/my-page/bmi`} style={{ color: "black", textDecoration: "underline" }}>더보기</Link>
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
