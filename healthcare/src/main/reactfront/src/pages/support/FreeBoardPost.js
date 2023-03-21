import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import SideBar from "../../components/support/SideBar";
import Comment from "../../components/support/Comment";

const FileList = (props) => {
    const handleDownload = async (e) => {
        e.preventDefault();
        await axios({
            url: `/api/attachment/download/${e.target.id}`,
            method: "GET",
            responseType: "blob"
        }).then((response) => {
            const blob = new Blob([response.data]);
            const fileObjectUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = fileObjectUrl;
            link.style.display = "none";

            const extractDownloadFilename = (response) => {
                const disposition = response.headers["content-disposition"];
                const fileName = decodeURI(
                    disposition
                        .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
                        .replace(/['"]/g, "")
                );
                return fileName;
            };
            link.download = extractDownloadFilename(response);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(fileObjectUrl);
        })
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
        const axiosGetPost = async () => {
            await axios.get(`/support/freeboard/post/${id}`)
            .then((response) => {
                setPost(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        const axiosGetFiles = async () => {
            await axios.get(`/api/attachment/${id}`)
            .then((response) => {
                setFiles(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        axiosGetPost();
        axiosGetFiles();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();

        await axios.delete(`/api/post/${id}`)
        .then((response) => {
            window.location.href = `/support/freeboard`;
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
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