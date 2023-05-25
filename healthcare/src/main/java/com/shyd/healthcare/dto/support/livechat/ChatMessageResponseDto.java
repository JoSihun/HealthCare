package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.ChatMessage;
import com.shyd.healthcare.dto.user.UserResponseDto;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageResponseDTO {
    private Long id;
    private String message;
    private UserResponseDto sender;
    private ChatRoomResponseDTO chatRoom;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public ChatMessageResponseDTO(ChatMessage entity) {
        this.id = entity.getId();
        this.message = entity.getMessage();
        this.createdDate = entity.getCreatedDate();
        this.updatedDate = entity.getUpdatedDate();
        this.sender = new UserResponseDto(entity.getSender());
        this.chatRoom = new ChatRoomResponseDTO(entity.getChatRoom());
    }
}
