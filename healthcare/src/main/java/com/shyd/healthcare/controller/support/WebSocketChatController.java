package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.websocket.WebSocketChatMessageDto;
import com.shyd.healthcare.dto.websocket.WebSocketChatRoomDto;
import com.shyd.healthcare.service.WebSocketChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
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

    @MessageMapping("/support/livechat")
    public void message(WebSocketChatMessageDto messageDto) {
        sendingOperations.convertAndSend("/sub/chat/room" + messageDto.getRoomId(), messageDto);
    }
}
