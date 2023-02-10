import React from "react";
import {Col, Pagination, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";

function QNA() {
    return (
        <div className="QNA">
            <Container fluid>
                <Row className="justify-content-center vh-100">
                    <Col className="col-md-2 m-4">
                        <Row className="p-2 sidebar">
                            <div className="sidebarTitle">Support</div>
                            <hr/>
                            <Link to="/support/faq" style={{ textDecoration: 'none' }}><div className="sidebarItem">- FAQ</div></Link>
                            <Link to="/support/qna" style={{ textDecoration: 'none' }}><div className="sidebarItem active">- Q&A</div></Link>
                            <Link to="/support/livechat" style={{ textDecoration: 'none' }}><div className="sidebarItem">- LiveChat</div></Link>
                        </Row>
                    </Col>
                    <Col className="col-md-8 m-4">
                        <Row className="p-4 content h-100 align-content-start">
                            <h1><b>Q&A</b></h1>
                            <hr/>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th className="text-left">#</th>
                                        <th className="text-center">글제목</th>
                                        <th className="text-center">작성자</th>
                                        <th className="text-center">작성일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-left">1</td>
                                        <td className="text-left">Title1</td>
                                        <td className="text-center">Author1</td>
                                        <td className="text-center">2023-01-01</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">2</td>
                                        <td className="text-left">Title2</td>
                                        <td className="text-center">Author2</td>
                                        <td className="text-center">2023-01-01</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">3</td>
                                        <td className="text-left">Title3</td>
                                        <td className="text-center">Author3</td>
                                        <td className="text-center">2023-01-01</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">4</td>
                                        <td className="text-left">Title4</td>
                                        <td className="text-center">Author4</td>
                                        <td className="text-center">2023-01-01</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">5</td>
                                        <td className="text-left">Title5</td>
                                        <td className="text-center">Author5</td>
                                        <td className="text-center">2023-01-01</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Pagination className="justify-content-center">
                                <Pagination.First />
                                <Pagination.Prev />
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Ellipsis />

                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item>{13}</Pagination.Item>
                                <Pagination.Item disabled>{14}</Pagination.Item>

                                <Pagination.Ellipsis />
                                <Pagination.Item>{20}</Pagination.Item>
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </div>
    );

}

export default QNA;