package com.shyd.healthcare.dto.livechat;

import com.shyd.healthcare.domain.ChatMessage;
import com.shyd.healthcare.domain.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequestDto {
    private String roomId;
    private String sender;
    private String message;
    private ChatRoom chatRoom;

    @Builder
    public ChatMessageRequestDto(String roomId, String sender, String message, ChatRoom chatRoom) {
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
        this.chatRoom = chatRoom;
    }

    public ChatMessage toEntity() {
        return ChatMessage.builder()
                .roomId(this.roomId)
                .sender(this.sender)
                .message(this.message)
                .chatRoom(this.chatRoom)
                .build();
    }
}
