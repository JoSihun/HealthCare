import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import PostAPI from "../../api/support/PostAPI";
import AttachAPI from "../../api/support/AttachAPI";
import Comment from "../../components/support/Comment";
import { SupportSideBar } from "../../components/SideBar";

const FileList = (props) => {
    const { id } = useParams();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        AttachAPI.fetchAttachesV1(id)
        .then(response => setFiles(response))
        .catch(error => console.log(error));
    }, [id]);

    const formatFileSize = (bytes) => {
        if (bytes < 1024) {
            return `${bytes.toFixed(2).toLocaleString()} bytes`;
        }
        const kilobytes = bytes / 1024;
        if (kilobytes < 1024) {
            return `${(kilobytes).toFixed(2).toLocaleString()} KB`;
        }
        const megabytes = kilobytes / 1024;
        if (megabytes < 1024) {
            return `${(megabytes).toFixed(2).toLocaleString()} MB`;
        }
        const gigabytes = megabytes / 1024;
        return `${(gigabytes).toFixed(2).toLocaleString()} GB`;
    }

    const handleMouseEnter = async (e) => {
        e.currentTarget.style.cursor = "pointer";
        e.currentTarget.style.backgroundColor = 'lightgray';
    }
    
    const handleMouseLeave = async (e) => {
        e.currentTarget.style.cursor = "";
        e.currentTarget.style.backgroundColor = '';
    }

    const handleDownload = async (e) => {
        e.preventDefault();
        AttachAPI.downloadFile(e.currentTarget.id);
    }

    return (files.length !== 0 &&
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="fs-5 fw-bold">
                    첨부파일
                </Card.Title>
                <hr/>
                {files.map((file, index) => (
                    <div key={index} className="d-flex justify-content-start px-1" onClick={handleDownload}
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id={file.id}>
                        <div className="text-start" style={{ width: "50%" }}>{ file.fileName }</div>
                        <div className="text-end" style={{ width: "50%" }}>{ formatFileSize(file.fileSize) }</div>
                    </div>
                ))}
            </Card.Body>
        </Card>
    );
}

const PostBody = (props) => {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        PostAPI.fetchPost(id)
        .then(response => setPost(response))
        .catch(error => console.log(error));
    }, [id]);

    const convertDate = (prevDate) => {
        const date = new Date(prevDate);

        const year = date.getFullYear().toString().padStart(2, '0');
        const month = date.getMonth().toString().padStart(2, '0');
        const day = date.getDay().toString().padStart(2, '0');

        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');

        return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
    }

    const handleEdit = async (e) => {
        window.location.assign(`/support/qnaboard/form/${id}`);
    }

    const handleDelete = async (e) => {
        // 방법 2 사용, Service 간 호출로 문제해결
        // 임시방편으로 Controller에 @Transactional 옵션으로 해결가능
        // Service간 통신으로 PostService에서 AttachmentService 호출로 최종해결
        PostAPI.deletePostV2(id)
        .then(window.location.assign(`/support/qnaboard`))
        .catch(error => console.log(error));

        // 방법 1: Post, Attachment 각각 삭제, 정상작동함
        // await axios.delete(`/api/v1/attachment/${id}`)
        // .then((response) => {

        // }).catch((error) => {
        //     console.log(error);
        // });

        // await axios.delete(`/api/v1/post/${id}`)
        // .then((response) => {
        //     windlow.location.assign(`/support/qnaboard`);
        // }).catch((error) => {
        //     console.log(error);
        // });

        // 방법 2: Post, Attachment 한 번에 삭제, 오류있음
        // 영속성 컨텍스트, @Transactional 문제로 추측, 'Removing a detached instance' 오류발생
        // await axios.delete(`/api/v2/post/${id}`)
        // .then((response) => {
        //     window.location.assign(`/support/qnaboard`);
        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <div className="fs-2 fw-bold">
                        { post.title }
                    </div>
                    <div className="fs-6 text-secondary">
                        <div>작성일: {convertDate(post.createdDate)}</div>
                        <div>수정일: {convertDate(post.updatedDate)}</div>
                    </div>
                </Card.Title>
                <hr/>
                <textarea className="form-control border border-2 mb-3" rows={15} readOnly>
                    { post.content }
                </textarea>
                <FileList />
                <div className="d-flex justify-content-end">
                    <Button onClick={handleEdit} className="me-1" variant="dark" style={{ width: "8%" }}>수정</Button>
                    <Button onClick={handleDelete} className="ms-1" variant="danger" style={{ width: "8%" }}>삭제</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default function QNABoardPost() {
    const { id } = useParams();
    
    return (
        <Container fluid>
            <Row className="justify-content-center mt-3">
                <Col className="col-12 col-lg-2 mb-3">
                    <SupportSideBar />
                </Col>

                <Col className="col-12 col-lg-9 mb-3">
                    <PostBody />
                    <Comment postId={id} />
                </Col>
            </Row>
        </Container>
    );
}
