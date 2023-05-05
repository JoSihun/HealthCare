import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Container, Card, Col, Row, Table, Image, Button} from "react-bootstrap";
import { fetchUser } from '../../api/UserAPI';
import { fetchBMIList } from '../../api/BMIAPI';

import bg_black from '../../assets/images/bg_black.jpg'
import ChartComponent from '../../components/user/ChartComponent';
import { MyPageSideBar } from '../../components/SideBar';
import { fetchDiets } from '../../api/DietAPI';


const DietComponent = (props) => {
    const [diets, setDiets] = useState([]);

    useEffect(() => {
        fetchDiets()
        .then((response) => {
            setDiets(response.content);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title className='fs-4 fw-bold'>
                    내 식단
                </Card.Title>
                <hr/>
                
                <Table bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th className='text-center' style={{ width: "2%"}}>#</th>
                            <th className='text-start' style={{ width: "25%"}}>식단명</th>
                            <th className='text-center' style={{ width: "5%"}}>식단칼로리</th>
                            <th className='text-center' style={{ width: "5%"}}>권장섭취량</th>
                            <th className='text-center' style={{ width: "5%"}}>기초대사량</th>
                            <th className='text-center' style={{ width: "7%"}}>식단생성일자</th>
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

                <div className='d-flex justify-content-end me-3'>
                    <Link to={`/my-page/diet`} style={{ color: "black", textDecoration: "underline" }}>더보기</Link>
                </div>

            </Card.Body>
        </Card>

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
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title className='fs-4 fw-bold'>
                    Inbody Graph
                </Card.Title>
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


const UserInfoComponent = (props) => {
    const [user, setUser] = useState({});
    const [bmis, setBmis] = useState([]);

    useEffect(() => {
        fetchUser()
        .then((response) => {
            setUser(response);
        }).catch((error) => {
            console.log(error);
        });

        fetchBMIList()
        .then((response) => {
            setBmis(response);
            setSelectedBmi(response[0]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [selectedBmi, setSelectedBmi] = useState({});
    const handleSelect = async (e) => {
        setSelectedBmi(bmis.find((bmi) => bmi.id.toString() === e.target.value));
    }

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title className='fs-2 fw-bold'>
                    사용자정보
                </Card.Title>
                <hr/>

                <div className='d-flex justify-content-around'>
                    <Card style={{ width: "49%" }}>
                        <Card.Body>
                            <Card.Title className='fs-4 fw-bold'>
                                기본정보
                            </Card.Title>
                            <hr/>

                            <div className='d-flex justify-content-start'>
                                <div className='text-center ms-2 me-4'>
                                   <Image className='mb-2' src={bg_black} width="150" height="150" roundedCircle />
                                   <Button className='d-block' onClick={() => {}} variant='dark'>프로필 이미지 변경</Button>                          
                                </div>
                                <div className='ms-4 me-2'>
                                    <div><strong>이름: </strong>{user.username}</div>
                                    <div><strong>Email: </strong>{user.email}</div>
                                    <div><strong>연락처: </strong>{user.contact}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: "49%" }}>
                        <Card.Body>
                            <Card.Title className='fs-4 fw-bold'>
                                Inbody
                            </Card.Title>
                            <hr/>

                            <select style={{ width: "100%" }} onChange={handleSelect} defaultValue={0}>
                                {bmis.map((bmi, index) => (
                                    <option value={bmi.id} key={index}>
                                        {index + 1}: 측정일자 {bmi.createdDate} |
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
                                        <td className='text-end'>{selectedBmi.bodyWaterFraction} L&nbsp;&nbsp;</td>
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
                </div>
            </Card.Body>
        </Card>
    );
}


export default function MyPage() {

    return (
        <Container fluid>
            <Row className='justify-content-center my-3'>
                <Col className='col-xl-2'>
                    <MyPageSideBar />
                </Col>
                <Col className='col-xl-10'>
                    <UserInfoComponent />
                    <BMIComponent />
                    <DietComponent />
                </Col>
            </Row>
        </Container>
    );
}
