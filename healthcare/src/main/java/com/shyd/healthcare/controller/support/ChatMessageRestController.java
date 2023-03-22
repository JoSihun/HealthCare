package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.livechat.ChatMessageRequestDto;
import com.shyd.healthcare.dto.livechat.ChatMessageResponseDto;
import com.shyd.healthcare.dto.livechat.ChatRoomRequestDto;
import com.shyd.healthcare.dto.livechat.ChatRoomResponseDto;
import com.shyd.healthcare.service.ChatMessageService;
import com.shyd.healthcare.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class ChatMessageRestController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations sendingOperations;

    /** WebSocket Controller 기본 양식 */
//    @MessageMapping("/chat")
//    public void receiveMessage(@Payload ChatMessageRequestDto requestDto) {
//        sendingOperations.convertAndSend("/sub/chat", requestDto);
//    }

    @MessageMapping("/chat")                // subscribe, publish url
    public void receiveMessage(@Payload ChatMessageRequestDto requestDto) {
        if (requestDto.getRoomUuid() == null) {
            Long chatRoomId = this.chatRoomService.create(requestDto.getSender());
            ChatRoomResponseDto chatRoomResponseDto = this.chatRoomService.findById(chatRoomId);
            requestDto.setRoomUuid(chatRoomResponseDto.getUuid());
        }
        Long chatRoomId = this.chatRoomService.findByUuid(requestDto.getRoomUuid()).getId();
        Long chatMessageId = this.chatMessageService.save(chatRoomId, requestDto);
        ChatRoomResponseDto chatRoomResponseDto = this.chatRoomService.findById(chatRoomId);
        ChatMessageResponseDto chatMessageResponseDto = this.chatMessageService.findById(chatMessageId);

        // Front 를 고려하여 좀 더 적합한 Subscribe Channel 선택필요
        String subscribeChannel = "/sub/chat/" + chatRoomResponseDto.getRoomName();
        sendingOperations.convertAndSend(subscribeChannel, chatMessageResponseDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 특정 채팅방 LiveChat Message 목록조회 - Id 검색 */
    @GetMapping("/api/livechat/message/{id}")
    public List<ChatMessageResponseDto> readChatMessageList(@PathVariable Long id) {
        return this.chatMessageService.findAllByChatRoomIdAsc(id);
    }

    /** 특정 채팅방 LiveChat Message 목록조회 - Uuid 검색 */
    @GetMapping("/api/livechat/message")
    public List<ChatMessageResponseDto> readChatMessageList(@RequestParam(value = "uuid") String chatRoomUuid) {
        // 아마도 최초 연결 지점, 여기까지 수정했음
        return this.chatMessageService.findAllByChatRoomUuidAsc(chatRoomUuid);
    }
}
