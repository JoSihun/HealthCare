package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import com.shyd.healthcare.domain.support.livechat.UserChatRoom;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChatRoomRequestDTO {
    private User user;
    private ChatRoom chatRoom;

    public UserChatRoom toEntity() {
        return UserChatRoom.builder()
                .user(this.user)
                .chatRoom(this.chatRoom)
                .build();
    }
}
