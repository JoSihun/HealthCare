import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

const PostAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': REFRESH_TOKEN,
    },
});

export const PostAPIV1 = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': REFRESH_TOKEN,
    },
});

export const PostAPIV2 = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': REFRESH_TOKEN,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 토큰갱신함수
const refreshAccessToken = async () => {
    const response = await PostAPI.get(`/api/v1/auth/refresh`);
    ACCESS_TOKEN = response.data;
    localStorage.setItem('accessToken', ACCESS_TOKEN);
    PostAPI.defaults.headers.common['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
}

// 토큰갱신함수
PostAPI.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        await refreshAccessToken();
        return PostAPI(originalRequest);
    }
    return Promise.reject(error);
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 게시글 목록 v1
export const fetchPageV1 = async (boardName, queryString) => {
    const response = await PostAPI.get(`/api/v1/post/${boardName}?${queryString}`);
    return response.data;
}

// 게시글 검색 v1
export const searchPageV1 = async (boardName, queryString) => {
    const response = await PostAPI.get(`/api/v1/post/${boardName}/search?${queryString}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// 게시글 조회 v1
export const fetchPostV1 = async (id) => {
    const response = await PostAPI.get(`/api/v1/post/${id}`);
    return response.data;
}

// 게시글 삽입 v1
export const createPostV1 = async (data) => {
    const response = await PostAPI.post(`/api/v1/post`, data);
    return response.data;
}

// 게시글 수정 v1
export const updatePostV1 = async (id, data) => {
    const response = await PostAPI.put(`/api/v1/post/${id}`, data);
    return response.data;
}

// 게시글 삭제 v1
export const deletePostV1 = async (id) => {
    const response = await PostAPI.delete(`/api/v1/post/${id}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// 게시글 삽입 v2
export const createPostV2 = async (data, files) => {
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(data)], {
        type: "application/json"
    }));

    for (var i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }
    
    const response = await PostAPIV2.post(`/api/v2/post`, formData);
    return response.data;
}

// 게시글 수정 v2
export const updatePostV2 = async (id, data, files) => {
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(data)], {
        type: "application/json"
    }));

    for (var i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }
    
    const response = await PostAPIV2.put(`/api/v2/post/${id}`, formData);
    return response.data;
}
