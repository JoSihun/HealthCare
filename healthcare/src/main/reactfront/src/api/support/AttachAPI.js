import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const AttachAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': `${REFRESH_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 첨부파일 바이너리 데이터 */
export const fetchBinary = async (id) => {
    const response = await AttachAPI.get(`/api/v1/attachment/binary/${id}`, { responseType: 'blob' });
    return response.data;
}

/** 첨부파일 다운로드 */
export const downloadFile = async (id) => {
    await AttachAPI.get(`/api/v1/attachment/download/${id}`, { responseType: 'blob' })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');

        link.href = url;
        link.style.display = 'none';
        const disposition = response.headers['content-disposition'];
        link.download = decodeURI(disposition
            .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
            .replace(/['"]/g, "")
        );

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }).catch((error) => {
        console.log(error);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 첨부파일 목록 */
export const fetchAttachesV1 = async (postId) => {
    const params = { post: postId };
    const response = await AttachAPI.get(`/api/v1/attachment`, { params });
    return response.data;
}

/** 첨부파일 생성 */
export const createAttachesV1 = async (postId, files) => {
    const params = { post: postId };
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    
    const response = await AttachAPI.post(`/api/v1/attachment`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: params, 
    });
    return response.data;
}

/** 첨부파일 수정 */
export const updateAttachesV1 = async (postId, files) => {
    const params = { post: postId };
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    
    const response = await AttachAPI.put(`/api/v1/attachment`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: params, 
    });
    return response.data;
}

/** 첨부파일 삭제 */
export const deleteAttachesV1 = async (postId) => {
    const params = { post: postId };
    const response = await AttachAPI.delete(`/api/v1/attachment`, { params });
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
const ApiObject = {
    AttachAPI,
    fetchAttachesV1, fetchBinary, downloadFile,
    createAttachesV1, updateAttachesV1, deleteAttachesV1,
};
export default ApiObject;