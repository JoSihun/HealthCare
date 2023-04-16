package com.shyd.healthcare.domain.support.board;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.dto.support.attachment.AttachmentUpdateRequestDto;
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
    private Long size;
    private String fileName;
    private String filePath;

    @ManyToOne
    private Post post;

    @Builder
    public Attachment(Long size, String fileName, String filePath, Post post) {
        this.post = post;
        this.size = size;
        this.fileName = fileName;
        this.filePath = filePath;
    }

    public Long update(AttachmentUpdateRequestDto requestDto) {
        this.size = requestDto.getSize();
        this.fileName = requestDto.getFileName();
        this.filePath = requestDto.getFilePath();
        return this.id;
    }
}
