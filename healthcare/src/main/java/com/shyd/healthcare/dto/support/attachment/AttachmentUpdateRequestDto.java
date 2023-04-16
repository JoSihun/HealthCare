package com.shyd.healthcare.dto.support.attachment;

import com.shyd.healthcare.domain.support.board.Attachment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AttachmentUpdateRequestDto {
    private Long size;
    private String fileName;
    private String filePath;

    @Builder
    public AttachmentUpdateRequestDto(Long size, String fileName, String filePath) {
        this.size = size;
        this.fileName = fileName;
        this.filePath = filePath;
    }

    public Attachment toEntity() {
        return Attachment.builder()
                .size(this.size)
                .fileName(this.fileName)
                .filePath(this.filePath)
                .build();
    }
}
