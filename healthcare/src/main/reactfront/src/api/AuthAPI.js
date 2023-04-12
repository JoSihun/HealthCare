import axios from "axios";

const API = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    },
});

// 로그인 API
export const signin = async ({ email, username, password }) => {
    const data = { email, username, password };
    return await API.post(`/api/v1/auth/login`, data);
}

// 회원가입 API
export const signUp = async ({ email, username, password }) => {
    const data = { email, username, password };
    return await API.post(`/api/v1/auth/signup`, data);
}

// 어차피 페이지 스크립트에서 사용할 때 try/catch 문 사용해야함
// export const login = async (email, username, password) => {
//     const data = { email, username, password };
//     return await API.post(`/api/v1/auth/login`, data)
//     .then(response => response.data)
//     .catch(error => {
//         console.log(error);
//         throw error;
//     });
// }

// 어차피 페이지 스크립트에서 사용할 때 try/catch 문 사용해야함
// export const signUp = async (email, username, password) => {
//     const data = { email, username, password };
//     return await API.post(`/api/v1/auth/signup`, data)
//     .then(response => response.data)
//     .catch(error => {
//         console.log(error);
//         throw error;
//     });
// }


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