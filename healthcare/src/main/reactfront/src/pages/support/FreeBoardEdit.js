import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";

const FileList = (props) => {
    useEffect(() => {

    }, [props]);

    return (
        <Card>
            <Card.Body>
                {props.fileList.map((file, index) => {
                    return (
                        <div key={index} className="d-flex justify-content-between">
                            <div>{file.name}</div>
                            <div>{file.size} Byte</div>
                            {/* 삭제버튼 추가요망 */}
                        </div>
                    )
                })}
            </Card.Body>
        </Card>
    );
}

const EditForm = ({ id, post }) => {
    const [files, setFiles] = useState([]);
    const [values, setValues] = useState({});
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setValues(post);
    }, [id, post]);
    
    const handleChange = async (e) => {
        e.preventDefault();
        setValues({...values,
            [e.target.id]: e.target.value
        });
    }

    const handleChangeFiles = async (e) => {
        e.preventDefault();
        setFiles(e.target.files);

        const arrayList = [];
        for (let i = 0; i < e.target.files.length; i++) {
            arrayList.push({
                name: e.target.files[i].name,
                size: e.target.files[i].size
            });
        }
        setFileList(arrayList);
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
        
        await axios.put(`/api/post/${id}`, formData, {
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
                <input type="file" className="form-control" id="file" name="file" multiple="multiple" onChange={handleChangeFiles}></input>
                {0 < fileList.length && <FileList fileList={fileList} />}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용</label>
                <textarea className="form-control" id="content" rows="20" onChange={handleChange} value={values.content}></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
                <Button type="submit" className="me-1" style={{ width: "100px" }} variant="dark">수정</Button>
                <Button href={`/support/freeboard/post/${id}`} className="ms-1" style={{ width: "100px" }} variant="danger">취소</Button>
            </div>
        </form>
    )
}

export default function FreeBoardEdit() {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const axiosGetPost = async () => {
            await axios.get(`/support/freeboard/post/${id}`)
            .then((response) => {
                setPost(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        // axiosGetFile() 추가요망?
        axiosGetPost();
    }, [id]);

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
                            <EditForm id={id} post={post} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}