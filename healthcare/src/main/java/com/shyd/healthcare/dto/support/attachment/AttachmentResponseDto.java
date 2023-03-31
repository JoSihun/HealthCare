package com.shyd.healthcare.dto.support.attachment;

import com.shyd.healthcare.domain.support.board.Attachment;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class AttachmentResponseDto {
    private Long id;
    private Long size;
    private String fileName;
    private String filePath;
    private String createdDate;
    private String updatedDate;

    public AttachmentResponseDto(Attachment entity) {
        this.id = entity.getId();
        this.size = entity.getSize();
        this.fileName = entity.getFileName();
        this.filePath = entity.getFilePath();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
