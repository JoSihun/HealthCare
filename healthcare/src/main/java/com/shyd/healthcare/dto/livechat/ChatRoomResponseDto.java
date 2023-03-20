package com.shyd.healthcare.dto.livechat;

import com.shyd.healthcare.domain.ChatRoom;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class ChatRoomResponseDto {
    private Long id;
    private String uuid;
    private String roomName;
    private Boolean answerYn;
    private String createdDate;
    private String updatedDate;

    public ChatRoomResponseDto(ChatRoom entity) {
        this.id = entity.getId();
        this.uuid = entity.getUuid();
        this.roomName = entity.getRoomName();
        this.answerYn = entity.getAnswerYn();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
