package com.shyd.healthcare.dto.support.comment;

import com.shyd.healthcare.domain.support.board.Comment;
import lombok.Getter;

@Getter
public class CommentResponseDTO {
    private final Long id;
    private final String author;
    private final String content;
    private final Boolean secretYn;
    private final String createdDate;
    private final String updatedDate;

    public CommentResponseDTO(Comment entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.secretYn = entity.getSecretYn();

        this.author = entity.getAuthor().getUsername();
        this.createdDate = entity.getCreatedDate().toString();
        this.updatedDate = entity.getUpdatedDate().toString();
    }
}
