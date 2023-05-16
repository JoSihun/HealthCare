import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const DietAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': `${REFRESH_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 식단 조회 API */
export const fetchDiet = async ({ id }) => {
    const response = await DietAPI.get(`/api/v1/diet/${id}`);
    return response.data;
}

/** 식단 목록조회 API - Page */
export const fetchDiets = async (page, size) => {
    const queryString = `page=${page - 1}&size=${size}`;
    const response = await DietAPI.get(`/api/v1/diet/list?${queryString}`);
    return response.data;
}

/** 추천식단 조회 - List */
export const fetchRecommendFoods = async (bmiId) => {
    const queryString = `bmiId=${bmiId}`;
    const response = await DietAPI.get(`/api/v1/diet/recommend?${queryString}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 식단 삽입 API */
export const createDiet = async (data) => {
    const response = await DietAPI.post(`/api/v1/diet`, data);
    return response.data;
}

/** 식단 수정 API */
export const updateDiet = async ({ id, data }) => {
    const response = await DietAPI.put(`/api/v1/diet/${id}`, data);
    return response.data;
}

/** 식단 삭제 API */
export const deleteDiet = async (id) => {
    const response = await DietAPI.delete(`/api/v1/diet/${id}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
const ApiObject = { DietAPI, fetchDiet, fetchDiets, fetchRecommendFoods,
    createDiet, updateDiet, deleteDiet };
export default ApiObject;