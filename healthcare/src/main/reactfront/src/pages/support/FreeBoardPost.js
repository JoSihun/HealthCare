import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import SideBar from "../../components/support/SideBar";
import Comment from "../../components/support/Comment";
import { deletePostV1, fetchPostV1 } from "../../api/PostAPI";
import { deleteFilesV1, downloadFile, fetchFilesV1 } from "../../api/AttachAPI";
import { SupportSideBar } from "../../components/SideBar";

const FileList = (props) => {
    const handleDownload = async (e) => {
        e.preventDefault();
        downloadFile(e.target.id);
    }

    const [modalShow, setModalShow] = useState(false);
    const [downloadFileId, setDownloadFileId] = useState(0);
    const [downloadFileName, setDownloadFileName] = useState("");
    const handleClickLink = async (params, e) => {
        setModalShow(true);
        setDownloadFileId(params.id);
        setDownloadFileName(params.fileName);
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title><strong>첨부파일</strong></Card.Title>
                <hr/>
                {props.files.map((file, index) => {
                    return (
                        <div className="d-flex justify-content-between" key={index}>
                            <Link onClick={(e) => handleClickLink(file, e)} style={{ color: "black" }}>{ file.fileName }</Link>
                            <div>{ file.createdDate }</div>
                        </div>
                    ) 
                })}

                <Modal show={modalShow} onHide={() => setModalShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Download</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you really want to download file?<br/>
                        <strong><u>{ downloadFileName }</u></strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={handleDownload} id={ downloadFileId }>
                            Download
                        </Button>
                        <Button variant="danger" onClick={() => setModalShow(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card.Body>
        </Card>
    )
}

export default function FreeBoardPost() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchPostV1(id)
        .then((response) => {
            setPost(response);
        }).catch((error) => {
            console.log(error);
        });

        fetchFilesV1(id)
        .then((response) => {
            setFiles(response);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();

        // 방법 1 API 모듈화
        deleteFilesV1(id)
        .catch((error) => {
            console.log(error);
        });

        deletePostV1(id)
        .then(() => {
            window.location.href = `/support/freeboard`;
        }).catch((error) => {
            console.log(error);
        });

        // 방법 1: Attachment, Post 각각 삭제
        // await axios.delete(`/api/attachment/${id}`)
        // .then((response) => {

        // }).catch((error) => {
        //     console.log(error);
        // });

        // await PostAPIV1.delete(`/api/v1/post/${id}`)
        // .then((response) => {
        //     window.location.href = `/support/freeboard`;
        // }).catch((error) => {
        //     console.log(error);
        // });

        // 방법 2: Post 삭제를 통해 Attachment도 삭제
        // ERROR Removing a detached instance 발생, @Transaction에 관한 문제로 추측
        // await axios.delete(`/api/v2/post/${id}`)
        // .then((response) => {
        //     window.location.href = `/support/freeboard`;
        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    return (
        <>
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SupportSideBar />                
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>자유게시판</strong></h2></Card.Title>
                            <hr/>

                            <Card.Title><h3><strong>{ post.title }</strong></h3></Card.Title>
                            <Card className="mb-3" style={{ minHeight: "50vh" }}>
                                <Card.Body>
                                    <Card.Text>{ post.content }</Card.Text>
                                </Card.Body>
                            </Card>

                            {0 < files.length &&
                                <FileList files={files} />
                            }

                            <div className="d-flex justify-content-end">
                                <Link to={`/support/freeboard/form/${post.id}`}>
                                    <Button variant="dark" className="ms-2" style={{ width: "100px" }}>수정</Button>
                                </Link>
                                <Button variant="danger" className="ms-2" style={{ width: "100px" }} onClick={handleDelete}>삭제</Button>
                            </div>
                        </Card.Body>
                    </Card>

                    <Comment postId={id} />
                </Col>
            </Row>
        </Container>
        </>
    );
}