package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.ChatMessage;
import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequestDto {
    private String sender;
    private String message;
    private String roomUuid;
    private ChatRoom chatRoom;

    @Builder
    public ChatMessageRequestDto(String roomUuid, String sender, String message, ChatRoom chatRoom) {
        this.sender = sender;
        this.message = message;
        this.roomUuid = roomUuid;
        this.chatRoom = chatRoom;
    }

    public ChatMessage toEntity() {
        return ChatMessage.builder()
                .sender(this.sender)
                .message(this.message)
                .roomUuid(this.roomUuid)
                .chatRoom(this.chatRoom)
                .build();
    }
}
