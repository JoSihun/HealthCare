import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

const TestApi = () => {
    const [ testString, setTestString ] = useState('Basic Value');

    useEffect(() => {
        axios.get("/home")
        .then((response) => { setTestString(response.data) })
        .catch((error) => { console.log(error) });

    }, []);

    return (
        <>
            <h1>{ testString }</h1><hr/>
        </>
    );
}

const Home = () => {
    return (
        <>
            <Container fluid className="min-vh-100">
                <h1>This is Home.</h1><hr/>
                <TestApi />
            </Container>
        </>
    );
}

export default Home;
