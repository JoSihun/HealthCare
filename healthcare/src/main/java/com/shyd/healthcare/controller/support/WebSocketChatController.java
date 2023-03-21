package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.websocket.WebSocketChatMessageDto;
import com.shyd.healthcare.service.WebSocketChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class WebSocketChatController {
    private final WebSocketChatService webSocketChatService;
    private final SimpMessageSendingOperations sendingOperations;

//    @MessageMapping("/chat")
//    public void receiveMessage(@Payload WebSocketChatMessageDto messageDto) {
//        sendingOperations.convertAndSend("/sub/chat", messageDto);
//    }
}
