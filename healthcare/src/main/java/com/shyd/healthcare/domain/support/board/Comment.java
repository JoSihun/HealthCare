package com.shyd.healthcare.domain.support.board;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.comment.CommentUpdateRequestDTO;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    @Builder.Default
    private Boolean secretYn = false;

    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;
    @ManyToOne(fetch = FetchType.LAZY)
    private User author;

    public Long update(CommentUpdateRequestDTO requestDto) {
        this.content = requestDto.getContent();
        this.secretYn = requestDto.getSecretYn();
        return this.id;
    }
}
