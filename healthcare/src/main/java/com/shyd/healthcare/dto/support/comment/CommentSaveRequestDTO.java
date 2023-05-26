package com.shyd.healthcare.dto.support.comment;

import com.shyd.healthcare.domain.support.board.Comment;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentSaveRequestDTO {
    private Post post;
    private User author;
    private String content;
    private Boolean secretYn;

    public Comment toEntity() {
        return Comment.builder()
                .post(this.post)
                .author(this.author)
                .content(this.content)
                .secretYn(this.secretYn)
                .build();
    }
}
