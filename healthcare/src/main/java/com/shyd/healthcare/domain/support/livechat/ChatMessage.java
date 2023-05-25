package com.shyd.healthcare.domain.support.livechat;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.livechat.ChatMessageRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    private User sender;
    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom;

    public Long update(ChatMessageRequestDTO requestDto) {
        this.message = requestDto.getMessage();
        return this.id;
    }
}
