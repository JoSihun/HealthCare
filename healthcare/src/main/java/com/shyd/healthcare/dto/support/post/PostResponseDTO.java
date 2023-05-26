package com.shyd.healthcare.dto.support.post;

import com.shyd.healthcare.domain.support.board.Post;
import lombok.Getter;

@Getter
public class PostResponseDTO {
    private final Long id;
    private final Integer hits;
    private final String title;
    private final String content;
    private final String author;
    private final Boolean secretYn;
    private final Boolean answerYn;
    private final String createdDate;
    private final String updatedDate;


    public PostResponseDTO(Post entity) {
        this.id = entity.getId();
        this.hits = entity.getHits();

        this.title = entity.getTitle();
        this.content = entity.getContent();

        this.secretYn = entity.getSecretYn();
        this.answerYn = entity.getAnswerYn();

        this.author = entity.getAuthor().getName();
        this.createdDate = entity.getCreatedDate().toString();
        this.updatedDate = entity.getUpdatedDate().toString();
    }
}
