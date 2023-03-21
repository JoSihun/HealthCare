package com.shyd.healthcare.domain;

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
    private String roomId;
    private String sender;
    private String message;

    @ManyToOne
    private ChatRoom chatRoom;

    @Builder
    public ChatMessage(String roomId, String sender, String message, ChatRoom chatRoom) {
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
        this.chatRoom = chatRoom;
    }
}
