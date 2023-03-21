package com.shyd.healthcare.domain;

import com.shyd.healthcare.dto.attachment.AttachmentSaveRequestDto;
import com.shyd.healthcare.dto.attachment.AttachmentUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Attachment extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    private String filePath;
    @ManyToOne
    private Post post;

    @Builder
    public Attachment(String fileName, String filePath, Post post) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.post = post;
    }

    public Long update(AttachmentUpdateRequestDto requestDto) {
        this.fileName = requestDto.getFileName();
        this.filePath = requestDto.getFilePath();
        return this.id;
    }
}
