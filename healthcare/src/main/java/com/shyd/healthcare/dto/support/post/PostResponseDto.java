package com.shyd.healthcare.dto.support.post;

import com.shyd.healthcare.domain.support.board.Post;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class PostResponseDto {
    private Long id;
    private Integer hits;
    private String title;
    private String author;
    private String content;
    private String category;
    private Boolean secretYn;
    private Boolean answerYn;
    private String createdDate;
    private String updatedDate;

    public PostResponseDto(Post entity) {
        this.id = entity.getId();
        this.hits = entity.getHits();

        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.content = entity.getContent();
        this.category = entity.getCategory();

        this.secretYn = entity.getSecretYn();
        this.answerYn = entity.getAnswerYn();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
