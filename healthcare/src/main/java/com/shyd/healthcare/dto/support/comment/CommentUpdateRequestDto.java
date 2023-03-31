package com.shyd.healthcare.dto.support.comment;

import com.shyd.healthcare.domain.support.board.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentUpdateRequestDto {
    private String content;
    private Boolean secretYn;

    @Builder
    public CommentUpdateRequestDto(String content, Boolean secretYn) {
        this.content = content;
        this.secretYn = secretYn;
    }

    public Comment toEntity() {
        return Comment.builder()
                .content(this.content)
                .secretYn(this.secretYn)
                .build();
    }
}
