import '../../styles/Facility.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import SideBar from "../../components/introduce/SideBar";
//SideBar 참고: https://citylock77.tistory.com/130

export default function Facility() {
    const [Facility, setFacility] = useState([]);

    useEffect(() => {
        const axiosGetFacility = async () => {
            await axios.get(`/introduce/facility`)
            .then((response) => {
                setFacility(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetFacility();
    }, []);

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>Facility</strong></h2></Card.Title>
                            <hr/>
                            
                            {Facility.map((facility, index) => (
                                <div>
                                    <div>{facility.sectorName}</div>
                                    <div>{facility.sectorInfo}</div>
                                    <div>{facility.sectorImg}</div>
                                </div>
                            ))}

                            {/* <div className="d-flex justify-content-end">
                                <Link to={"/support/freeboard/form"}>
                                    <Button variant="dark" style={{ width: "100px" }}>글쓰기</Button>
                                </Link>
                            </div> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}