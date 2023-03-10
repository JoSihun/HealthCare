package com.shyd.healthcare.dto.post;

import com.shyd.healthcare.domain.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostUpdateRequestDto {
    private String title;
    private String content;
    private Boolean secretYn;

    @Builder
    public PostUpdateRequestDto(String title, String content, Boolean secretYn) {
        this.title = title;
        this.content = content;
        this.secretYn = secretYn;
    }

    public Post toEntity() {
        return Post.builder()
                .title(title)
                .content(content)
                .secretYn(secretYn)
                .build();
    }
}
