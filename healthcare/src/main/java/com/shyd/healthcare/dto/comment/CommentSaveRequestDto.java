package com.shyd.healthcare.dto.comment;

import com.shyd.healthcare.domain.Comment;
import com.shyd.healthcare.domain.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentSaveRequestDto {
    private Post post;
    private String author;
    private String content;
    private Boolean secretYn;

    @Builder
    public CommentSaveRequestDto(String author, String content, Boolean secretYn, Post post) {
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
