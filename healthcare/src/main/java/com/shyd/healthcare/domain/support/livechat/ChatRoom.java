package com.shyd.healthcare.domain.support.livechat;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.dto.support.livechat.ChatRoomRequestDto;
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

    public Long update(ChatRoomRequestDto requestDto) {
        this.uuid = requestDto.getUuid();
        this.roomName = requestDto.getRoomName();
        this.answerYn = requestDto.getAnswerYn();
        return this.id;
    }
}
