import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const PostAPIv1 = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': `${REFRESH_TOKEN}`,
    },
});

export const PostAPIv2 = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': `${REFRESH_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 게시글 조회
export const fetchPost = async (id) => {
    const response = await PostAPIv1.get(`/api/v1/post/${id}`);
    return response.data;
}

// 게시글 목록조회
export const fetchPostPage = async (boardType, { page, size, sort } = {}) => {
    const params = { page: page - 1, size, sort };
    const response = await PostAPIv1.get(`/api/v1/post/${boardType}`, { params });
    return response.data;
}

// 게시글 검색조회
export const searchPostPage = async (boardType, { page, size, sort, searchValue, searchFilter } = {}) => {
    const params = { page: page - 1, size, sort, searchValue, searchFilter };
    const response = await PostAPIv1.get(`/api/v1/post/${boardType}/search`, { params });
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// 게시글 삽입 v1
export const createPostV1 = async (data) => {
    const response = await PostAPIv1.post(`/api/v1/post`, data);
    return response.data;
}

// 게시글 수정 v1
export const updatePostV1 = async (id, data) => {
    const response = await PostAPIv1.put(`/api/v1/post/${id}`, data);
    return response.data;
}

// 게시글 삭제 v1
export const deletePostV1 = async (id) => {
    await PostAPIv1.delete(`/api/v1/post/${id}`);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// 게시글 삽입 v2
export const createPostV2 = async (data, files) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    formData.append("data", new Blob([JSON.stringify(data)], {
        type: 'application/json'
    }));
    
    const response = await PostAPIv2.post(`/api/v2/post`, formData);
    return response.data;
}

// 게시글 수정 v2
export const updatePostV2 = async (id, data, files, remainFileIds) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    // 테스트 필요
    // formData.append("attachmentIds", remainFileIds);
    formData.append("data", new Blob([JSON.stringify(data)], {
        type: 'application/json'
    }));
    formData.append("attachmentIds", new Blob([JSON.stringify(remainFileIds)], {
        type: 'application/json'
    }));
    
    const response = await PostAPIv2.put(`/api/v2/post/${id}`, formData);
    return response.data;
}

// 게시글 삭제 v2
export const deletePostV2 = async (id) => {
    await PostAPIv2.delete(`/api/v2/post/${id}`);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
const ApiObject = {
    PostAPIv1, PostAPIv2,
    fetchPost, fetchPostPage, searchPostPage,
    createPostV1, updatePostV1, deletePostV1,
    createPostV2, updatePostV2, deletePostV2,
};
export default ApiObject;