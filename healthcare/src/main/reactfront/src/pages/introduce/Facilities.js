import '../../styles/Facilities.css'
import { Row, Col } from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
//SideBar 참고: https://citylock77.tistory.com/130

function Facilities() {
    return (
        <div className="Facilities">
            <container fluid>
                <Row className="justify-content-center vh-100">
                    <Col className="col-md-2 m-4">
                        <Row className="p-2 sidebar">
                            <div className="sidebarTitle">Introduce</div>
                                <hr/>
                                <Link to="/introduce/facilities" style={{ textDecoration: 'none' }}><div className="sidebarItem active">- Facilities</div></Link>
                                <Link to="/introduce/staff" style={{ textDecoration: 'none' }}><div className="sidebarItem">- Staff</div></Link>
                                <Link to="#Direction" style={{ textDecoration: 'none' }}><div className="sidebarItem">- Direction</div></Link>
                        </Row>
                    </Col>
                    <Col className="col-md-8 m-4">
                        <Row className="p-4 content h-100 align-content-start">
                            <h1><b>Facilities</b></h1>
                            <hr/>
                                <Row className="my-4">
                                    <Col className="1">
                                        <h1>Image1</h1>
                                    </Col>
                                    <Col className="2">
                                        <h2>Sector1</h2>
                                        <hr/>
                                        <h5>
                                            A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        </h5>
                                    </Col>
                                </Row>
                                <Row className="my-5">
                                    <Col className="1">
                                        <h1>Image2</h1>
                                    </Col>
                                    <Col className="2">
                                        <h2>Sector2</h2>
                                        <hr/>
                                        <h5>
                                            A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        </h5>
                                    </Col>
                                </Row>
                                <Row className="my-5">
                                    <Col className="1">
                                        <h1>Image3</h1>
                                    </Col>
                                    <Col className="2">
                                        <h2>Sector3</h2>
                                        <hr/>
                                        <h5>
                                            A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        </h5>
                                    </Col>
                                </Row>
                        </Row>
                    </Col>
                </Row>
            </container>
        </div>
    );
}

export default Facilities;