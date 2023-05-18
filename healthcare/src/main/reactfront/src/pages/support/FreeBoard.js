import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";

import UserAPI from "../../api/user/UserAPI";
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
        window.location.assign(`/support/freeboard/search?${searchParams.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
                <div className="form-group mb-2" style={{ width: "11%" }}>
                    <select className="form-select border-secondary" onChange={handleFilter} value={searchFilter}>
                        <option value="Title">제목</option>
                        <option value="Content">내용</option>
                        <option value="Author">작성자</option>
                        <option value="TitleContent">제목+내용</option>
                        <option value="TitleAuthor">제목+작성자</option>
                        <option value="ContentAuthor">내용+작성자</option>
                    </select>
                </div>
                <div className="form-group mb-2" style={{ width: "40%" }}>
                    <input type="text" className="form-control border-secondary" onChange={handleValue} value={searchValue} />
                </div>
                <div className="form-group mb-2" style={{ width: "11%" }}>
                    <Button type="submit" variant="outline-secondary" style={{ width: "100%" }}>검색</Button>
                </div>
            </div>
        </form>
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

const FreeBoardList = (props) => {
    const { data } = props;
    const [user, setUser] = useState(null);

    useEffect(() => {
        UserAPI.fetchUser()
        .then(response => setUser(response))
        .catch(error => console.log(error));
    }, []);

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
            return `${year}.${month}.${day} ${hour}:${minute}`;
        }
        return `${year}.${month}.${day}`;
    }

    const GetTitle = ({ user, post }) => {
        const SECRET_TEXT = (
            <div className="d-inline fw-bold text-secondary">
                [비밀글]
            </div>
        );

        // 비밀글인 경우
        if (post.secretYn) {
            // 회원이 아닌 경우
            if (!user) {
                return (
                    <div className="fw-bold text-secondary">
                        🔒 {SECRET_TEXT} 접근권한이 없습니다.
                    </div>
                );
            }
            // 회원인 경우
            return (
                <Link to={`/support/freeboard/post/${post.id}`} style={{ color: "black", textDecoration: "none" }}>
                    🔒 {SECRET_TEXT} {post.title}
                </Link>
            );
        }

        // 비밀글이 아닌 경우
        return (
            <Link to={`/support/freeboard/post/${post.id}`} style={{ color: "black", textDecoration: "none" }}>
                {post.title}
            </Link>     
        );
    }

    return (
        <Table responsive hover border="2px">
            <thead>
                <tr style={{ color: "white", backgroundColor: "black" }}>
                    <th className="col-lg-1 text-center">#</th>
                    <th className="col-lg-7 text-center">제목</th>
                    <th className="col-lg-1 text-center">조회수</th>
                    <th className="col-lg-1 text-center">작성자</th>
                    <th className="col-lg-2 text-center">작성일</th>
                </tr>
            </thead>
            <tbody>
                {data.content && data.content.map((post, index) => (
                    <tr key={index}>
                        <td className="text-center">{post.id}</td>
                        <td className="text-start"><GetTitle user={user} post={post} /></td>
                        <td className="text-center">{post.hits}</td>
                        <td className="text-center">{post.author}</td>
                        <td className="text-center">{convertDate(post.createdDate)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const FreeBoardBody = (props) => {
    const [data, setData] = useState({});
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") || 1);
    const [size, setSize] = useState(searchParams.get("size") || 20);

    useEffect(() => {
        PostAPI.fetchPostPage("free-board", { page, size })
        .then(response => setData(response))
        .catch(error => console.log(error));
    }, [page, size]);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="fs-2 fw-bold">
                    자유게시판
                </Card.Title>
                <hr/>
                <Select data={data} setSize={setSize} setPage={setPage} />
                <FreeBoardList data={data} />

                <div className="d-flex justify-content-end mb-3">
                    <Link to={`/support/freeboard/form`}>
                        <Button variant="dark" style={{ width: "100px"}}>글쓰기</Button>
                    </Link>
                </div>

                <PageNavigation data={data} setPage={setPage} />
                <Search />
            </Card.Body>
        </Card>
    )
}

export default function FreeBoard() {
    return (
        <Container fluid>
            <Row className="justify-content-center mt-3">
                <Col className="col-12 col-lg-2 mb-3">
                    <SupportSideBar />    
                </Col>
                <Col className="col-12 col-lg-9 mb-3">
                    <FreeBoardBody />
                </Col>
            </Row>
        </Container>
    );
}
