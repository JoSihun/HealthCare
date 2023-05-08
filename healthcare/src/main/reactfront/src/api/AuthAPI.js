import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const AuthApi = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': REFRESH_TOKEN,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 로그인 API
export const login = async ({ email, username, password }) => {
    const data = { email, username, password };
    const response = await AuthApi.post(`/api/v1/auth/login`, data);
    return response.data;
}

// 회원가입 API
export const signUp = async ({ email, username, password }) => {
    const data = { email, username, password };
    const response = await AuthApi.post(`/api/v1/auth/signup`, data);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Basic Skeleton Codes1
// export const fetchItems = async () => {
//     const response = await API.get('/items');
//     return response.data;
// };

// export const createItem = async (item) => {
//     const response = await API.post('/items', item);
//     return response.data;
// };

// export const updateItem = async (id, item) => {
//     const response = await API.put(`/items/${id}`, item);
//     return response.data;
// };

// export const deleteItem = async (id) => {
//     await API.delete(`/items/${id}`);
// };

/////////////////////////////////////////////////////////////////////////////////////////////////
// Basic Skeleton Codes2
// 어차피 페이지 스크립트에서 사용할 때 try/catch 문 사용해야함
// export const fetchItems = async () => {
//     return await API.get('/items')
//     .then(response => response.data)
//     .catch(error => {
//         console.error(error);
//         throw error;
//     });
// };
  
// export const createItem = async (item) => {
//     return await API.post('/items', item)
//     .then(response => response.data)
//     .catch(error => {
//         console.error(error);
//         throw error;
//     });
// };

// export const updateItem = async (id, item) => {
//     return await API.put(`/items/${id}`, item)
//     .then(response => response.data)
//     .catch(error => {
//         console.error(error);
//         throw error;
//     });
// };

// export const deleteItem = async (id) => {
//     return await API.delete(`/items/${id}`)
//     .catch(error => {
//         console.error(error);
//         throw error;
//     });
// };

/////////////////////////////////////////////////////////////////////////////////////////////////
// Basic Skeleton Codes3
// const BASE_API_URL = 'http://localhost:8080/api';

// const request = async (method, url, data) => {
//     const headers = {
//         'Content-Type': 'application/json',
//     };

//     const token = localStorage.getItem('token');
//     if (token) {
//         headers.Authorization = `Bearer ${token}`;
//     }

//     const response = await axios({
//         method: method,
//         url: `${BASE_API_URL}${url}`,
//         data: data,
//         headers: headers
//     });

//     return response.data;
// }

// export const loginUser = async (username, password) => {
//     const data = { username, password };
//     return await request('post', 'v1/auth/login', data);
// };

// export const getProfile = async () => {
//     return await request('get', '/users/profile');
// };