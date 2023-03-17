package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.livechat.ChatMessageRequestDto;
import com.shyd.healthcare.service.ChatMessageService;
import com.shyd.healthcare.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class LiveChatRestController {
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/chat")
    public void receiveMessage(@Payload ChatMessageRequestDto requestDto) {
        sendingOperations.convertAndSend("/sub/chat", requestDto);
    }

    @MessageMapping("/chat/temp")
    public void receiveMessageTest(@Payload ChatMessageRequestDto requestDto) {
        sendingOperations.convertAndSend("/sub/chat/" + requestDto.getRoomId(), requestDto);
    }
}
