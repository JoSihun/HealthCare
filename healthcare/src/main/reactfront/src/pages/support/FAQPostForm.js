import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
//React GET, POST 통신: https://infodon.tistory.com/m/116
//React GET, POST 통신: https://velog.io/@easyhyun00/Spring-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Spring-React-%EC%97%B0%EA%B2%B0

export default function FAQPostForm({ faq }) {
    const [values, setValues] = useState({
        title: faq.title,
        content: faq.content,
        author: "Admin",
        hits: 0,
        category: "FAQBoard",
        secretYn: false
    });

    const handleChange = (e) => {
        e.preventDefault();
        setValues({...values,
            [e.target.id]: e.target.value        
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/post/${faq.id}`, values)
        .then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Card className='my-3'>
            <Card.Body>
            <form id={ faq.id } onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title' style={{ fontSize: "20px", fontWeight: "bold"}}>수정할 질문</label>
                    <input type='text' className='form-control' id='title' onChange={handleChange} value={values.title}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='content' style={{ fontSize: "20px", fontWeight: "bold"}}>질문 답변</label>
                    <textarea className='form-control' id='content' rows='3' onChange={handleChange} value={values.content}></textarea>
                </div>
                <div className='d-flex justify-content-end mt-3'>
                    <Button variant='primary' className='ms-1' style={{ width: "100px" }}
                    type='submit'>수정</Button>
                </div>
            </form>
            </Card.Body>
        </Card>
    );
}