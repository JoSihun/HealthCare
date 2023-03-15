package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.websocket.WebSocketChatMessageDto;
import com.shyd.healthcare.dto.websocket.WebSocketChatRoomDto;
import com.shyd.healthcare.service.WebSocketChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class WebSocketChatController {
    private final WebSocketChatService webSocketChatService;
    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/chat")
    public void receiveMessage(@Payload WebSocketChatMessageDto messageDto) {
        System.out.println("DEBUGGING POINT 1: messageDto.getRoomId() = " + messageDto.getRoomId());
        System.out.println("DEBUGGING POINT 2: messageDto.getSender() = " + messageDto.getSender());
        System.out.println("DEBUGGING POINT 3: messageDto.getMessage() = " + messageDto.getMessage());
        sendingOperations.convertAndSend("/sub/chat", messageDto);
    }
}
