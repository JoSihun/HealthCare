import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const UserAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': `${REFRESH_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 토큰갱신함수
const refreshAccessToken = async () => {
    await UserAPI.get(`/api/v1/auth/refresh`)
    .then((response) => {
        ACCESS_TOKEN = response.data.accessToken;
        localStorage.setItem('accessToken', ACCESS_TOKEN);
        UserAPI.defaults.headers.common['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
    }).catch((error) => {
        // 테스트 필요
        if (error.response.status === 401) {
            window.location.assign("/signin");
        }
    });
}

// 토큰갱신함수
UserAPI.interceptors.response.use((response) => response,
    async (error) => {
        if (error.response.status === 403 && !error.config._retry) {
            await refreshAccessToken();
            error.config.headers.Authorization = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
            return UserAPI(error.config);
        }
        localStorage.clear()
        return Promise.reject(error);
    }
);

/////////////////////////////////////////////////////////////////////////////////////////////////
// 유저조회 API
export const fetchUser = async () => {
    const response = await UserAPI.get(`/api/v1/user`);
    return response.data;
}

// 유저목록조회 API - List
export const fetchUserList = async (sort) => {
    const querystring = `sort=${sort}`;
    const response = await UserAPI.get(`/api/v1/user/all-list?${querystring}`);
    return response.data;
};

// 유저목록조회 API - Page
export const fetchUserPage = async (page, size, sort) => {
    const querystring = `page=${page}&size=${size}&sort=${sort}`;
    const response = await UserAPI.get(`/api/v1/user/all-page?${querystring}`);
    return response.data;
};

/////////////////////////////////////////////////////////////////////////////////////////////////
// 유저검색조회 API - List
export const searchUserList = async (name, sort) => {
    const querystring = `name=${name}&sort=${sort}`;
    const response = await UserAPI.get(`/api/v1/user/search-list?${querystring}`);
    return response.data;
}

// 유저검색조회 API - Page
export const searchUserPage = async (name, page, size, sort) => {
    const querystring = `name=${name}&page=${page}&size=${size}&sort=${sort}`;
    const response = await UserAPI.get(`/api/v1/user/search-page?${querystring}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// 유저생성 API
export const createUser = async (data) => {
    const response = await UserAPI.post(`/api/v1/user`, data);
    return response.data;
}

// 유저수정 API
export const updateUser = async (data) => {
    const response = await UserAPI.put(`/api/v1/user`, data);
    return response.data;
}

// 유저삭제 API
export const deleteUser = async () => {
    await UserAPI.delete(`/api/v1/user`);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
const ApiObject = { UserAPI, fetchUser, fetchUserList, fetchUserPage,
    searchUserList, searchUserPage, createUser, updateUser, deleteUser };
export default ApiObject;