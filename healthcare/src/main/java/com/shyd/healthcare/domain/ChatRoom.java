package com.shyd.healthcare.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity
public class ChatRoom extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uuid;
    private String roomName;
    private Boolean answerYn;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    private List<ChatMessage> chatMessageList;

    /* 추후 User Table 추가되면 사용
     * @ManyToOne
     * private User user; */

    @Builder
    public ChatRoom(String uuid, String roomName, Boolean answerYn) {
        this.uuid = uuid;
        this.roomName = roomName;
        this.answerYn = answerYn;
    }
}
