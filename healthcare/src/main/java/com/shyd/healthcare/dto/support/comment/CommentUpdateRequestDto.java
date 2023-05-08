package com.shyd.healthcare.dto.support.comment;

import com.shyd.healthcare.domain.support.board.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentUpdateRequestDTO {
    private String content;
    private Boolean secretYn;

    public Comment toEntity() {
        return Comment.builder()
                .content(this.content)
                .secretYn(this.secretYn)
                .build();
    }
}
