package com.shyd.healthcare.dto.support.post;

import com.shyd.healthcare.domain.support.board.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostUpdateRequestDto {
    private String title;
    private String content;
    private Boolean secretYn;
    private Boolean answerYn;

    @Builder
    public PostUpdateRequestDto(String title, String content, Boolean secretYn, Boolean answerYn) {
        this.title = title;
        this.content = content;
        this.secretYn = secretYn;
        this.answerYn = answerYn;
    }

    public Post toEntity() {
        return Post.builder()
                .title(this.title)
                .content(this.content)
                .secretYn(this.secretYn)
                .answerYn(this.answerYn)
                .build();
    }
}
