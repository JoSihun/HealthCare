import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";

const FileList = (props) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const values = [];
        const keys = Object.keys(props.files)
        for (let i = 0; i < keys.length; i++) {
            values.push({
                key: keys[i],
                name: props.files[keys[i]].name,
                size: props.files[keys[i]].size,
            });
        }

        setFiles(values);
    }, [props]);

    const handleDelete = async (e) => {
        e.preventDefault();
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(props.files);
        fileArray.splice(e.target.parentElement.id, 1);
        fileArray.forEach(file => { dataTransfer.items.add(file); });
        props.fileRef.current.files = dataTransfer.files;
        props.setFiles(dataTransfer.files);
    }

    return (
        <Card>
            <Card.Body>
                {files.map((file, index) => {
                    return (
                        <div key={index} className="d-flex justify-content-between">
                            <div>{file.name}</div>
                            <div>{file.size} Byte&nbsp;
                                <Link id={file.key} onClick={handleDelete} style={{ color: "gray" }}><strong>X</strong></Link>
                            </div>
                        </div>
                    )
                })}
            </Card.Body>
        </Card>
    );
}

const InputForm = () => {
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
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
    
    const handleChangeFiles = async (e) => {
        e.preventDefault();
        setFiles(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify(values)], {
            type: "application/json"
        }));

        for (var i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        
        await axios.post(`/api/post`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            window.location.href = `/support/freeboard/post/${response.data}`;
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
                <input type="file" className="form-control" id="file" name="file" multiple="multiple" onChange={handleChangeFiles} ref={fileRef}></input>
                {0 < files.length && <FileList files={files} setFiles={setFiles} fileRef={fileRef} />}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용</label>
                <textarea className="form-control" id="content" rows="20" onChange={handleChange} value={values.content}></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
                <Button type="submit" className="me-1" style={{ width: "100px" }} variant="dark">등록</Button>
                <Button href="/support/freeboard" className="ms-1" style={{ width: "100px" }} variant="danger">취소</Button>
            </div>
        </form>
    )
}

export default function QNABoardEdit() {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-2 mx-2 my-4">
                    <SideBar />
                </Col>

                <Col className="col-md-9 mx-2 my-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><h2><strong>Q&A</strong></h2></Card.Title>
                            <hr/>
                            <InputForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}