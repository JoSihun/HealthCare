package com.shyd.healthcare.dto.livechat;

import com.shyd.healthcare.domain.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomRequestDto {
    private String roomId;
    private String roomName;

    @Builder
    public ChatRoomRequestDto(String roomId, String roomName) {
        this.roomId = roomId;
        this.roomName = roomName;
    }

    public ChatRoom toEntity() {
        return ChatRoom.builder()
                .roomId(this.roomId)
                .roomName(this.roomName)
                .build();
    }
}
