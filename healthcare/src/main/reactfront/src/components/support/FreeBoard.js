import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import SideBar from "./SidBar";
import { Link } from "react-router-dom";

export default function FreeBoard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            await axios.get("/support/freeboard")
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
        <Container fluid className="vh-100">
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />                
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>자유게시판</strong></h2></Card.Title>
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
                                                        <Link to={`/support/freeboard/post/${post.id}`} style={{ color: "black", textDecoration: "none" }}>
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