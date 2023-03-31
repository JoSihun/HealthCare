package com.shyd.healthcare.dto.support.attachment;

import com.shyd.healthcare.domain.support.board.Attachment;
import com.shyd.healthcare.domain.support.board.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AttachmentSaveRequestDto {
    private Long size;
    private String fileName;
    private String filePath;
    private Post post;

    @Builder
    public AttachmentSaveRequestDto(Long size, String fileName, String filePath, Post post) {
        this.size = size;
        this.post = post;
        this.fileName = fileName;
        this.filePath = filePath;
    }

    public Attachment toEntity() {
        return Attachment.builder()
                .size(this.size)
                .post(this.post)
                .fileName(this.fileName)
                .filePath(this.filePath)
                .build();
    }
}
