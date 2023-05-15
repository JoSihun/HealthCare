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
/** 첨부파일 목록 */
export const fetchFilesV1 = async (postId) => {
    const params = { post: postId };
    const response = await AttachAPI.get(`/api/v1/attachment`, { params });
    return response.data;
}

/** 첨부파일 삭제 */
export const deleteFilesV1 = async (postId) => {
    const params = { post: postId };
    const response = await AttachAPI.delete(`/api/v1/attachment`, { params });
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
const ApiObject = {
    AttachAPI, fetchFilesV1, deleteFilesV1, downloadFile
};
export default ApiObject;