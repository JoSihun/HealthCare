import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button, Card, Col, Pagination, Row, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

export default function QNABoard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            await axios.get("/support/qnaboard")
            .then((response) => {
                setPosts(response.data)
            }).catch((error) => {
                console.log(error)
            });
        }
        getPosts();
    }, []);

    return (
        <>
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />    
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>Q&A</strong></h2></Card.Title>
                            <hr/>
                            <Table responsive hover border="2px">
                                <thead>
                                    <tr style={{ color: "white", backgroundColor: "black" }}>
                                        <th className="text-left">#</th>
                                        <th className="text-left">제목</th>
                                        <th className="text-center">조회수</th>
                                        <th className="text-center">작성자</th>
                                        <th className="text-center">작성일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="text-left">{post.id}</td>
                                                    <td className="text-left">
                                                        <Link to={`/support/qnaboard/post/${post.id}`} style={{ color: "black", textDecoration: "none" }}>
                                                            {post.title}
                                                        </Link>
                                                    </td>
                                                    <td className="text-center">{post.hits}</td>
                                                    <td className="text-center">{post.author}</td>
                                                    <td className="text-center">{post.createdDate}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-end">
                                <Link to={"/support/qnaboard/form"}>
                                    <Button variant="dark" style={{ width: "100px" }}>글쓰기</Button>
                                </Link>
                            </div>                        
                            <Pagination className="justify-content-center">
                                <Pagination.First />
                                <Pagination.Prev />

                                <Pagination.Ellipsis />
                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item>{13}</Pagination.Item>
                                <Pagination.Item>{14}</Pagination.Item>
                                <Pagination.Ellipsis />

                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                            <div className="mb-3 text-center">
                                <form>
                                    <div className="d-inline mx-2">
                                        <select className="mx-2">
                                            <option value="1">제목</option>
                                            <option value="2">작성자</option>
                                            <option value="3">제목+작성자</option>
                                        </select>
                                    </div>
                                    <div className="d-inline mx-2">
                                        <input type="text" />
                                    </div>
                                    <div className="d-inline mx-2">
                                        <button type="submit">검색</button>
                                    </div>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );

}