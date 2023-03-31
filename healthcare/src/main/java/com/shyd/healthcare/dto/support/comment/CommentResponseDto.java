package com.shyd.healthcare.dto.support.comment;

import com.shyd.healthcare.domain.support.board.Comment;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class CommentResponseDto {
    private Long id;
    private String author;
    private String content;
    private Boolean secretYn;
    private String createdDate;
    private String updatedDate;

    public CommentResponseDto(Comment entity) {
        this.id = entity.getId();
        this.author = entity.getAuthor();
        this.content = entity.getContent();
        this.secretYn = entity.getSecretYn();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
