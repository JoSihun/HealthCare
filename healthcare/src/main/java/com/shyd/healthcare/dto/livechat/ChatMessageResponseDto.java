package com.shyd.healthcare.dto.livechat;

import com.shyd.healthcare.domain.ChatMessage;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class ChatMessageResponseDto {
    private Long id;
    private String sender;
    private String message;
    private String roomUuid;
    private String createdDate;
    private String updatedDate;

    public ChatMessageResponseDto(ChatMessage entity) {
        this.id = entity.getId();
        this.sender = entity.getSender();
        this.message = entity.getMessage();
        this.roomUuid = entity.getRoomUuid();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
