package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import com.shyd.healthcare.domain.support.livechat.UserChatRoom;
import com.shyd.healthcare.dto.user.UserResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomResponseDTO {
    private Long id;
    private String uuid;
    private Boolean answerYn;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Set<UserResponseDto> users;

    public ChatRoomResponseDTO(ChatRoom entity) {
        this.id = entity.getId();
        this.uuid = entity.getUuid();
        this.answerYn = entity.getAnswerYn();
        this.createdDate = entity.getCreatedDate();
        this.updatedDate = entity.getUpdatedDate();
        this.users = entity.getUserChatRooms().stream()
                .map(UserChatRoom::getUser)
                .map(UserResponseDto::new)
                .collect(Collectors.toSet());
    }
}
