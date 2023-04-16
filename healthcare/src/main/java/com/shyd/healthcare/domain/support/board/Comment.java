package com.shyd.healthcare.domain.support.board;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.dto.support.comment.CommentUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Comment extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String author;
    private String content;
    private Boolean secretYn;

    @ManyToOne
    private Post post;

    @Builder
    public Comment(String content, String author, Boolean secretYn, Post post) {
        this.post = post;
        this.author = author;
        this.content = content;
        this.secretYn = secretYn;
    }

    public Long update(CommentUpdateRequestDto requestDto) {
        this.content = requestDto.getContent();
        this.secretYn = requestDto.getSecretYn();
        return this.id;
    }
}
