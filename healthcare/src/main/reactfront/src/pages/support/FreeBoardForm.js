import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import PostAPI from "../../api/support/PostAPI";
import { SupportSideBar } from "../../components/SideBar";

const FileList = (props) => {
    const { files, setFiles } = props;

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
        e.currentTarget.style.backgroundColor = 'lightgray';
    }
    
    const handleMouseLeave = async (e) => {
        e.currentTarget.style.backgroundColor = '';
    }

    const handleDelete = async (index, e) => {
        const newFiles = Array.from(files);
        newFiles.splice(index, 1);
        setFiles(newFiles);
    }

    return (
        <Card style={{ minHeight: "10vh" }}>
            <Card.Body>
                {Array.from(files).map((file, index) => (
                    <div key={index} className="d-flex justify-content-start"
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className="col-1 text-start">{index + 1}</div>
                        <div className="col-8 text-start">{file.name}</div>
                        <div className="col-2 text-end">{formatFileSize(file.size)}</div>
                        <div className="col-1 text-end">
                            <Link className="fw-bold text-danger" onClick={(e) => {handleDelete(index, e)}}>
                                X
                            </Link>
                        </div>
                    </div>
                ))}
            </Card.Body>
        </Card>
    );
}

const InputForm = (props) => {
    const [files, setFiles] = useState([]);
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        secretYn: false,
        boardType: "FREE_BOARD",
    });
    
    const fileRef = useRef(null);
    useEffect(() => {
        if (fileRef.current) {
            const dataTransfer = new DataTransfer();
            Array.from(files).forEach(file => dataTransfer.items.add(file));
            fileRef.current.files = dataTransfer.files;
        }
    }, [files]);

    const handleFileChange = async (e) => {
        const newFiles = [...files, ...e.target.files];
        newFiles.sort((a, b) => a.name.localeCompare(b.name));
        setFiles(newFiles);
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
    
    const handleCancel = async (e) => {
        window.location.assign(`/support/freeboard`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        PostAPI.createPostV2(formValues, files)
        .then((response) => {
            window.location.assign(`/support/freeboard/post/${response}`)
        }).catch((error) => {
            console.log(error)
        });

        // 방법 1: Post, Attachment 각각 저장, 정상작동함
        // let id = null;
        // await axios.post(`/api/v1/post`, formValues)
        // .then((response) => {
        //     id = response.data;
        // })
        // .catch((error) => {
        //     console.log(error);
        // });

        // const formData = new FormData();
        // Array.from(files).forEach((file) => {
        //     formData.append("files", file);
        // });

        // await axios.post(`/api/v1/attachment/${id}`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // }).then((response) => {
        //     window.location.assign(`/support/freeboard/post/${id}`);
        // }).catch((error) => {
        //     console.log(error);
        // });

        // 방법 2: RequestPart로 한 번에 저장, 정상작동함
        // const formData = new FormData();
        // Array.from(files).forEach((file) => {
        //     formData.append("files", file);
        // });
        // formData.append("data", new Blob([JSON.stringify(formValues)], {
        //     type: 'application/json'
        // }));

        // await axios.post(`/api/v2/post`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // }).then((response) => {
        //     window.location.assign(`/support/freeboard/post/${response.data}`);
        // }).catch((error) => {
        //     console.log(error);
        // })
    }
    
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group mb-2">
                <label className="fs-5 fw-bold px-1" htmlFor="title">제목</label>
                <input type="text" className="form-control" id="title" name="title" onChange={handleChange} />
            </div>
            <hr/>
            <div className="form-group mb-3">
                <label className="fs-5 fw-bold px-0" htmlFor="file">첨부파일</label>
                <input type="file" className="form-control" id="file" name="file" multiple="multiple" onChange={handleFileChange} ref={fileRef} />
                <FileList files={files} setFiles={setFiles} />
            </div>
            <hr/>
            <div className="form-group mb-3">
                <label className="fs-5 fw-bold px-1" htmlFor="content">내용</label>
                <textarea className="form-control" id="content" name="content" rows={20} onChange={handleChange} />
            </div>
            <div className="form-group d-flex justify-content-between">
                <div className="col-2 d-flex justify-content-start">
                    <input type="checkbox" className="form-check-input" id="secretYn" name="secretYn"
                        onChange={handleCheckbox} checked={formValues.secretYn} />
                    <label className="ms-1" htmlFor="secretYn">&nbsp;비밀글</label>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <Button type="submit" className="me-1" variant="dark" style={{ width: "100%" }}>등록</Button>
                    <Button onClick={handleCancel} className="ms-1" variant="danger" style={{ width: "100%" }}>취소</Button>
                </div>
            </div>
        </form>
    );
}

const FormBody = (props) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="fs-2 fw-bold">
                    자유게시판
                </Card.Title>
                <hr/>
                <InputForm />
            </Card.Body>
        </Card>
    )
}

export default function FreeBoardForm() {
    return (
        <Container fluid>
            <Row className="justify-content-center mt-3">
                <Col className="col-12 col-lg-2 mb-3">
                    <SupportSideBar />
                </Col>

                <Col className="col-12 col-lg-9 mb-3">
                    <FormBody />
                </Col>
            </Row>
        </Container>
    );
}
