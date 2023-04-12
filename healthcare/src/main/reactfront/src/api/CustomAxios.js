import axios from "axios";

// export const instance = axios.create({
//     baseURL: "http://localhost:8080",
//     headers: { 'X-Custom-Header': 'foobar' },
//     timeout: 1000,
// });

export const customPostAPI = axios.create({
    baseURL: "http://localhost:8080",
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
});