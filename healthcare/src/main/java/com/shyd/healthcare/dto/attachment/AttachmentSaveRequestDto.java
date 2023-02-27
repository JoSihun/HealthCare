package com.shyd.healthcare.dto.attachment;

import com.shyd.healthcare.domain.Attachment;
import com.shyd.healthcare.domain.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class AttachmentSaveRequestDto {
    private String fileName;
    private String filePath;
    private Post post;

    @Builder
    public AttachmentSaveRequestDto(String fileName, String filePath, Post post) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.post = post;
    }

    public Attachment toEntity() {
        return Attachment.builder()
                .fileName(this.fileName)
                .filePath(this.filePath)
                .post(this.post)
                .build();
    }
}
