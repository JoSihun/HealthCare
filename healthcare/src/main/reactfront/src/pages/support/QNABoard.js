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
        window.location.assign(`/support/qnaboard/search?${searchParams.toString()}`);
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

const QNABoardList = (props) => {
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
        // 답변작성 여부
        const ANSWER_COMPLETE_TEXT = (post.answerYn &&
            <div className='d-inline fw-bold text-secondary'>
                [답변완료]
            </div>
        );

        // 비공개인 경우
        if (post.secretYn) {
            // 로그인하지 않은 경우 or 로그인 유저가 작성자 본인이 아닌 경우
            if (!user || (user && user.name !== post.author)) {
                return (
                    <div className="fw-bold text-secondary">
                        🔒 {ANSWER_COMPLETE_TEXT} [비공개] 비공개 질문입니다.
                    </div>
                );
            }
            // 로그인 유저가 작성자 본인인 경우
            return (
                <Link to={`/support/qnaboard/post/${post.id}`} style={{ color: "black", textDecoration: "none" }}>
                    🔓 {ANSWER_COMPLETE_TEXT} {post.title}
                </Link>
            );
        }

        // 비공개가 아닌 경우
        return (
            <Link to={`/support/qnaboard/post/${post.id}`} style={{ color: "black", textDecoration: "none" }}>
                {ANSWER_COMPLETE_TEXT} {post.title}
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

                <div className="d-flex justify-content-end mb-3">
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
            <Row className="justify-content-center mt-3">
                <Col className="col-12 col-lg-2 mb-3">
                    <SupportSideBar />    
                </Col>
                <Col className="col-12 col-lg-9 mb-3">
                    <QNABoardBody />
                </Col>
            </Row>
        </Container>
    );
}
