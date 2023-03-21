package com.shyd.healthcare.dto.websocket;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class WebSocketChatMessageDto {
    private String roomId;
    private String sender;
    private String message;
}
