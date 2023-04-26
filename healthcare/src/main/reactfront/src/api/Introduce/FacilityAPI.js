import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

const FacilityAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** 시설 조회 V1 */
export const fetchFacilitiesV1 = async () => {
    const response = await FacilityAPI.get(`/api/v1/facility`);
    return response.data;
}

/** 시설 삽입 V1 */
export const createFacilityV1 = async (data) => {
    const response = await FacilityAPI.post(data);
    return response.data;
}

/** 시설 수정 */
export const updateFacilityV1 = async (id, data) => {
    const response = await FacilityAPI.put(`/api/v1/facility/${id}`, data);
    return response.data;
}

/** 시설 삭제 */
export const deleteFacilityV1 = async (id) => {
    const response = await FacilityAPI.delete(`/api/v1/facility/${id}`);
    return response.data;
}