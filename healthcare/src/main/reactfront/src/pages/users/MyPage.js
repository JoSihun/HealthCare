import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Container, Card, Col, Row, Table, Image, Button} from "react-bootstrap";

import BMIAPI from '../../api/user/BMIAPI';
import DietAPI from '../../api/user/DietAPI';
import UserAPI from '../../api/user/UserAPI';

import bg_black from '../../assets/images/bg_black.jpg'
import { MyPageSideBar } from '../../components/SideBar';
import ChartComponent from '../../components/user/ChartComponent';

const DietComponent = (props) => {
    const [diets, setDiets] = useState([]);

    useEffect(() => {
        DietAPI.fetchDiets()
        .then(response => setDiets(response.content))
        .catch(error => console.log(error));
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title className='fs-2 fw-bold'>
                    내 식단
                </Card.Title>
                <hr/>
                {diets ? (
                    <div className='d-flex justify-content-center'>
                        <h4><strong>아직 추가된 내 식단이 없습니다.</strong></h4>
                    </div>
                ) : (
                    <Table bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th className='col-1 text-center'>#</th>
                                <th className='col-6 text-center'>식단명</th>
                                <th className='col-1 text-center'>칼로리총합</th>
                                <th className='col-1 text-center'>권장섭취량</th>
                                <th className='col-1 text-center'>기초대사량</th>
                                <th className='col-2 text-center'>식단생성일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diets.slice(0, 5).map((diet, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='text-start'>{diet.title}</td>
                                    <td className='text-end'>{diet.totalCalories.toFixed(2)} Kcal</td>
                                    <td className='text-end'>{diet.recommendedCaloriesIntake.toFixed(2)} Kcal</td>
                                    <td className='text-end'>{diet.basalMetabolicRate.toFixed(2)} Kcal</td>
                                    <td className='text-center'>{diet.createdDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                <div className='d-flex justify-content-end me-3'>
                    <Link to={`/my-page/diet`} style={{ color: "gray"}}>더보기</Link>
                </div>
            </Card.Body>
        </Card>
    );
}

const BMIComponent = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        BMIAPI.fetchBMIList()
        .then(response => setData(response))
        .catch(error => console.log(error));
    }, []);

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title className='fs-2 fw-bold'>
                    Inbody Graph
                </Card.Title>
                <hr/>

                <ChartComponent data={data} size={10} />
                <hr/>

                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th className='col-1 text-center'>#</th>
                            <th className='col-1 text-center'>신장</th>
                            <th className='col-1 text-center'>체중</th>
                            <th className='col-1 text-center'>BMI</th>
                            <th className='col-1 text-center'>체지방률</th>
                            <th className='col-1 text-center'>골격근량</th>
                            <th className='col-1 text-center'>체지방량</th>
                            <th className='col-1 text-center'>골격근률</th>
                            <th className='col-1 text-center'>체수분량</th>
                            <th className='col-2 text-center'>측정일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                        .slice(0, 5)
                        .map((item, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-end'>{item.height.toFixed(2)} cm</td>
                                <td className='text-end'>{item.weight.toFixed(2)} kg</td>
                                <td className='text-end'>{item.bodyMassIndex.toFixed(2)} %</td>
                                <td className='text-end'>{item.fatRate.toFixed(2)} %</td>
                                <td className='text-end'>{item.musculoskeletalMass.toFixed(2)} kg</td>
                                <td className='text-end'>{item.fatMass.toFixed(2)} kg</td>
                                <td className='text-end'>{item.musculoskeletalRate.toFixed(2)} %</td>
                                <td className='text-end'>{item.bodyWaterFraction.toFixed(2)} ℓ</td>
                                <td className='text-center'>{item.createdDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className='d-flex justify-content-end me-3'>
                    <Link to={`/my-page/bmi`} style={{ color: "gray"}}>더보기</Link>
                </div>
            </Card.Body>
        </Card>
    );
}

const BMISummary = (props) => {
    const [bmis, setBmis] = useState([]);

    useEffect(() => {
        BMIAPI.fetchBMIList()
        .then((response) => {
            setBmis(response);
            setSelectedBmi(response[0]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [selectedBmi, setSelectedBmi] = useState({});
    const handleSelect = async (e) => {
        setSelectedBmi(bmis.find(bmi => bmi.id.toString() === e.target.value));
    }

    return (
        <Card style={{ height: "100%" }}>
            <Card.Body>
                <Card.Title className='fs-4 fw-bold'>
                    BMI
                </Card.Title>
                <hr/>

                <select style={{ width: "100%" }} onChange={handleSelect} defaultValue={0}>
                    {bmis.map((bmi, index) => (
                        <option key={index} value={bmi.id}>
                            {(index + 1).toString().padStart(2, '0')}: 측정일자 {bmi.createdDate} |
                            체질량지수(BMI): {bmi.bodyMassIndex.toFixed(2)}% |
                            기초대사량: {bmi.basalMetabolicRate}Kcal
                        </option>
                    ))}
                </select>
                <Table bordered hover size='sm'>
                <tbody>
                    <tr>
                        <th>신장</th>
                        <td className='text-end'>{selectedBmi.height} cm&nbsp;&nbsp;</td>
                        <th>체중</th>
                        <td className='text-end'>{selectedBmi.weight} kg&nbsp;&nbsp;</td>
                    </tr>
                    <tr>
                        <th>체지방량</th>
                        <td className='text-end'>{selectedBmi.fatMass} kg&nbsp;&nbsp;</td>
                        <th>체지방율</th>
                        <td className='text-end'>{selectedBmi.fatRate} %&nbsp;&nbsp;</td>
                    </tr>
                    <tr>
                        <th>골격근량</th>
                        <td className='text-end'>{selectedBmi.musculoskeletalMass} kg&nbsp;&nbsp;</td>
                        <th>골격근율</th>
                        <td className='text-end'>{selectedBmi.musculoskeletalRate} %&nbsp;&nbsp;</td>
                    </tr>
                    <tr>
                        <th>체질량지수(BMI)</th>
                        <td className='text-end'>{selectedBmi.bodyMassIndex} %&nbsp;&nbsp;</td>
                        <th>체수분량</th>
                        <td className='text-end'>{selectedBmi.bodyWaterFraction} ℓ&nbsp;&nbsp;</td>
                    </tr>
                    <tr>
                        <th>기초대사량</th>
                        <td className='text-end'>{selectedBmi.basalMetabolicRate} Kcal&nbsp;&nbsp;</td>
                        <th>측정일자</th>
                        <td className='text-end'>{selectedBmi.createdDate}&nbsp;&nbsp;</td>
                    </tr>
                </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

const UserSummary = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        UserAPI.fetchUser()
        .then(response => setUser(response))
        .catch(error => console.log(error));
    }, []);

    const convertDate = (prevDate) => {
        const date = new Date(prevDate);

        const year = date.getFullYear().toString().padStart(2, '0');
        const month = date.getMonth().toString().padStart(2, '0');
        const day = date.getDay().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return (
        <Card style={{ height: "100%" }}>
            <Card.Body>
                <Card.Title className='fs-4 fw-bold'>
                    인적사항
                </Card.Title>
                <hr/>
                <Row className='justify-content-center'>
                    <Col className='col col-xl-4 mb-3 mb-xl-0'>
                        <div className='text-center mb-1'>
                            <Image src={bg_black} width="150" height="150" roundedCircle />
                        </div>
                        <div className='text-center mt-1'>
                            <Button variant='dark'>프로필 이미지 변경</Button>
                        </div>
                    </Col>
                    <Col className='col col-xl-8 mb-0 mb-xl-0'>
                        <div><strong>이름: </strong>{user.name}</div>
                        <div><strong>연락처: </strong>{user.contact}</div>
                        <div><strong>Email: </strong>{user.email}</div>
                        <br/>
                        <div><strong>아이디: </strong>{user.username}</div>
                        <div><strong>가입일: </strong>{convertDate(user.createdDate)}</div>
                        <div><strong>생년월일: </strong>{user.birthday}</div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

const UserComponent = (props) => {
    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title className='fs-2 fw-bold'>
                    고객정보
                </Card.Title>
                <hr/>
                <Row className='justify-content-center'>
                    <Col className='col col-lg-6 mb-3 mb-lg-0'>
                        <UserSummary />
                    </Col>
                    <Col className='col col-lg-6 mb-0 mb-lg-0'>
                        <BMISummary />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default function MyPage() {
    return (
        <Container fluid>
            <Row className='justify-content-center mt-3'>
                <Col className='col col-lg-2 mb-3'>
                    <MyPageSideBar />
                </Col>
                <Col className='col col-lg-10 mb-3'>
                    <UserComponent />
                    <BMIComponent />
                    <DietComponent />
                </Col>
            </Row>
        </Container>
    );
}
