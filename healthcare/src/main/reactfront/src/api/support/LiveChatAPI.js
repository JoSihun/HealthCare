import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const LiveChatAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'X-Refresh-Token': `${REFRESH_TOKEN}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** USER 채팅방 목록 - List */
export const fetchChatRooms = async () => {
    const response = await LiveChatAPI.get(`/api/v1/livechat/list`);
    return response.data;
}

/** ADMIN 채팅방 목록 - List */
export const fetchAdminChatRooms = async () => {
    const response = await LiveChatAPI.get(`/api/v1/admin/livechat/list`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/** USER 채팅방 조회 - id */
export const fetchChatRoomById = async (id) => {
    const response = await LiveChatAPI.get(`/api/v1/livechat/room/${id}`);
    return response.data;
}

/** USER 채팅방 조회 - uuid */
export const fetchChatRoomByUuid = async (roomUuid) => {
    const params = { uuid: roomUuid };
    const response = await LiveChatAPI.get(`/api/v1/livechat/room`, { params });
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/** USER 채팅방 생성 */
export const createChatRoom = async (data) => {
    const response = await LiveChatAPI.post(`/api/v1/livechat/room`, data);
    return response.data;
}

/** USER 채팅방 수정 */
export const updateChatRoom = async (id, data) => {
    const response = await LiveChatAPI.put(`/api/v1/livechat/room/${id}`, data);
    return response.data;
}

/** USER 채팅방 삭제 */
export const deleteChatRoom = async (id) => {
    await LiveChatAPI.delete(`/api/v1/livechat/room/${id}`);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/** 채팅방 메세지 목록 */
export const fetchChatMessages = async (roomId = null, uuid = null) => {
    const params = { chatRoom: roomId, uuid: uuid };
    const response = await LiveChatAPI.get(`/api/v1/livechat/message`, { params });
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
const ApiObject = {
    LiveChatAPI,
    fetchChatMessages,
    fetchChatRooms, fetchAdminChatRooms,
    fetchChatRoomById, fetchChatRoomByUuid,
    createChatRoom, updateChatRoom, deleteChatRoom,
};
export default ApiObject;