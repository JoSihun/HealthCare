import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const CommentAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': `${REFRESH_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 댓글 목록 */
export const fetchCommentsV1 = async (postId) => {
    const params = { post: postId };
    const response = await CommentAPI.get(`/api/v1/comment`, { params });
    return response.data;
}

/** 댓글 삽입 */
export const createCommentV1 = async (postId, data) => {
    const params = { post: postId };
    const response = await CommentAPI.post(`/api/v1/comment`, data, { params });
    return response.data;
}

/** 댓글 수정 */
export const updateCommentV1 = async (id, data) => {
    const response = await CommentAPI.put(`/api/v1/comment/${id}`, data);
    return response.data;
}

/** 댓글 삭제 */
export const deleteCommentV1 = async (id) => {
    const response = await CommentAPI.delete(`/api/v1/comment/${id}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
const ApiObject = { CommentAPI, fetchCommentsV1, createCommentV1, updateCommentV1, deleteCommentV1 };
export default ApiObject;