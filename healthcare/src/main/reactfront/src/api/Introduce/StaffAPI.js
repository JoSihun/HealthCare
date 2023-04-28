import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

const StaffAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },    
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 직원 조회 V1 */
export const fetchStaffV1 = async () => {
    const response = await StaffAPI.get(`/api/v1/staff`);
    return response.data;
}

/** 직원 삽입 V1 */
export const createStaffV1 = async (data) => {
    const response = await StaffAPI.post(`/api/v1/staff`, data);
    return response.data;
}

/** 직원 삭제 */
export const deleteStaffV1 = async (id) => {
    const response = await StaffAPI.delete(`/api/v1/staff/${id}`);
    return response.data;
}
