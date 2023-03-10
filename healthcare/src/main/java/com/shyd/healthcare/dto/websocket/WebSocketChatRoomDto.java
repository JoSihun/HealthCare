package com.shyd.healthcare.dto.websocket;

import com.shyd.healthcare.service.WebSocketChatService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
public class WebSocketChatRoomDto {
    private String roomId;
    private String roomName;
    private Set<WebSocketSession> sessions = new HashSet<>();

    public static WebSocketChatRoomDto create(String roomName) {
        WebSocketChatRoomDto chatRoomDto = new WebSocketChatRoomDto();
        chatRoomDto.roomId = UUID.randomUUID().toString();
        chatRoomDto.roomName = roomName;
        return chatRoomDto;
    }

}
