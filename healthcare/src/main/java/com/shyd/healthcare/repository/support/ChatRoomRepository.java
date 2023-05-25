package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    /** ChatRoom 조회 - Uuid 검색 */
    ChatRoom findByUuid(String uuid);

    /** ChatRoom 목록조회 - 답변여부 검색 */
    List<ChatRoom> findAllByAnswerYn(Boolean answerYn, Sort sort);
    Page<ChatRoom> findAllByAnswerYn(Boolean answerYn, Pageable pageable);
}
