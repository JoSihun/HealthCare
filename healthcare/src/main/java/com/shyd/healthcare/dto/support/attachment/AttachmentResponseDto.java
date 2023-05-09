package com.shyd.healthcare.dto.support.attachment;

import com.shyd.healthcare.domain.support.board.Attachment;
import lombok.Getter;

@Getter
public class AttachmentResponseDTO {
    private final Long id;
    private final Long fileSize;
    private final String fileName;
    private final String filePath;
    private final String createdDate;
    private final String updatedDate;

    public AttachmentResponseDTO(Attachment entity) {
        this.id = entity.getId();
        this.fileSize = entity.getFileSize();
        this.fileName = entity.getFileName();
        this.filePath = entity.getFilePath();
        this.createdDate = entity.getCreatedDate().toString();
        this.updatedDate = entity.getUpdatedDate().toString();
    }
}
