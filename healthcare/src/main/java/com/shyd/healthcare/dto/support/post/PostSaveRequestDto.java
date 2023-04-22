package com.shyd.healthcare.dto.support.post;

import com.shyd.healthcare.domain.support.board.Category;
import com.shyd.healthcare.domain.support.board.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostSaveRequestDto {
    private Integer hits;
    private String title;
    private String author;
    private String content;
    private String category;
    private Boolean secretYn;
    private Boolean answerYn;

    @Builder
    public PostSaveRequestDto(String title, String content, String author, String category,
                              Integer hits, Boolean secretYn, Boolean answerYn) {
        this.hits = hits;
        this.title = title;
        this.author = author;
        this.content = content;
        this.category = category;
        this.secretYn = secretYn;
        this.answerYn = answerYn;
    }

    public Post toEntity() {
        return Post.builder()
                .hits(this.hits)
                .title(this.title)
                .author(this.author)
                .content(this.content)
                .category(this.category)
                .secretYn(this.secretYn)
                .answerYn(this.answerYn)
                .build();
    }
}