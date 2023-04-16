package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    /** LiveChat Room 조회 - Uuid 검색 */
    ChatRoom findByUuid(String uuid);

    /** LiveChat Room 조회 - RoomName 검색 */
    ChatRoom findByRoomName(String roomName);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** [임시] LiveChat Room 목록조회 - 기본정렬순, RoomName 검색 */
    List<ChatRoom> findAllByRoomName(String roomName);

    /** [임시] LiveChat Room 목록조회 - 조건정렬순, RoomName 검색 */
    List<ChatRoom> findAllByRoomName(String roomName, Sort sort);
}
