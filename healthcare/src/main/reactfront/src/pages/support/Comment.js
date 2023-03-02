import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const InputForm = (props) => {
    const [values, setValues] = useState({
        author: "Admin",
        content: "",
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
        await axios.post(`/api/comment?post=${props.postId}`, values)
        .then((response) => {
            setValues({...values,
                content: ""
            });
            props.setComments(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>댓글입력</label>
                <textarea className="form-control" id="content" rows={3} onChange={handleChange} value={values.content}></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
                <Button type="submit" variant="dark" style={{ width: "100px" }}>등록</Button>
            </div>
        </form>
    );
}

const CommentPost = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => { setShow(!show); }
    const handleHide = () => { setShow(false); }

    // 댓글 수정기능 미완료, 수정 시 기존 댓글 내용 읽기, 해당 댓글만 수정 폼 뜨게하기 필요

    const handleDelete = async (e) => {
        e.preventDefault();
        await axios.delete(`/api/comment?post=${props.postId}&comment=${e.target.parentElement.id}`)
        .then((response) => {
            props.setComments(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/comment?post=${props.postId}&comment=${e.target.id}`)
        .then((response) => {
            props.setComments(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
        {props.comments.map((comment, index) => (
            <Card key={index}>
                <Card.Body>
                    <div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <strong>{comment.author}&nbsp;</strong>
                                <small>{comment.createdDate}</small>
                            </div>
                            <div>
                                <Link id={comment.id} onClick={handleShow} style={{ color: "gray", textDecoration: "none" }}>
                                    <small>수정</small>
                                </Link>/
                                <Link id={comment.id} onClick={handleDelete} style={{ color: "gray", textDecoration: "none" }}>
                                    <small>삭제</small>
                                </Link>
                            </div>
                        </div>

                        {!show
                        ?
                        <div>
                            <div>{comment.content}</div>
                        </div>
                        :
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                                <textarea className="form-control" rows={3}></textarea>
                            </div>
                            <div className="form-group d-flex justify-content-end">
                                <Button type="submit" variant="dark">수정</Button>
                                <Button onClick={handleHide} variant="danger">취소</Button>
                            </div>
                        </form>                    
                        }
                    </div>
                </Card.Body>
            </Card>
        ))}
        </>
    );
}

export default function Comment(props) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const axiosGetComment = async () => {
            await axios.get(`/api/comment?post=${props.postId}`)
            .then((response) => {
                setComments(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetComment();
    }, [props, comments.length])

    return (
        <div >
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title><h4><strong>댓글({comments.length})</strong></h4></Card.Title>
                    <hr/>
                    <CommentPost postId={props.postId} comments={comments} setComments={setComments} />
                </Card.Body>
            </Card>
            <Card className="mt-3">
                <Card.Body>
                    <InputForm postId={props.postId} setComments={setComments} />
                </Card.Body>
            </Card>
        </div>
    );
}