package com.shyd.healthcare.domain.support.board;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.dto.support.attachment.AttachmentRequestDTO;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Attachment extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long fileSize;
    private String fileName;
    private String filePath;
    private String fileType;

    @Lob
    private byte[] fileByte;
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    public Long update(AttachmentRequestDTO requestDTO) {
        this.fileSize = requestDTO.getFileSize();
        this.fileName = requestDTO.getFileName();
        this.filePath = requestDTO.getFilePath();
        this.fileType = requestDTO.getFileType();
        this.fileByte = requestDTO.getFileByte();
        return this.id;
    }
}
