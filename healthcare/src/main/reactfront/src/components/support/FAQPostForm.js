import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function FAQPostForm() {
    return (
        <>
            <Container fluid>
                <Row className="vh-100">
                    {/* SideBar */}
                    <Col className="col-md-2 m-4">
                        <Row className="p-2 sidebar">
                            <div className="sidebarTitle">Support</div>
                            <hr/>
                            <Link to="/support/faq" style={{ textDecoration: 'none' }}><div className="sidebarItem active">- FAQ</div></Link>
                            <Link to="/support/qna" style={{ textDecoration: 'none' }}><div className="sidebarItem">- Q&A</div></Link>
                            <Link to="/support/livechat" style={{ textDecoration: 'none' }}><div className="sidebarItem">- LiveChat</div></Link>
                        </Row>
                    </Col>

                    {/* Main Content */}
                    <Col className="col-md-8 m-4">
                        <Row className="p-4 content h-75 align-content-start">
                            <h1><b>Add FAQ</b></h1>
                            <hr/>
                            
                            <div className="my-2">
                                <input className="form-control" placeholder="Title" />
                            </div>
                            <div className="my-2">
                                <textarea className="form-control" placeholder="Content" />
                            </div>

                            {/* Attachment */}
                            <form id="faq_form" encType="multipart/form-data">

                            </form>
                        </Row>

                        <Row className="p-2 h-25 align-content-start">
                            
                            <div className="p-0 d-flex justify-content-end">
                                <Link to="/support/faqboard/form" style={{ textDecoration: 'none' }}><Button className="mx-2">Create</Button></Link>
                                <Link to="/support/faqboard" style={{ textDecoration: 'none' }}><Button className="mx-2">Cancel</Button></Link>
                            </div>
                        </Row>
                    </Col>


                </Row>

            </Container>
        </>
    );
}

export default FAQPostForm;