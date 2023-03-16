package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.ChatMessage;
import com.shyd.healthcare.domain.ChatRoom;
import com.shyd.healthcare.dto.livechat.ChatMessageRequestDto;
import com.shyd.healthcare.dto.livechat.ChatMessageResponseDto;
import com.shyd.healthcare.repository.ChatMessageRepository;
import com.shyd.healthcare.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatMessageService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    /** 고객지원 LiveChat 조회 */
    @Transactional
    public List<ChatMessageResponseDto> findAllByChatRoomId(final Long id) {
        ChatRoom chatRoomEntity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChatRoom이 존재하지 않습니다. id = " + id));
        List<ChatMessage> chatMessageList = chatRoomEntity.getChatMessageList();
        return chatMessageList.stream().map(ChatMessageResponseDto::new).collect(Collectors.toList());
    }

    /** 고객지원 LiveChat 저장 */
    @Transactional
    public Long save(final Long chatRoomId, final ChatMessageRequestDto requestDto) {
        ChatRoom chatRoomEntity = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChatRoom이 존재하지 않습니다. id = " + chatRoomId));
        requestDto.setChatRoom(chatRoomEntity);
        return this.chatMessageRepository.save(requestDto.toEntity()).getId();
    }

    /** 고객지원 LiveChat 삭제 */
    @Transactional
    public Long delete(final Long chatMessageId) {
        ChatMessage chatMessageEntity = this.chatMessageRepository.findById(chatMessageId).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChatMessage가 존재하지 않습니다. id = " + chatMessageId));
        this.chatMessageRepository.delete(chatMessageEntity);
        return chatMessageId;
    }
}
