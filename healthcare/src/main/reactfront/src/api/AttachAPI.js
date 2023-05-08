import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

const AttachAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': REFRESH_TOKEN,
    },
});

export const AttachAPIV1 = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': REFRESH_TOKEN,
    },
});

export const AttachAPIV2 = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': REFRESH_TOKEN,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 첨부파일 목록 */
export const fetchFilesV1 = async (postId) => {
    const response = await AttachAPI.get(`/api/v1/attachment/${postId}`);
    return response.data;
}

/** 첨부파일 삭제 */
export const deleteFilesV1 = async (postId) => {
    const response = await AttachAPI.delete(`/api/v1/attachment/${postId}`);
    return response.data;
}

/** 첨부파일 다운로드 */
export const downloadFile = async (attachId) => {
    try {
        const response = await AttachAPI.get(`/api/v1/attachment/download/${attachId}`, { responseType: 'blob' });
        const blob = new Blob([response.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = fileObjectUrl;
        link.style.display = 'none';

        const disposition = response.headers['content-disposition'];
        link.download = decodeURI(
            disposition
            .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
            .replace(/['"]/g, "")
        );

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileObjectUrl);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
