package com.shyd.healthcare.domain.support.livechat;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.dto.support.livechat.ChatRoomRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uuid;
    private Boolean answerYn;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    private Set<ChatMessage> chatMessages;
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    private Set<UserChatRoom> userChatRooms;

    public Long update(ChatRoomRequestDTO requestDto) {
        this.uuid = requestDto.getUuid();
        this.answerYn = requestDto.getAnswerYn();
        return this.id;
    }
}
