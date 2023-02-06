package com.shyd.healthcare.dto;

import com.shyd.healthcare.domain.Post;
import lombok.Getter;

import javax.persistence.Column;
import java.time.format.DateTimeFormatter;

@Getter
public class PostResponseDto {
    private Long id;
    private Integer hits;
    private String title;
    private String content;
    private String author;
    private Boolean secretYn;
    private String createdDate;
    private String updatedDate;

    public PostResponseDto(Post entity) {
        this.id = entity.getId();
        this.hits = entity.getHits();

        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
        this.secretYn = entity.getSecretYn();

        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
