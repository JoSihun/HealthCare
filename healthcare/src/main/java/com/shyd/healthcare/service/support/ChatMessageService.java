package com.shyd.healthcare.service.support;

import com.shyd.healthcare.domain.support.livechat.ChatMessage;
import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import com.shyd.healthcare.dto.support.livechat.ChatMessageRequestDto;
import com.shyd.healthcare.dto.support.livechat.ChatMessageResponseDto;
import com.shyd.healthcare.repository.support.ChatMessageRepository;
import com.shyd.healthcare.repository.support.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatMessageService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    /** 특정 채팅방 LiveChat Message 목록조회 - 작성순, Id 검색, List */
    @Transactional
    public List<ChatMessageResponseDto> findAllByChatRoomIdAsc(final Long chatRoomId) {
        ChatRoom chatRoomEntity = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChat Room이 존재하지 않습니다. id = " + chatRoomId));
        // 테스트 필요
        // Sort sort = Sort.by(Sort.Direction.ASC, "id");
        // List<ChatMessage> chatMessageList = this.chatMessageRepository.findAllByChatRoom(chatRoomEntity, sort);
        List<ChatMessage> chatMessageList = chatRoomEntity.getChatMessageList();
        return chatMessageList.stream().map(ChatMessageResponseDto::new).collect(Collectors.toList());
    }

    /** 특정 채팅방 LiveChat Message 목록조회 - 최신순, Id 검색, List */
    @Transactional
    public List<ChatMessageResponseDto> findAllByChatRoomIdDesc(final Long chatRoomId) {
        ChatRoom chatRoomEntity = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChat Room이 존재하지 않습니다. id = " + chatRoomId));
        // 테스트 필요
        // Sort sort = Sort.by(Sort.Direction.DESC, "id");
        // List<ChatMessage> chatMessageList = this.chatMessageRepository.findAllByChatRoom(chatRoomEntity, sort);
        List<ChatMessage> chatMessageList = chatRoomEntity.getChatMessageList();
        Collections.sort(chatMessageList, Collections.reverseOrder());
        return chatMessageList.stream().map(ChatMessageResponseDto::new).collect(Collectors.toList());
    }

    /** 특정 채팅방 LiveChat Message 목록조회 - 작성순, Uuid 검색, List */
    @Transactional
    public List<ChatMessageResponseDto> findAllByChatRoomUuidAsc(final String chatRoomUuid) {
        ChatRoom chatRoomEntity = this.chatRoomRepository.findByUuid(chatRoomUuid);
        List<ChatMessage> chatMessageList = chatRoomEntity.getChatMessageList();
        return chatMessageList.stream().map(ChatMessageResponseDto::new).collect(Collectors.toList());
    }

    /** 특정 채팅방 LiveChat Message 목록조회 - 최신순, Uuid 검색, List */
    @Transactional
    public List<ChatMessageResponseDto> findAllByChatRoomUuidDesc(final String chatRoomUuid) {
        ChatRoom chatRoomEntity = this.chatRoomRepository.findByUuid(chatRoomUuid);
        List<ChatMessage> chatMessageList = chatRoomEntity.getChatMessageList();
        Collections.sort(chatMessageList, Collections.reverseOrder());
        return chatMessageList.stream().map(ChatMessageResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** LiveChat Message 조회 */
    @Transactional
    public ChatMessageResponseDto findById(final Long id) {
        ChatMessage entity = this.chatMessageRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChat Message가 존재하지 않습니다. id = " + id));
        return new ChatMessageResponseDto(entity);
    }

    /** LiveChat Message 생성 */
    @Transactional
    public Long save(final Long chatRoomId, final ChatMessageRequestDto requestDto) {
        ChatRoom chatRoomEntity = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChat Room이 존재하지 않습니다. id = " + chatRoomId));
        requestDto.setChatRoom(chatRoomEntity);
        return this.chatMessageRepository.save(requestDto.toEntity()).getId();
    }

    /** LiveChat Message 삭제 */
    @Transactional
    public void delete(final Long id) {
        ChatMessage entity = this.chatMessageRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChat Message가 존재하지 않습니다. id = " + id));
        this.chatMessageRepository.delete(entity);
    }
}
