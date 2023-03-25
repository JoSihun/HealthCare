import bg_black from '../../assets/images/bg_black.jpg'
import bg_red from '../../assets/images/bg_red.png'
import '../../styles/Facility.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import SideBar from "../../components/introduce/SideBar";
//SideBar 참고: https://citylock77.tistory.com/130

const FacilityItem = (props) => {
    const { facility } = props;

    return (
        <div className="d-flex justify-content-start mt-4 mb-2">
            <div className="me-2">
                <img
                    className="rounded"
                    src={bg_black}
                    width="100%"
                    height="100%"
                    alt="profile"
                    maxWidth="100px"
                    // style={{ maxWidth: "100", maxHeight: "100" }} https://www.youtube.com/watch?v=QvQsuAaUwxo 참고
                />
            </div>
            <div className="flex-fill ms-2">
                <div><h2>{facility.sectorName}</h2></div>
                <hr/>
                <div>{facility.sectorInfo}</div>
                <button>
                    asdasd
                </button>
            </div>
        </div>
    );
}

export default function Facility() {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const axiosGetFacilities = async () => {
            await axios.get(`/introduce/facility`)
            .then((response) => {
                setFacilities(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetFacilities();
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
                            {facilities.map((facility, index) => (
                                <FacilityItem facility={facility} />    
                            ))}                          
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}