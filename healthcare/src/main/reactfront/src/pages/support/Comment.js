import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CommentForm = (props) => {
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

const CommentItem = (props) => {
    const [show, setShow] = useState(false);
    const [values, setValues] = useState(props.comment);

    const handleShow = (e) => {
        setShow(!show);
        setValues({...values,
            content: props.comment.content
        });
    }

    const handleHide = (e) => {
        setShow(false);
        setValues({...values,
            content: props.comment.content
        });
    }

    const handleChange = async (e) => {
        e.preventDefault();
        setValues({...values,
            content: e.target.value
        });
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await axios.delete(`/api/comment?post=${props.postId}&comment=${props.comment.id}`)
        .then((response) => {
            props.setComments(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/comment?post=${props.postId}&comment=${props.comment.id}`, values)
        .then((response) => {
            setShow(false);
            props.setComments(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <strong>{props.comment.author}&nbsp;</strong>
                        <small>{props.comment.createdDate}</small>
                    </div>
                    <div>
                        <Link onClick={handleShow} style={{ color:"gray", textDecoration: "none" }}><small>수정</small></Link>
                        <small>/</small>
                        <Link onClick={handleDelete} style={{ color:"gray", textDecoration: "none" }}><small>삭제</small></Link>
                    </div>
                </div>

                <div className="mt-2">
                    {!show
                    ?
                    props.comment.content
                    :
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <textarea className="form-control" rows={3} value={values.content} onChange={handleChange}></textarea>
                        </div>
                        <div className="form-group d-flex justify-content-end">
                            <Button type="submit" className="me-1" variant="dark">수정</Button>
                            <Button onClick={handleHide} className="ms-1" variant="danger">취소</Button>
                        </div>
                    </form>
                    }
                </div>
            </Card.Body>
        </Card>
        </>
    );
}

const CommentList = (props) => {
    return (
        <>
        {props.comments.map((comment, index) => (
            <CommentItem key={index} postId={props.postId} comment={comment} setComments={props.setComments} />
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
    }, [props])

    return (
        <>
        <Card className="mt-3">
            <Card.Body>
                <Card.Title><h4><strong>댓글({comments.length})</strong></h4></Card.Title>
                <hr/>
                <CommentList postId={props.postId} comments={comments} setComments={setComments} />
            </Card.Body>
        </Card>
        <Card className="mt-3">
            <Card.Body>
                <CommentForm postId={props.postId} setComments={setComments} />
            </Card.Body>
        </Card>
        </>
    );
}