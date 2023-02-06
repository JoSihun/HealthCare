package com.shyd.healthcare.dto;

import com.shyd.healthcare.domain.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostCreateRequestDto {
    private Integer hits;
    private String title;
    private String content;
    private String author;
    private Boolean secretYn;

    @Builder
    public PostCreateRequestDto(Integer hits, Boolean secretYn,
                                String title, String content, String author) {
        this.hits = hits;
        this.title = title;
        this.content = content;
        this.author = author;
        this.secretYn = secretYn;
    }

    public Post toEntity() {
        return Post.builder()
                .hits(hits)
                .title(title)
                .content(content)
                .author(author)
                .secretYn(secretYn)
                .build();
    }

}
