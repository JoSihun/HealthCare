import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const UserApi = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 토큰갱신함수
const refreshAccessToken = async () => {
    const response = await UserApi.get(`/api/v1/auth/refresh`);
    ACCESS_TOKEN = response.data;
    localStorage.setItem('accessToken', ACCESS_TOKEN);
    UserApi.defaults.headers.common['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
}

// 토큰갱신함수
UserApi.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        await refreshAccessToken();
        return UserApi(originalRequest);
    }
    return Promise.reject(error);
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 유저조회 API
export const fetchUser = async () => {
    const response = await UserApi.get(`/api/v1/user`);
    return response.data;
}

// 유저목록조회 API
export const fetchUsers = async () => {
    const response = await UserApi.get(`/api/v1/user/all`);
    return response.data;
}

// 유저검색조회 API
export const searchUsers = async (data) => {
    const { username } = data;
    const response = await UserApi.get(`/api/v1/user/search?username=${username}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// 유저생성 API
export const createUser = async (data) => {
    const response = await UserApi.post(`/api/v1/user`, data);
    return response.data;
}

// 유저수정 API
export const updateUser = async (data) => {
    const response = await UserApi.put(`/api/v1/user`, data);
    return response.data;
}

// 유저삭제 API
export const deleteUser = async () => {
    await UserApi.delete(`/api/v1/user`);
}