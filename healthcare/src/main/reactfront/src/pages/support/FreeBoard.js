import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import SideBar from "./SideBar";

const GetPagination = ({ pages, size }) => {
    const [paginations,] = useState({
        "numbers": [1, 2, 3, 4, 5],
        "actives": [true, false, false, false, false],
    });
    const [ellipsePrev, setEllipsePrev] = useState(1);
    const [ellipseNext, setEllipseNext] = useState(1);

    useEffect(() => {
        const initPaginations = () => {
            if (pages.number - 5 < 0) {
                setEllipsePrev(1);
            } else {
                setEllipsePrev(pages.number - 4);
            }

            if (pages.number + 5 > pages.totalPages) {
                setEllipseNext(pages.totalPages);
            } else {
                setEllipseNext(pages.number + 6);
            }


            if (5 < pages.totalPages) {
                for (var i = 0; i < 5; i++) {
                    if (pages.number < 2) {
                        paginations.numbers[i] = i + 1;
                        paginations.actives[i] = pages.number % 5 === i ? true : false;
                    } else if (2 <= pages.number && pages.number <= pages.totalPages - 3) {
                        paginations.numbers[i] = pages.number - 2 + i + 1;
                        paginations.actives[i] = i === 2 ? true : false;
                    } else if (pages.totalPages - 3 < pages.number) {
                        paginations.numbers[i] = pages.totalPages - 5 + i + 1;
                        paginations.actives[i] = pages.number % 5 === (i + 1) % 5 ? true : false;
                    }
                }
            }
        }

        initPaginations();
    });

    return (
        <Pagination className="justify-content-center">
            <Pagination.First href={`/support/freeboard/${1}/${size}`} disabled={pages.first}/>
            <Pagination.Prev href={`/support/freeboard/${pages.number}/${size}`} disabled={pages.first}/>

            {/* 5개 미만일 떄 몇개 표시? */}
            <Pagination.Ellipsis href={`/support/freeboard/${ellipsePrev}/${size}`} disabled={pages.first}/> 
            <Pagination.Item href={`/support/freeboard/${paginations.numbers[0]}/${size}`} active={paginations.actives[0]}>{paginations.numbers[0]}</Pagination.Item>
            <Pagination.Item href={`/support/freeboard/${paginations.numbers[1]}/${size}`} active={paginations.actives[1]}>{paginations.numbers[1]}</Pagination.Item>
            <Pagination.Item href={`/support/freeboard/${paginations.numbers[2]}/${size}`} active={paginations.actives[2]}>{paginations.numbers[2]}</Pagination.Item>
            <Pagination.Item href={`/support/freeboard/${paginations.numbers[3]}/${size}`} active={paginations.actives[3]}>{paginations.numbers[3]}</Pagination.Item>
            <Pagination.Item href={`/support/freeboard/${paginations.numbers[4]}/${size}`} active={paginations.actives[4]}>{paginations.numbers[4]}</Pagination.Item>
            <Pagination.Ellipsis href={`/support/freeboard/${ellipseNext}/${size}`} disabled={pages.last}/>
            {/* 5개 미만일 떄 몇개 표시? */}

            <Pagination.Next href={`/support/freeboard/${pages.number+2}/${size}`} disabled={pages.last}/>
            <Pagination.Last href={`/support/freeboard/${pages.totalPages}/${size}`} disabled={pages.last}/>
        </Pagination>
    );
}

export default function FreeBoard() {
    const { id, size } = useParams();
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState({});

    useEffect(() => {
        const axiosGetPages = async () => {
            await axios.get(`/support/freeboard/?page=${id-1}&size=${size}`)
            .then((response) => {
                setPages(response.data);
                setPosts(response.data.content);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetPages();
    }, [id, size]);

    const [newPage, setNewPage] = useState(pages.number);
    const [newSize, setNewSize] = useState(pages.size);

    const handleSelect = (e) => {
        e.preventDefault();
        setNewSize(e.target.value);
        setNewPage(pages.number * pages.size / newSize);
    }

    // 개수변경은 되는데, 페이지 이동이 안됨
    useEffect(() => {
        const axiosGetPages = async () => {
            await axios.get(`/support/freeboard/?page=${newPage}&size=${newSize}`)
            .then((response) => {
                setPages(response.data);
                setPosts(response.data.content);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetPages();
    }, [newPage, newSize]);

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
                            <Card.Title><h2><strong>자유게시판</strong></h2></Card.Title>
                            <hr/>
                            <div className="d-flex justify-content-end mb-3">
                                <div className="me-2">보기 옵션</div>
                                <select onChange={handleSelect} defaultValue={newSize}>
                                    <option value={10}>10개씩</option>
                                    <option value={20}>20개씩</option>
                                    <option value={30}>30개씩</option>
                                    <option value={50}>50개씩</option>
                                    <option value={100}>100개씩</option>
                                </select>
                            </div>
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
                                    {posts.map((post, index) => {
                                        return (
                                            <tr key={index}>
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
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-end">
                                <Link to={"/support/freeboard/form"}>
                                    <Button variant="dark" style={{ width: "100px" }}>글쓰기</Button>
                                </Link>
                            </div>
                            
                            <GetPagination pages={pages} size={newSize} />

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