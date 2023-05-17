package com.shyd.healthcare.dto.support.attachment;

import com.shyd.healthcare.domain.support.board.Attachment;
import com.shyd.healthcare.domain.support.board.Post;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentRequestDTO {
    private Post post;
    private Long fileSize;
    private String fileName;
    private String filePath;
    private String fileType;
    private byte[] fileByte;

    public Attachment toEntity() {
        return Attachment.builder()
                .post(this.post)
                .fileSize(this.fileSize)
                .fileName(this.fileName)
                .filePath(this.filePath)
                .fileType(this.fileType)
                .fileByte(this.fileByte)
                .build();
    }
}
