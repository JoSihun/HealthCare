package com.shyd.healthcare.dto.websocket;

import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
public class WebSocketChatRoomDto {
    private String roomId;
    private Set<WebSocketSession> sessions;

    public WebSocketChatRoomDto() {
        this.roomId = UUID.randomUUID().toString();
        this.sessions = new HashSet<>();
    }
}
