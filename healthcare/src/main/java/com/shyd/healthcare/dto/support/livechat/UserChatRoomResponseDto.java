package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.UserChatRoom;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class UserChatRoomResponseDto {
    private Long id;
    private String createdDate;
    private String updatedDate;

    public UserChatRoomResponseDto(UserChatRoom entity) {
        this.id = entity.getId();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
