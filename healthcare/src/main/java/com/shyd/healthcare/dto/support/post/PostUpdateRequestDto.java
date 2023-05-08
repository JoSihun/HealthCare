package com.shyd.healthcare.dto.support.post;

import com.shyd.healthcare.domain.support.board.Post;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostUpdateRequestDTO {
    private String title;
    private String content;
    private Boolean secretYn;
    private Boolean answerYn;

    public Post toEntity() {
        return Post.builder()
                .title(this.title)
                .content(this.content)
                .secretYn(this.secretYn)
                .answerYn(this.answerYn)
                .build();
    }
}
