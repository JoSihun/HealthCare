package com.shyd.healthcare.dto.support.livechat;

import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import com.shyd.healthcare.domain.support.livechat.UserChatRoom;
import com.shyd.healthcare.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserChatRoomRequestDto {
    private User user;
    private ChatRoom chatRoom;

    @Builder
    public UserChatRoomRequestDto(User user, ChatRoom chatRoom) {
        this.user = user;
        this.chatRoom = chatRoom;
    }

    public UserChatRoom toEntity() {
        return UserChatRoom.builder()
                .chatRoom(this.chatRoom)
                .user(this.user)
                .build();
    }
}
