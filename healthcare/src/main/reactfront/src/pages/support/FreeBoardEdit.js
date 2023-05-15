import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import PostAPI from "../../api/support/PostAPI";
import { SupportSideBar } from "../../components/SideBar";

// const FileList = (props) => {
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         const values = [];
//         const keys = Object.keys(props.files)
//         for (let i = 0; i < keys.length; i++) {
//             values.push({
//                 key: keys[i],
//                 name: props.files[keys[i]].name,
//                 size: props.files[keys[i]].size,
//                 // 추후 첨부파일 수정기능 추가요망
//                 // name: props.files[keys[i]].name || props.files[keys[i]].fileName,
//                 // size: props.files[keys[i]].size || props.files[keys[i]].fileSize,
//             });
//         }

//         setFiles(values);
//     }, [props]);

//     const handleDelete = async (e) => {
//         e.preventDefault();
//         const dataTransfer = new DataTransfer();
//         let fileArray = Array.from(props.files);
//         fileArray.splice(e.target.parentElement.id, 1);
//         fileArray.forEach(file => { dataTransfer.items.add(file); });
//         props.fileRef.current.files = dataTransfer.files;
//         props.setFiles(dataTransfer.files);
//     }

//     return (
//         <Card>
//             <Card.Body>
//                 {files.map((file, index) => (
//                     <div key={index} className="d-flex justify-content-between">
//                         <div>{file.name}</div>
//                         <div>{file.size} Byte&nbsp;
//                             <Link id={file.key} onClick={handleDelete} style={{ color: "gray" }}><strong>X</strong></Link>
//                         </div>
//                     </div>
//                 ))}
//             </Card.Body>
//         </Card>
//     );
// }

// const EditForm = (props) => {
//     const { id } = props;
//     const fileRef = useRef(null);
//     const [files, setFiles] = useState([]); 
//     const [values, setValues] = useState(props.post);
//     // 추후 첨부파일 수정기능 추가요망
//     // const [files, setFiles] = useState(props.files);

//     useEffect(() => {
//         // 추후 첨부파일 수정기능 추가요망
//         // setFiles(props.files); 
//         setValues(props.post);
//     }, [props]);
    
//     const handleChange = async (e) => {
//         e.preventDefault();
//         setValues({...values,
//             [e.target.id]: e.target.value
//         });
//     }

//     const handleChangeFiles = async (e) => {
//         e.preventDefault();
//         setFiles(e.target.files);
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // 방법 2 API 모듈화
//         PostAPI.updatePostV2(id, values, files)
//         .then((response) => {
//             window.location.href = `/support/freeboard/post/${response}`;
//         }).catch((error) => {
//             console.log(error);
//         });

//         // 방법 1: Attachment, Post 각각 저장, 정상작동함
//         // await axios.put(`/api/v1/post/${id}`, values)
//         // .then((response) => {

//         // }).catch((error) => {
//         //     console.log(error);
//         // });

//         // const formData = new FormData();
//         // for (var i = 0; i < files.length; i++) {
//         //     formData.append("files", files[i]);
//         // }

//         // await axios.put(`/api/attachment/${id}`, formData, {
//         //     headers: {
//         //         "Content-Type": "multipart/form-data",
//         //     },
//         // }).then((response) => {
//         //     window.location.href = `/support/freeboard/post/${id}`;
//         // }).catch((error) => {
//         //     console.log(error);
//         // });

//         // 방법 2: Post 저장을 통해 Attachment도 저장
//         // 변수가 더 깔끔하여 채택
//         // const formData = new FormData();
//         // formData.append("data", new Blob([JSON.stringify(values)], {
//         //     type: "application/json"
//         // }));

//         // for (var i = 0; i < files.length; i++) {
//         //     formData.append("files", files[i]);
//         // }
        
//         // await axios.put(`/api/v2/post/${id}`, formData, {
//         //     headers: {
//         //         "Content-Type": "multipart/form-data"
//         //     }
//         // }).then((response) => {
//         //     window.location.href = `/support/freeboard/post/${response.data}`;
//         // }).catch((error) => {
//         //     console.log(error);
//         // });
//     }

//     return (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <div className="form-group mb-2">
//                 <label htmlFor="title" style={{ fontSize: "20px", fontWeight: "bold"}}>제목</label>
//                 <input type="text" className="form-control" id="title" onChange={handleChange} value={values.title||''}></input>
//             </div>
//             <div className="form-group mb-3">
//                 <label htmlFor="file" style={{ fontSize: "20px", fontWeight: "bold"}}>첨부파일</label>
//                 <input type="file" className="form-control" id="file" name="file" multiple="multiple" onChange={handleChangeFiles} ref={fileRef}></input>
//                 {0 < files.length && <FileList files={files} setFiles={setFiles} fileRef={fileRef} />}
//             </div>
//             <div className="form-group mb-3">
//                 <label htmlFor="content" style={{ fontSize: "20px", fontWeight: "bold"}}>내용</label>
//                 <textarea className="form-control" id="content" rows="20" onChange={handleChange} value={values.content}></textarea>
//             </div>
//             <div className="form-group d-flex justify-content-end">
//                 <Button type="submit" className="me-1" style={{ width: "100px" }} variant="dark">수정</Button>
//                 <Button href={`/support/freeboard/post/${id}`} className="ms-1" style={{ width: "100px" }} variant="danger">취소</Button>
//             </div>
//         </form>
//     )
// }

// export default function FreeBoardEdit() {
//     const { id } = useParams();
//     const [post, setPost] = useState({});
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         PostAPI.fetchPost({ id })
//         .then((response) => {
//             setPost(response);
//         }).catch((error) => {
//             console.log(error);
//         });

//         fetchFilesV1(id)
//         .then((response) => {
//             setFiles(response);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }, [id]);

//     return (
//         <Container fluid>
//             <Row className="justify-content-center">
//                 <Col className="col-md-2 mx-2 my-4">
//                     <SupportSideBar />
//                 </Col>

//                 <Col className="col-md-9 mx-2 my-4">
//                     <Card>
//                         <Card.Body>
//                             <Card.Title><h2><strong>자유게시판</strong></h2></Card.Title>
//                             <hr/>
//                             <EditForm id={id} post={post} files={files} />
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

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

        // AttachAPI.fetchFilesV1(id)
        // .then((response) => {
        //     const fileList = response.map((file) => ({
        //         name: file.fileName,
        //         size: file.fileSize,
        //     }));
        //     setFiles(fileList);
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // });
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
