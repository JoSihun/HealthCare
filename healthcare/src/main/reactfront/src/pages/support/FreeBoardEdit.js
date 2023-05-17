import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import PostAPI from "../../api/support/PostAPI";
import AttachAPI from "../../api/support/AttachAPI";
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
                        <div className="text-start" style={{ width: "5%" }}>{index + 1}</div>
                        <div className="text-start" style={{ width: "75%" }}>{file.name}</div>
                        <div className="text-end" style={{ width: "15%" }}>{formatFileSize(file.size)}</div>
                        <div className="text-end" style={{ width: "5%" }}>
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

const EditForm = (props) => {
    const { id } = useParams();
    const [files, setFiles] = useState([]);
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        boardType: "FREE_BOARD",
    });

    useEffect(() => {
        PostAPI.fetchPost(id)
        .then(response => setFormValues(response))
        .catch(error => console.log(error));

        AttachAPI.fetchAttachesV1(id)
        .then((response) => {
            const promise = response.map(async (item) => {
                return await AttachAPI.fetchBinary(item.id)
                    .then((binary) => {
                        const blob = new Blob([binary]);
                        return new File([blob], item.fileName, {
                            type: item.fileType
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
            });

            Promise.all(promise)
                .then(files => setFiles(files))
                .catch(error => console.log(error));
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);
    
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
        PostAPI.updatePostV2(id, formValues, files, [])
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
                <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={formValues.title} />
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
                <textarea className="form-control" id="content" name="content" rows={20} onChange={handleChange} value={formValues.content} />
            </div>
            <div className="form-group d-flex justify-content-end">
                <Button type="submit" className="me-1" variant="dark" style={{ width: "8%" }}>수정</Button>
                <Button onClick={handleCancel} className="ms-1" variant="danger" style={{ width: "8%" }}>취소</Button>
            </div>
        </form>
    );
}

const EditFormBody = (props) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="fs-2 fw-bold">
                    자유게시판
                </Card.Title>
                <hr/>
                <EditForm />
            </Card.Body>
        </Card>
    )
}

export default function FreeBoardEdit() {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-1 my-4">
                    <SupportSideBar />
                </Col>

                <Col className="col-md-9 mx-1 my-4">
                    <EditFormBody />
                </Col>
            </Row>
        </Container>
    );
}
