import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

const TestUseState = ({numList, setNumList}) => {
    const [num, setNum] = useState(1);

    return (
        <div>
            <h1>Test useState</h1>
            <h2>{ num }</h2>
            <button onClick={() => setNum(num + 1)}>Increase Num</button>
            <button onClick={() => setNum(num - 1)}>Decrease Num</button>
            <button onClick={() => setNum(0)}>Initialize Num</button>
            <hr/>
            <h1>Recorded NumList</h1>
            <button onClick={() => setNumList([...numList, num])}>Recording NumList</button>
            <button onClick={() => setNumList([])}>Initialize NumList</button>
            <ul>
                {numList.map((num) => (
                    <li>{ num }</li>
                ))}
            </ul>
        </div>
    );
}

const TestUseEffect = () => {
    const [posts, setPosts] = useState([]);

    // 동기 방식
    // useEffect(() => {
    //     // 동기 방식 1
    //     axios({
    //         method: "GET",
    //         url: "https://jsonplaceholder.typicode.com/photos"
    //     }).then(response => setPosts(response.data))
    //
    //     // // 동기 방식 2
    //     // axios.get("https://jsonplaceholder.typicode.com/photos")
    //     //     .then(response => setPosts(response.data))
    // })

    // 비동기 방식
    useEffect( () => {
        // 방법3 비동기
        const getAxios = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/photos");
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAxios();
    }, []);

    return (
        <div>
            <h1>Test useEffect with Axios</h1>
            <ul>
                {posts.map(post => (
                    <li key={ post.id }>
                        <div>{ post.title }</div>
                        <div><img src={ post.thumbnailUrl } alt="" /></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const TestBackend = () => {
    const baseUrl = "http://localhost:8080"
    const [testString, setTestString] = useState('');

    useEffect(() => {
        axios.get(baseUrl + '/testpage')
            .then(response => setTestString(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <h1>This is for Backend Test</h1>
            <h2>{ testString }</h2>
        </>
    )
}

const TestPage = () => {
    const [numList, setNumList] = useState([]);

    return (
        <>
            <Container fluid className="min-vh-100">
                <h1>This is Home.</h1><hr/>
                <TestUseState numList={ numList } setNumList={ setNumList } /><hr/>
                <TestUseEffect /><hr/>
                <TestBackend /><hr/>
            </Container>
        </>
    );
}

export default TestPage;
