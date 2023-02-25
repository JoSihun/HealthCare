package com.shyd.healthcare.dto.attachment;

import com.shyd.healthcare.domain.Attachment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AttachmentUpdateRequestDto {
    private String fileName;
    private String filePath;

    @Builder
    public AttachmentUpdateRequestDto(String fileName, String filePath) {
        this.fileName = fileName;
        this.filePath = filePath;
    }

    public Attachment toEntity() {
        return Attachment.builder()
                .fileName(this.fileName)
                .filePath(this.filePath)
                .build();
    }
}
