package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.livechat.ChatMessage;
import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    /** ChatMessage 목록조회 - ChatRoom 검색, List */
    List<ChatMessage> findAllByChatRoom(ChatRoom chatRoom, Sort sort);
    /** ChatMessage 목록조회 - ChatRoom 검색, Page */
    Page<ChatMessage> findAllByChatRoom(ChatRoom chatRoom, Pageable pageable);

    /** ChatMessage 검색조회 - Message 검색, List */
    List<ChatMessage> findAllByMessageContaining(String message, Sort sort);
    /** ChatMessage 검색조회 - Message 검색, Page */
    Page<ChatMessage> findAllByMessageContaining(String message, Pageable pageable);
}
