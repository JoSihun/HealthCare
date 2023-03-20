package com.shyd.healthcare.dto.livechat;

import com.shyd.healthcare.domain.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomRequestDto {
    private String uuid;        // REQUEST라서 필요 없을 수도 있음
    private String roomName;
    private Boolean answerYn;


    @Builder
    public ChatRoomRequestDto(String uuid, String roomName, Boolean answerYn) {
        this.uuid = uuid;
        this.roomName = roomName;
        this.answerYn = answerYn;
    }

    public ChatRoom toEntity() {
        return ChatRoom.builder()
                .uuid(this.uuid)
                .roomName(this.roomName)
                .answerYn(this.answerYn)
                .build();
    }
}
