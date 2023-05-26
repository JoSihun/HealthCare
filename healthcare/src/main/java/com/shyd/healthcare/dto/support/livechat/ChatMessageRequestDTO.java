package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.ChatMessage;
import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageRequestDTO {
    private User sender;
    private String message;
    private ChatRoom chatRoom;

    public ChatMessage toEntity() {
        return ChatMessage.builder()
                .sender(this.sender)
                .message(this.message)
                .chatRoom(this.chatRoom)
                .build();
    }
}
