package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.livechat.ChatMessageRequestDto;
import com.shyd.healthcare.dto.livechat.ChatMessageResponseDto;
import com.shyd.healthcare.dto.livechat.ChatRoomRequestDto;
import com.shyd.healthcare.service.ChatMessageService;
import com.shyd.healthcare.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ChatMessageRestController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/chat")
    public void receiveMessage(@Payload ChatMessageRequestDto requestDto) {
        sendingOperations.convertAndSend("/sub/chat", requestDto);
    }

    @MessageMapping("/chat/temp")
    public void receiveMessageTest(@Payload ChatMessageRequestDto requestDto) {
        // Front 에서 Publish 할 때마다 실행됨, 잘 생각하고 save 할 것
        // 최초실행시 roomId, roomName, answerYn 초기화 필요
        if (requestDto.getRoomUuid() == null) {
            // Greeting 검색해서 최초 실행 시 room 생성 및 환영인사메세지 보내기 구현필요
            ChatRoomRequestDto chatRoomRequestDto = new ChatRoomRequestDto();
            ChatMessageRequestDto chatMessageRequestDto = new ChatMessageRequestDto();
            Long chatRoomId = this.chatRoomService.save(chatRoomRequestDto);
            this.chatMessageService.save(chatRoomId, chatMessageRequestDto);
        }
        sendingOperations.convertAndSend("/sub/chat/" + requestDto.getRoomUuid(), requestDto);
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
