import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import "../../styles/FreeBoard.css";

const GetPagination = (props) => {
    const [numbers, setNumbers] = useState([]);
    const [actives, setActives] = useState([]);

    useEffect(() => {
        const initItems = async () => {
            const listNumbers = [];
            const listActives = [];
            if (props.pages.totalPages < 5) {
                for (let i = 0; i < props.pages.totalPages; i++) {
                    listNumbers.push(i + 1)
                    listActives.push(props.page === i ? true : false);
                }
            } else {
                for (let i = 0; i < 5; i++) {
                    if (props.page <= 2) {
                        listNumbers.push(i + 1);
                        listActives.push(props.page === i ? true : false);
                    } else if (2 < props.page && props.page <= props.pages.totalPages - 3) {
                        listNumbers.push(props.page - 2 + i + 1);
                        listActives.push(i === 2 ? true : false);
                    } else if (props.pages.totalPages - 3 < props.page) {
                        listNumbers.push(props.pages.totalPages - 5 + i + 1);
                        listActives.push(5 - (props.pages.totalPages - props.page) === i ? true : false);
                    }
                }
            }
            setNumbers(listNumbers);
            setActives(listActives);
        };
        
        initItems();
    }, [props]);

    const handleEllipsis = (params, e) => {
        e.preventDefault();
        const maxPage = props.pages.totalPages - 1
        params = params < 0 ? 0 : params;
        params = params > maxPage ? maxPage : params;
        props.setPage(params);
    }

    const handleClick = (params, e) => {
        e.preventDefault();
        props.setPage(params);
    }

    // 새로고침 문제로 인해 결국 href= "~/?page=value&size=value" 로 수정해야할 듯
    const PaginationItems = () => {
        const paginationItems = [];
        for (let i = 0; i < numbers.length; i++) {
            paginationItems.push(
                <Pagination.Item key={i} onClick={(e) => {handleClick(numbers[i] - 1, e)}} active={actives[i]}>{numbers[i]}</Pagination.Item>
            );
        }
        return paginationItems;
    }

    return (
        <Pagination className="justify-content-center">
            <Pagination.First onClick={(e) => {handleClick(0, e)}} disabled={props.pages.first} />
            <Pagination.Prev onClick={(e) => {handleClick(props.page - 1, e)}} disabled={props.pages.first} />

            <Pagination.Ellipsis onClick={(e) => {handleEllipsis(props.page - 5, e)}} disabled={props.pages.first} />
            <PaginationItems />
            {/* 새로고침 문제로 인해 결국 href= "~/?page=value&size=value" 로 수정해야할 듯 */}
            {/* <Pagination.Item onClick={(e) => {handleClick(numbers[0] - 1, e)}} active={actives[0]}>{numbers[0]}</Pagination.Item>
            <Pagination.Item onClick={(e) => {handleClick(numbers[1] - 1, e)}} active={actives[1]}>{numbers[1]}</Pagination.Item>
            <Pagination.Item onClick={(e) => {handleClick(numbers[2] - 1, e)}} active={actives[2]}>{numbers[2]}</Pagination.Item>
            <Pagination.Item onClick={(e) => {handleClick(numbers[3] - 1, e)}} active={actives[3]}>{numbers[3]}</Pagination.Item>
            <Pagination.Item onClick={(e) => {handleClick(numbers[4] - 1, e)}} active={actives[4]}>{numbers[4]}</Pagination.Item> */}
            <Pagination.Ellipsis onClick={(e) => {handleEllipsis(props.page + 5, e)}} disabled={props.pages.last} />

            <Pagination.Next onClick={(e) => {handleClick(props.page + 1, e)}} disabled={props.pages.last} />
            <Pagination.Last onClick={(e) => {handleClick(props.pages.totalPages - 1, e)}} disabled={props.pages.last} />
        </Pagination>
    );
}

const SelectSize = (props) => {
    // 보기 옵션이 바뀌면 page도 바뀌어야 함, 새로운 수식 필요
    const handleSelect = async (e) => {
        e.preventDefault();
        props.setSize(e.target.value);
        props.setPage(parseInt(props.pages.pageable.offset / e.target.value));
    }

    return (
        <div className="d-flex justify-content-end mb-3">
            <div className="me-2">보기 옵션</div>
            <select onChange={handleSelect} value={props.size}>
                <option value={10}>10개씩</option>
                <option value={20}>20개씩</option>
                <option value={30}>30개씩</option>
                <option value={50}>50개씩</option>
                <option value={100}>100개씩</option>
            </select>
        </div>
    );
}

const Search = () => {
    return (
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
    );
}

export default function FreeBoard() {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState({});

    useEffect(() => {
        const axiosGetPages = async () => {
            await axios.get(`/support/freeboard/?page=${page}&size=${size}`)
            .then((response) => {
                setPages(response.data);
                setPosts(response.data.content);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetPages();
    }, [page, size]);

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
                            <SelectSize size={size} setSize={setSize} setPage={setPage} pages={pages} />

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
                            
                            <GetPagination pages={pages} page={page} size={size} setPage={setPage} />
                            <Search />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
}