package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomRequestDTO {
    private String uuid = UUID.randomUUID().toString();
    private Boolean answerYn = false;

    public ChatRoom toEntity() {
        return ChatRoom.builder()
                .uuid(this.uuid)
                .answerYn(this.answerYn)
                .build();
    }
}
