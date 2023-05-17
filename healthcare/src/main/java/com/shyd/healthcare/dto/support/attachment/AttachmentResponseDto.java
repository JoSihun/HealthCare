package com.shyd.healthcare.dto.support.attachment;

import com.shyd.healthcare.domain.support.board.Attachment;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentResponseDTO {
    private Long id;
    private Long fileSize;
    private String fileName;
    private String fileType;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public AttachmentResponseDTO(Attachment entity) {
        this.id = entity.getId();
        this.fileName = entity.getFileName();
        this.fileSize = entity.getFileSize();
        this.fileType = entity.getFileType();
        this.createdDate = entity.getCreatedDate();
        this.updatedDate = entity.getUpdatedDate();
    }
}
