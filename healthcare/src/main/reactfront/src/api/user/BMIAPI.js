import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const BMIAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': `${REFRESH_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 유저 BMI 조회 */
export const fetchBMI = async (id) => {
    const response = await BMIAPI.get(`/api/v1/bmi/${id}`);
    return response.data;
}

/** 유저 BMI 목록조회 - List */
export const fetchBMIList = async () => {
    const response = await BMIAPI.get(`/api/v1/bmi/list`);
    return response.data;
}

/** 유저 BMI 목록조회 - Page */
export const fetchBMIPage = async (pageNums, pageSize) => {
    const queryString = `page=${pageNums - 1}&size=${pageSize}`;
    const response = await BMIAPI.get(`/api/v1/bmi/page?${queryString}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
const ApiObject = { BMIAPI, fetchBMI, fetchBMIList, fetchBMIPage };
export default ApiObject;