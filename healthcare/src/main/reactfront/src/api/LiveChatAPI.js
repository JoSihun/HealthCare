import axios from "axios";

export const LiveChatAPI = axios.create({
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    },
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/** USER 채팅방 목록 */
export const fetchChatRooms = async (userId) => {
    const response = await LiveChatAPI.get(`/api/v1/livechat/list/${userId}`);
    return response.data;
}

/** 채팅방 메세지 목록 */
export const fetchChatMessages = async (roomUuid) => {
    const response = await LiveChatAPI.get(`/api/v1/livechat/message?uuid=${roomUuid}`);
    return response.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/** USER 채팅방 조회 */
export const fetchChatRoom = async (roomUuid) => {
    const response = await LiveChatAPI.get(`/api/v1/livechat/room?uuid=${roomUuid}`);
    return response.data;
}

/** USER 채팅방 수정 */
export const updateChatRoom = async (chatRoomId, data) => {
    const response = await LiveChatAPI.put(`/api/v1/livechat/room/${chatRoomId}`, data);
    return response.data;
}

/** USER 채팅방 삭제 */
export const deleteChatRoom = async (chatRoomId) => {
    await LiveChatAPI.delete(`/api/v1/livechat/room/${chatRoomId}`);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/** ADMIN 채팅방 목록 */
export const fetchAdminChatRooms = async () => {
    const response = await LiveChatAPI.get(`/api/v1/admin/livechat/list`);
    return response.data;
}