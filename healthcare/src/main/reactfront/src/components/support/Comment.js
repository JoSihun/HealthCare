import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import UserAPI from "../../api/user/UserAPI";
import CommentAPI from "../../api/support/CommentAPI";

const CommentForm = (props) => {
    const { id } = useParams();
    const { handleUpdateCount } = props;
    const [formValues, setFormValues] = useState({
        content: "",
        secretYn: false,
    });

    const handleChange = async (e) => {
        setFormValues({...formValues,
            [e.target.name]: e.target.value
        });
    }

    const handleCheckbox = async (e) => {
        setFormValues({...formValues,
            [e.target.name]: e.target.checked
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        CommentAPI.createCommentV1(id, formValues)
        .then(() => {
            setFormValues({
                content: "",
                secretYn: false,
            });
            handleUpdateCount();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label className="fs-5 fw-bold" htmlFor="content">댓글입력</label>
                        <textarea className="form-control" id="content" name="content" rows={3}
                            onChange={handleChange} value={formValues.content}/>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <div className="col-2 d-flex justify-content-start">
                            <input type="checkbox" className="form-check-input" id="secretYn" name="secretYn"
                                onChange={handleCheckbox} checked={formValues.secretYn} />
                            <label className="ms-1" htmlFor="secretYn">&nbsp;비밀댓글</label>
                        </div>
                        <div className="col-1 d-flex justify-content-center">
                            <Button type="submit" variant="dark" style={{ width: "100%" }}>등록</Button>
                        </div>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

const CommentItem = (props) => {
    const { user, comment } = props;
    const { handleUpdateCount } = props;
    const [activeEdit, setActiveEdit] = useState(false);
    const [formValues, setFormValues] = useState(comment);

    const convertDate = (prevDate) => {
        const now = new Date();
        const date = new Date(prevDate);
        const diff = Math.round((now - date) / (1000 * 60));
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        if (diff <= 10) {
            const second = date.getSeconds().toString().padStart(2, '0');
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    const handleActiveEdit = async (e) => {
        setActiveEdit(!activeEdit);
    }

    const handleCheckbox = async (e) => {
        setFormValues({...formValues,
            [e.target.name]: e.target.checked
        });
    }

    const handleChange = async (e) => {
        setFormValues({...formValues,
            [e.target.name]: e.target.value        
        });
    }

    const handleDelete = async (e) => {
        CommentAPI.deleteCommentV1(comment.id)
        .then(handleUpdateCount())
        .catch(error => console.log(error));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        CommentAPI.updateCommentV1(comment.id, formValues)
        .then(() => {
            handleActiveEdit();
            handleUpdateCount();
        }).catch(error => console.log(error));
    }

    return (
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div className="text-dark">
                        <strong>{comment.author}&nbsp;&nbsp;</strong>
                        <small>{convertDate(comment.createdDate)}</small>
                    </div>
                    {user.username === comment.author &&
                    <div className="text-secondary">
                        <Link onClick={handleActiveEdit} style={{ color: 'gray', textDecoration: 'none' }}><small>수정</small></Link>
                        <small>&nbsp;/&nbsp;</small>
                        <Link onClick={handleDelete} style={{ color: 'gray', textDecoration: 'none' }}><small>삭제</small></Link>
                    </div>
                    }
                </div>

                {!activeEdit ? (
                    <div className="px-1 pt-1">
                        {comment.secretYn && user.username !== comment.author ? "비밀댓글입니다." : comment.content}
                    </div>
                ) : (
                    <form className="px-1 pt-2" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <textarea className="form-control" id="content" name="content" rows={3}
                                onChange={handleChange} value={formValues.content} />
                        </div>
                        <div className="form-group d-flex justify-content-between">
                            <label className="ms-1" htmlFor="secretYn">
                                <input type="checkbox" className="form-check-input" id="secretYn" name="secretYn"
                                    onChange={handleCheckbox} checked={formValues.secretYn} />
                                &nbsp;비밀댓글
                            </label>
                            <div>
                                <Button type="submit" className="me-1" variant="dark">수정</Button>
                                <Button onClick={handleActiveEdit} className="ms-1" variant="danger">취소</Button>
                            </div>
                        </div>
                    </form>
                )}
            </Card.Body>
        </Card>
    );
}

const CommentList = (props) => {
    const { comments } = props;
    const { handleUpdateCount } = props;
    const [user, setUser] = useState({});

    useEffect(() => {
        UserAPI.fetchUser()
        .then(response => setUser(response))
        .catch(error => console.log(error));
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="fs-4 fw-bold">
                    댓글({comments.length})
                </Card.Title>
                <hr/>
                {comments.map((comment, index) => (
                    <CommentItem user={user} comment={comment} key={index} handleUpdateCount={handleUpdateCount} />
                ))}
            </Card.Body>
        </Card>
    );
}

export default function Comment() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        CommentAPI.fetchCommentsV1(id)
        .then(response => setComments(response))
        .catch(error => console.log(error));
    }, [id, updateCount]);

    const handleUpdateCount = async (e) => {
        setUpdateCount(updateCount + 1);
    }

    return (
        <div className="mt-3">
            <div className="mb-3">
                <CommentList comments={comments} handleUpdateCount={handleUpdateCount} />
            </div>
            <div>
                <CommentForm handleUpdateCount={handleUpdateCount} />
            </div>
        </div>
    );
}
