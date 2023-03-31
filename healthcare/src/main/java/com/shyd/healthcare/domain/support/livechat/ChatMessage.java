package com.shyd.healthcare.domain.support.livechat;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class ChatMessage extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sender;
    private String message;
    private String roomUuid;

    @ManyToOne
    private ChatRoom chatRoom;

    @Builder
    public ChatMessage(String roomUuid, String sender, String message, ChatRoom chatRoom) {
        this.sender = sender;
        this.message = message;
        this.roomUuid = roomUuid;
        this.chatRoom = chatRoom;
    }
}
