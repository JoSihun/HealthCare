package com.shyd.healthcare.dto.livechat;

import com.shyd.healthcare.domain.ChatMessage;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class ChatMessageResponseDto {
    private Long id;
    private String roomId;
    private String sender;
    private String message;
    private String createdDate;
    private String updatedDate;

    public ChatMessageResponseDto(ChatMessage entity) {
        this.id = entity.getId();
        this.roomId = entity.getRoomId();
        this.sender = entity.getSender();
        this.message = entity.getMessage();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
