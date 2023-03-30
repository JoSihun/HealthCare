import React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import {Link} from "react-router-dom";
import SideBar from "../../components/introduce/SideBar";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function Direction() {
    return(
        <Container fluid>
        <Row className="justify-content-center">
            <Col className="col-md-2 mx-2 my-4">
                <SideBar />
            </Col>

            <Col className="col-md-9 mx-2 my-4">
                <Card>
                    <Card.Body>
                        <Card.Title><h2><strong>Direction</strong></h2></Card.Title>
                        <hr/>
                        <Map
                            center={{ lat: 37.4565, lng: 126.9500 }}
                            style={{ width: "100%", height: "500px" }}
                        >
                            <MapMarker position={{ lat: 37.4565, lng: 126.9500 }}>
                                <div style={{color:"#000"}}>HealthCare</div>
                            </MapMarker>
                        </Map>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    );
}

export default Direction;