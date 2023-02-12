package com.shyd.healthcare.dto;

import com.shyd.healthcare.domain.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostSaveRequestDto {
    private Integer hits;
    private String title;
    private String content;
    private String author;
    private String category;
    private Boolean secretYn;

    @Builder
    public PostSaveRequestDto(String title, String content, String author,
                              Integer hits, String category, Boolean secretYn) {
        this.hits = hits;
        this.title = title;
        this.content = content;
        this.author = author;
        this.category = category;
        this.secretYn = secretYn;
    }

    public Post toEntity() {
        return Post.builder()
                .hits(hits)
                .title(title)
                .content(content)
                .author(author)
                .category(category)
                .secretYn(secretYn)
                .build();
    }

}
