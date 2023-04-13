package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.support.livechat.ChatMessageRequestDto;
import com.shyd.healthcare.dto.support.livechat.ChatMessageResponseDto;
import com.shyd.healthcare.dto.support.livechat.ChatRoomResponseDto;
import com.shyd.healthcare.service.support.ChatMessageService;
import com.shyd.healthcare.service.support.ChatRoomService;
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
            Long chatMessageId = this.chatMessageService.save(chatRoomId, requestDto);
            ChatMessageResponseDto chatMessageResponseDto = this.chatMessageService.findById(chatMessageId);

            String subscribeChannel = "/sub/chat/" + chatMessageResponseDto.getSender();
            sendingOperations.convertAndSend(subscribeChannel, chatMessageResponseDto);
        } else {
            Long chatRoomId = this.chatRoomService.findByUuid(requestDto.getRoomUuid()).getId();
            Long chatMessageId = this.chatMessageService.save(chatRoomId, requestDto);
            ChatMessageResponseDto chatMessageResponseDto = this.chatMessageService.findById(chatMessageId);

            String subscribeChannel = "/sub/chat/" + chatMessageResponseDto.getRoomUuid();
            sendingOperations.convertAndSend(subscribeChannel, chatMessageResponseDto);
        }
    }

    @MessageMapping("/chat/create")
    public void receiveNewMessage(@Payload ChatMessageRequestDto requestDto) {
        Long chatRoomId = this.chatRoomService.findByUuid(requestDto.getRoomUuid()).getId();
        Long chatMessageId = this.chatMessageService.save(chatRoomId, requestDto);
        ChatRoomResponseDto chatRoomResponseDto = this.chatRoomService.findById(chatRoomId);
        ChatMessageResponseDto chatMessageResponseDto = this.chatMessageService.findById(chatMessageId);

        String subscribeChannel = "/sub/chat/" + chatRoomResponseDto.getUuid();
        sendingOperations.convertAndSend(subscribeChannel, chatMessageResponseDto);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 특정 채팅방 LiveChat Message 목록조회 - Id 검색 */
    @GetMapping("/api/v1/livechat/message/{id}")
    public List<ChatMessageResponseDto> readChatMessageList(@PathVariable Long id) {
        return this.chatMessageService.findAllByChatRoomIdAsc(id);
    }

    /** 특정 채팅방 LiveChat Message 목록조회 - Uuid 검색 */
    @GetMapping("/api/v1/livechat/message")
    public List<ChatMessageResponseDto> readChatMessageList(@RequestParam(value = "uuid") String chatRoomUuid) {
        // 아마도 최초 연결 지점, 여기까지 수정했음
        return this.chatMessageService.findAllByChatRoomUuidAsc(chatRoomUuid);
    }
}
