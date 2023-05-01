import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

export const BMIApi = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 유저 BMI 목록조회 - List */
export const fetchBMIList = async () => {
    const response = await BMIApi.get(`/api/v1/bmi/list`);
    return response.data;
}

/** 유저 BMI 목록조회 - Page */
export const fetchBMIPage = async (pageNums, pageSize) => {
    const queryString = `page=${pageNums - 1}&size=${pageSize}`;
    const response = await BMIApi.get(`/api/v1/bmi/page?${queryString}`);
    return response.data;
}

