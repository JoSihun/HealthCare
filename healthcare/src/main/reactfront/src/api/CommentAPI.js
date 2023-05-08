import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

const CommentAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': REFRESH_TOKEN,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 댓글 목록 */
export const fetchCommentsV1 = async (postId) => {
    const response = await CommentAPI.get(`/api/v1/comment?post=${postId}`);
    return response.data;
}

/** 댓글 삽입 */
export const createCommentV1 = async (postId, data) => {
    const response = await CommentAPI.post(`/api/v1/comment?post=${postId}`, data);
    return response.data;
}

/** 댓글 수정 */
export const updateCommentV1 = async (postId, commentId, data) => {
    const queryString = `post=${postId}&comment=${commentId}`;
    const response = await CommentAPI.put(`/api/v1/comment?${queryString}`, data);
    return response.data;
}

/** 댓글 삭제 */
export const deleteCommentV1 = async (postId, commentId) => {
    const queryString = `post=${postId}&comment=${commentId}`;
    const response = await CommentAPI.delete(`/api/v1/comment?${queryString}`);
    return response.data;
}