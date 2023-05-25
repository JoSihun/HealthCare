package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import com.shyd.healthcare.domain.support.livechat.UserChatRoom;
import com.shyd.healthcare.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserChatRoomRepository extends JpaRepository<UserChatRoom, Long> {
    /** UserChatRoom 목록조회 - User 검색 */
    List<UserChatRoom> findAllByUser(User user, Sort sort);
    Page<UserChatRoom> findAllByUser(User user, Pageable pageable);

    /** UserChatRoom 목록조회 - ChatRoom 검색 */
    List<UserChatRoom> findAllByChatRoom(ChatRoom chatRoom, Sort sort);
    Page<UserChatRoom> findAllByChatRoom(ChatRoom chatRoom, Pageable pageable);
}
