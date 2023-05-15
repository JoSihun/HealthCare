import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";

import PostAPI from "../../api/support/PostAPI";
import PageNavigation from "../../components/PageNavigation";
import { SupportSideBar } from "../../components/SideBar";

const Search = (props) => {
    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState("");
    const [searchFilter, setSearchFilter] = useState("Title");

    const handleValue = async (e) => {
        setSearchValue(e.target.value);
    }

    const handleFilter = async (e) => {
        setSearchFilter(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchParams.set("searchValue", searchValue);
        searchParams.set("searchFilter", searchFilter);
        window.location.assign(`/support/qnaboard/search?${searchParams.toString()}`);
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

const Select = (props) => {
    const { data, setPage, setSize } = props;
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSelect = async (e) => {
        searchParams.set("page", Math.floor(data.pageable.offset / e.target.value) + 1);
        searchParams.set("size", e.target.value);
        setSearchParams(searchParams);
        setPage(searchParams.get("page"));
        setSize(searchParams.get("size"));
    }

    return (
        <div className="d-flex justify-content-end mb-3">
            <div className="me-2">보기 옵션</div>
            <select onChange={handleSelect} defaultValue={20}>
                <option value={10}>10개씩</option>
                <option value={20}>20개씩</option>
                <option value={30}>30개씩</option>
                <option value={50}>50개씩</option>
                <option value={100}>100개씩</option>
            </select>
        </div>
    );
}

const QNABoardList = (props) => {
    const { data } = props;

    const convertDate = (prevDate) => {
        const now = new Date();
        const date = new Date(prevDate);
        const diff = Math.round((now - date) / (1000 * 60));
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        if (diff <= 10) {
            const hour = date.getHours().toString().padStart(2, '0');
            const minute = date.getMinutes().toString().padStart(2, '0');
            return `${year}-${month}-${day} ${hour}:${minute}`;
        }
        return `${year}-${month}-${day}`;
      }

    return (
        <Table responsive hover border="2px">
            <thead>
                <tr style={{ color: "white", backgroundColor: "black" }}>
                    <th className="text-center" style={{ width: "5%"}} >#</th>
                    <th className="text-center" style={{ width: "55%"}} >제목</th>
                    <th className="text-center" style={{ width: "10%"}} >조회수</th>
                    <th className="text-center" style={{ width: "10%"}} >작성자</th>
                    <th className="text-center" style={{ width: "20%"}} >작성일</th>
                </tr>
            </thead>
            <tbody>
                {data.content && data.content.map((post, index) => (
                    <tr key={index}>
                        <td className="text-center">{post.id}</td>
                        <td className="text-start">
                            <Link to={`/support/qnaboard/post/${post.id}`} style={{ color: "black", textDecoration: "none" }}>
                                {post.title}
                            </Link>
                        </td>
                        <td className="text-center">{post.hits}</td>
                        <td className="text-center">{post.author}</td>
                        <td className="text-center">{convertDate(post.createdDate)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const QNABoardBody = (props) => {
    const [data, setData] = useState({});
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") || 1);
    const [size, setSize] = useState(searchParams.get("size") || 20);

    useEffect(() => {
        PostAPI.fetchPostPage("qna-board", { page, size })
        .then(response => setData(response))
        .catch(error => console.log(error));
    }, [page, size]);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="fs-2 fw-bold">
                    Q&A
                </Card.Title>
                <hr/>
                <Select data={data} setSize={setSize} setPage={setPage} />
                <QNABoardList data={data} />

                <div className="d-flex justify-content-end">
                    <Link to={`/support/qnaboard/form`}>
                        <Button variant="dark" style={{ width: "100px"}}>글쓰기</Button>
                    </Link>
                </div>

                <PageNavigation data={data} setPage={setPage} />
                <Search />
            </Card.Body>
        </Card>
    )
}

export default function QNABoard() {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-1 my-4">
                    <SupportSideBar />    
                </Col>

                <Col className="col-md-9 mx-1 my-4">
                    <QNABoardBody />
                </Col>
            </Row>
        </Container>
    );
}
