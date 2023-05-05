import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Paging from "../../components/support/Paging";
import { fetchPageV1 } from "../../api/PostAPI";
import { SupportSideBar } from "../../components/SideBar";

const SelectSize = (props) => {
    const handleSelect = async (e) => {
        e.preventDefault();
        props.searchParams.set("page", parseInt(props.pages.pageable.offset / e.target.value) + 1);
        props.searchParams.set("size", e.target.value);
        props.setSearchParams(props.searchParams);
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

const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchFilter, setSearchFilter] = useState("Title");

    const handleValue = async (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    const handleFilter = async (e) => {
        e.preventDefault();
        setSearchFilter(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryString = `searchFilter=${searchFilter}&searchValue=${searchValue}`;
        window.location.href = `/support/qnaboard/search?${queryString}`;
    }

    return (
        <div className="d-flex justify-content-center mb-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group d-inline me-1">
                    <select onChange={handleFilter} value={searchFilter}>
                        <option value="Title">제목</option>
                        <option value="Content">내용</option>
                        <option value="Author">작성자</option>
                        <option value="TitleContent">제목+내용</option>
                        <option value="TitleAuthor">제목+작성자</option>
                        <option value="ContentAuthor">내용+작성자</option>
                    </select>
                </div>
                <div className="form-group d-inline mx-1">
                    <input type="text" onChange={handleValue} value={searchValue} />
                </div>
                <div className="form-group d-inline ms-1">
                    <button type="submit" >검색</button>
                </div>
            </form>
        </div>
    );
}

const QNABoardList = (props) => {
    const { posts } = props;

    return (
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
                {posts.map((post, index) => (
                    <tr key={index}>
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
                ))}
            </tbody>
        </Table>
    );
}

export default function QNABoard() {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") ? searchParams.get("page") : 1;
    const size = searchParams.get("size") ? searchParams.get("size") : 20;

    useEffect(() => {
        const queryString = `page=${page - 1}&size=${size}`;
        fetchPageV1("qna-board", queryString)
        .then((response) => {
            setPages(response);
            setPosts(response.content);
        }).catch((error) => {
            console.log(error);
        });
    }, [page, size]);

    return (
        <div>
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SupportSideBar />    
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>Q&A</strong></h2></Card.Title>
                            <hr/>
                            <SelectSize pages={pages} size={size} searchParams={searchParams} setSearchParams={setSearchParams} />

                            <QNABoardList posts={posts} />
                            <div className="d-flex justify-content-end">
                                <Link to={"/support/qnaboard/form"}>
                                    <Button variant="dark" style={{ width: "100px" }}>질문등록</Button>
                                </Link>
                            </div>

                            <Paging pages={pages} searchParams={searchParams} setSearchParams={setSearchParams} />
                            <Search searchParams={searchParams} setSearchParams={setSearchParams} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
}