package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Attachment;
import com.shyd.healthcare.domain.Post;
import com.shyd.healthcare.dto.attachment.AttachmentResponseDto;
import com.shyd.healthcare.dto.attachment.AttachmentSaveRequestDto;
import com.shyd.healthcare.dto.attachment.AttachmentUpdateRequestDto;
import com.shyd.healthcare.repository.AttachmentRepository;
import com.shyd.healthcare.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AttachmentService {
    private final PostRepository postRepository;
    private final AttachmentRepository attachmentRepository;

    /** 단일 첨부파일 불러오기 */
    @Transactional
    public AttachmentResponseDto findById(Long attachmentId) {
        Attachment entity = this.attachmentRepository.findById(attachmentId).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. id = " + attachmentId)
        );
        return new AttachmentResponseDto(entity);
    }

    /** 모든 첨부파일 불러오기 - 게시글에 연결된 */
    @Transactional
    public List<AttachmentResponseDto> findAllByPostId(Long postId) {
        Post entity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + postId));
        List<Attachment> attachmentList = entity.getAttachmentList();
        return attachmentList.stream().map(AttachmentResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** 다중 첨부파일 저장 */
    @Transactional
    public void save(final Long postId, final List<MultipartFile> files) throws IOException {
        Post entity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. postId = " + postId));

        for (MultipartFile file : files) {
            // 파일 경로 설정 (Windows "/", Linux "\\")
            File basePath = new File(System.getProperty("user.dir"));
            String filePath = basePath.getParent() + "/AttachmentFiles";

            // 파일 이름 설정 및 저장
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File saveFile = new File(filePath, fileName);
            file.transferTo(saveFile);

            // Linux 파일 권한 적용
            // Runtime.getRuntime().exec("chmod -R 777 " + saveFile);

            // AttachmentSaveRequestDto 생성
            AttachmentSaveRequestDto requestDto = new AttachmentSaveRequestDto();
            requestDto.setPost(entity);
            requestDto.setFileName(file.getOriginalFilename());
            requestDto.setFilePath(filePath + "/" + fileName);
            this.attachmentRepository.save(requestDto.toEntity());
        }
    }

    /** 다중 첨부파일 업데이트 */
    @Transactional
    public Long update(final Long id, final AttachmentUpdateRequestDto requestDto) {
        Attachment entity = this.attachmentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. id = " + id)
        );
        return entity.update(requestDto);
    }

    /** 단일 첨부파일 삭제 */
    @Transactional
    public Long delete(final Long id) {
        Attachment entity = this.attachmentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. id = " + id)
        );
        this.attachmentRepository.delete(entity);
        return id;
    }
}
