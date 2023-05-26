package com.shyd.healthcare.dto.support.post;

import com.shyd.healthcare.domain.support.board.BoardType;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostSaveRequestDTO {
    private User author;
    private String title;
    private String content;
    private BoardType boardType;
    private Integer hits = 0;
    private Boolean secretYn = false;
    private Boolean answerYn = false;

    public Post toEntity() {
        return Post.builder()
                .hits(this.hits)
                .title(this.title)
                .author(this.author)
                .content(this.content)
                .secretYn(this.secretYn)
                .answerYn(this.answerYn)
                .boardType(this.boardType)
                .build();
    }
}
