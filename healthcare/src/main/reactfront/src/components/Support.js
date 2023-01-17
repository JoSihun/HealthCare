import './Support.css'
import React from "react";
import {Accordion, Row, Col} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
//SideBar 참고: https://citylock77.tistory.com/130

function Support() {
    return (
        <div className="Support">
            <Container fluid>
                <Row className="justify-content-around">
                    <Col className="col-lg-4 m-2 p-2">
                        <h2>This is Row1 Col1.</h2>
                    </Col>
                    <Col className="col-lg-8 m-2 p-2">
                        <h2>This is Row1 Col2.</h2>
                    </Col>
                </Row>
                <Row className="justify-content-around">
                    <Col className="col-lg-3 p-2 m-2">
                        <h2>This is Row2 Col1.</h2>
                    </Col>
                    <Col className="col-lg-9 p-2 m-2">
                        <h2>This is Row2 Col2.</h2>
                    </Col>
                </Row>
                <Row className="justify-content-around">
                    <Col className="col-lg-2 p-2 m-2">
                        <h2>This is Row3 Col1.</h2>
                    </Col>
                    <Col className="col-lg-10 p-2 m-2">
                        <h2>This is Row3 Col2.</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="col-lg-2 p-2 m-2">
                        <h2>This is Row4 Col1.</h2>
                    </Col>
                    <Col className="col-lg-8 p-2 m-2">
                        <h2>This is Row4 Col2.</h2>
                    </Col>
                </Row>
            </Container>

            {/*<div className="container">*/}
            {/*    <div className="sidebar">*/}
            {/*        <h2>This is SideBar.</h2>*/}
            {/*        <hr/>*/}
            {/*        <h3><Link to="#FAQ">FAQ</Link></h3>*/}
            {/*        <h3><Link to="#Q&A">Q&A</Link></h3>*/}
            {/*        <h3><Link to="#Support">Support</Link></h3>*/}
            {/*    </div>*/}
            {/*    <div className="content">*/}
            {/*        <h1>This is Support Page.</h1>*/}
            {/*        <hr/>*/}
            {/*        <Accordion>*/}
            {/*            <Accordion.Item eventKey="0">*/}
            {/*                <Accordion.Header>Accordion Item #1</Accordion.Header>*/}
            {/*                <Accordion.Body>*/}
            {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
            {/*                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad*/}
            {/*                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
            {/*                    aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
            {/*                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla*/}
            {/*                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in*/}
            {/*                    culpa qui officia deserunt mollit anim id est laborum.*/}
            {/*                </Accordion.Body>*/}
            {/*            </Accordion.Item>*/}
            {/*            <Accordion.Item eventKey="1">*/}
            {/*                <Accordion.Header>Accordion Item #2</Accordion.Header>*/}
            {/*                <Accordion.Body>*/}
            {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
            {/*                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad*/}
            {/*                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
            {/*                    aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
            {/*                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla*/}
            {/*                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in*/}
            {/*                    culpa qui officia deserunt mollit anim id est laborum.*/}
            {/*                </Accordion.Body>*/}
            {/*            </Accordion.Item>*/}
            {/*        </Accordion>*/}
            {/*    </div>*/}

                {/*<h1>This is Support Page.</h1>*/}
                {/*<hr/>*/}

            {/*</div>*/}
        </div>
    );
}

export default Support;