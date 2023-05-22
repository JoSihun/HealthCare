package com.shyd.healthcare.service.support;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.domain.support.livechat.ChatMessage;
import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.livechat.ChatMessageRequestDTO;
import com.shyd.healthcare.dto.support.livechat.ChatMessageResponseDTO;
import com.shyd.healthcare.repository.support.ChatMessageRepository;
import com.shyd.healthcare.repository.support.ChatRoomRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    /** ChatMessage 목록조회 - 특정 ChatRoom id 검색, List */
    @Transactional
    public List<ChatMessageResponseDTO> findAllByChatRoomId(Long chatRoomId, String sortOption) {
        ChatRoom chatRoom = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다. chatRoom_id = " + chatRoomId));
        List<ChatMessage> chatMessages = new ArrayList<>(chatRoom.getChatMessages());
        chatMessages.sort(Comparator.comparingLong(ChatMessage::getId));
        if (sortOption.equalsIgnoreCase("desc")) {
            chatMessages.sort(Comparator.comparingLong(ChatMessage::getId).reversed());
        }
        return chatMessages.stream().map(ChatMessageResponseDTO::new).collect(Collectors.toList());
    }

    /** ChatMessage 목록조회 - 특정 ChatRoom uuid 검색, List */
    @Transactional
    public List<ChatMessageResponseDTO> findAllByChatRoomUuid(String chatRoomUuid, String sortOption) {
        ChatRoom chatRoom = this.chatRoomRepository.findByUuid(chatRoomUuid);
        List<ChatMessage> chatMessages = new ArrayList<>(chatRoom.getChatMessages());
        chatMessages.sort(Comparator.comparingLong(ChatMessage::getId));
        if (sortOption.equalsIgnoreCase("desc")) {
            chatMessages.sort(Comparator.comparingLong(ChatMessage::getId).reversed());
        }
        return chatMessages.stream().map(ChatMessageResponseDTO::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** ChatMessage 조회 */
    @Transactional
    public ChatMessageResponseDTO findById(Long id) {
        ChatMessage chatMessage = this.chatMessageRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅 메세지를 찾을 수 없습니다. chatMessage_id = " + id));
        return new ChatMessageResponseDTO(chatMessage);
    }

    /** ChatMessage 생성 */
    @Transactional
    public Long create(String accessToken, Long chatRoomId, ChatMessageRequestDTO requestDTO) {
        Long userId = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        ChatRoom chatRoom = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다. chatRoom_id = " + chatRoomId));
        requestDTO.setSender(user);
        requestDTO.setChatRoom(chatRoom);
        return this.chatMessageRepository.save(requestDTO.toEntity()).getId();
    }

    /** ChatMessage 수정 */
    @Transactional
    public Long update(Long id, ChatMessageRequestDTO requestDTO) {
        ChatMessage chatMessage = this.chatMessageRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅 메세지를 찾을 수 없습니다. chatMessage_id = " + id));
        return chatMessage.update(requestDTO);
    }

    /** ChatMessage 삭제 */
    @Transactional
    public void delete(Long id) {
        ChatMessage chatMessage = this.chatMessageRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅 메세지를 찾을 수 없습니다. chatMessage_id = " + id));
        this.chatMessageRepository.delete(chatMessage);
    }
}
