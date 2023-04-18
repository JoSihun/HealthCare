package com.shyd.healthcare.dto.support.comment;

import com.shyd.healthcare.domain.support.board.Comment;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentSaveRequestDto {
    private Post post;
    private User author;
    private String content;
    private Boolean secretYn;

    @Builder
    public CommentSaveRequestDto(User author, String content, Boolean secretYn, Post post) {
        this.post = post;
        this.author = author;
        this.content = content;
        this.secretYn = secretYn;
    }

    public Comment toEntity() {
        return Comment.builder()
                .post(this.post)
                .author(this.author)
                .content(this.content)
                .secretYn(this.secretYn)
                .build();
    }
}
