package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.UserChatRoom;
import com.shyd.healthcare.dto.user.UserResponseDto;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChatRoomResponseDTO {
    private Long id;
    private UserResponseDto user;
    private ChatRoomResponseDTO chatRoom;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public UserChatRoomResponseDTO(UserChatRoom entity) {
        this.id = entity.getId();
        this.createdDate = entity.getCreatedDate();
        this.updatedDate = entity.getUpdatedDate();
        this.user = new UserResponseDto(entity.getUser());
        this.chatRoom = new ChatRoomResponseDTO(entity.getChatRoom());
    }
}
