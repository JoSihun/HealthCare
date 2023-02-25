import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
// 파일 업로드: https://cookinghoil.tistory.com/114

const FormButtons = ({ id }) => {
    if (id) {
        return (
            <>
            <Button type="submit" className="me-1" style={{ width: "100px" }} variant="dark">수정</Button>
            <Button href="/support/freeboard" className="ms-1" style={{ width: "100px" }} variant="danger">취소</Button>
            </>
        );
    } else {
        return (
            <>
            <Button type="submit" className="me-1" style={{ width: "100px" }} variant="dark">등록</Button>
            <Button href="/support/freeboard" className="ms-1" style={{ width: "100px" }} variant="danger">취소</Button>
            </>
        );
    }
}

const InputForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        hits: 0,
        title: "",
        content: "",
        author: "Admin",
        category: "FreeBoard",
        secretYn: false,
    });
    
    const handleChange = async (e) => {
        e.preventDefault();
        setValues({...values,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("data", values);
        formData.append("files", e.target.file.files);
        
        await axios.post(`/api/post`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            navigate(`/support/freeboard/post/${response.data}`);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group mb-2">
                <label htmlFor="title" style={{ fontSize: "20px", fontWeight: "bold"}}>제목</label>
                <input type="text" className="form-control" id="title" onChange={handleChange} value={values.title||''}></input>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="file" style={{ fontSize: "20px", fontWeight: "bold"}}>첨부파일</label>
                <input type="file" className="form-control" id="file" name="file" multiple="multiple"></input>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용</label>
                <textarea className="form-control" id="content" rows="20" onChange={handleChange} value={values.content}></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
                <FormButtons />
            </div>
        </form>
    )
}

export default function FreeBoardForm() {
    // const navigate = useNavigate();
    // const [post, setPost] = useState({});
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");

    // useEffect(() => {
    //     const axiosGetPost = async () => {
    //         await axios.get(`/support/freeboard/post`)
    //         .then((response) => {
    //             setPost(response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    //     }

    //     axiosGetPost();
    // }, []);

    // useEffect(() => {
    //     const axiosGetPost = async () => {
    //         await axios.get(`/support/freeboard/post/${id}`)
    //         .then((response) => {
    //             setPost(response.data)
    //             setTitle(response.data.title)        // 임시방편
    //             setContent(response.data.content)    // 임시방편
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    //     }

    //     if (id !== undefined) { axiosGetPost(); }
    // }, [id]);

    // const handleChangeTitle = (e) => {
    //     e.preventDefault();
    //     setTitle(e.target.value);
    //     setPost({...post,
    //         "title": e.target.value
    //     });
    // }

    // const handleChangeContent = (e) => {
    //     e.preventDefault();
    //     setContent(e.target.value);
    //     setPost({...post,
    //         "content": e.target.value
    //     });
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (id) {
    //         await axios.put(`/api/post/${id}`, {
    //             title: post.title,
    //             content: post.content,
    //             author: "Admin",
    //             hits: 0,
    //             category: "FreeBoard",
    //             secreteYn: false
    //         }).then((response) => {
    //             navigate('/support/freeboard/post/' + response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    //     } else {
    //         await axios.post('/api/post', {
    //             title: title,
    //             content: content,
    //             author: "Admin",
    //             hits: 0,
    //             category: "FreeBoard",
    //             secreteYn: false
    //         }).then((response) => {
    //             navigate('/support/freeboard/post/' + response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    //     }
    // }

    return (
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
                            <InputForm />
                            {/* <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="title" style={{ fontSize: "20px", fontWeight: "bold"}}>제목</label>
                                    <input type="text" className="form-control" id="title" onChange={handleChangeTitle} value={title}></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="file" style={{ fontSize: "20px", fontWeight: "bold"}}>첨부파일</label>
                                    <input type="file" className="form-control" id="file" multiple="multiple"></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용</label>
                                    <textarea className="form-control" id="content" rows="20" onChange={handleChangeContent} value={content}></textarea>
                                </div>
                                <div className="form-group d-flex justify-content-end">
                                    <FormButtons id={id} />
                                </div>
                            </form> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}