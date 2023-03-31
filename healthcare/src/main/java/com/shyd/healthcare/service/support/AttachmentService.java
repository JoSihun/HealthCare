package com.shyd.healthcare.service.support;

import com.shyd.healthcare.domain.support.board.Attachment;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.dto.support.attachment.AttachmentResponseDto;
import com.shyd.healthcare.dto.support.attachment.AttachmentSaveRequestDto;
import com.shyd.healthcare.repository.support.AttachmentRepository;
import com.shyd.healthcare.repository.support.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AttachmentService {
    private final PostRepository postRepository;
    private final AttachmentRepository attachmentRepository;

    /** 단일 첨부파일 삭제 */
    @Transactional
    public void delete(final Long attachmentId) {
        Attachment entity = this.attachmentRepository.findById(attachmentId).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. attachment_id = " + attachmentId));
        this.attachmentRepository.delete(entity);
    }

    /** 단일 첨부파일 다운로드 API */
    @Transactional
    public ResponseEntity<Resource> download(Long attachmentId) throws MalformedURLException {
        Attachment entity = this.attachmentRepository.findById(attachmentId).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. attachment_id = " + attachmentId));

        UrlResource resource = new UrlResource("file:" + entity.getFilePath());
        String encodedFileName = UriUtils.encode(entity.getFileName(), StandardCharsets.UTF_8);
        String contentDisposition = "attachment; filename=\"" + encodedFileName + "\"";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    /** 실제 첨부파일 저장 */
    private void saveFiles(List<MultipartFile> files, Post entity) throws IOException {
        for (MultipartFile file : files) {
            // 파일 경로 및 이름 설정 (Windows "/", Linux "\\")
            File basePath = new File(System.getProperty("user.dir"));
            String filePath = basePath.getParent() + "/AttachmentFiles";
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // 파일 저장
            File saveFile = new File(filePath, fileName);
            file.transferTo(saveFile);

            // Linux 파일 권한 적용
            // Runtime.getRuntime().exec("chmod -R 777 " + saveFile);

            // AttachmentSaveRequestDto 생성
            AttachmentSaveRequestDto requestDto = new AttachmentSaveRequestDto();
            requestDto.setPost(entity);
            requestDto.setSize(file.getSize());
            requestDto.setFileName(file.getOriginalFilename());
            requestDto.setFilePath(filePath + "/" + fileName);
            this.attachmentRepository.save(requestDto.toEntity());
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 첨부파일 조회 */
    @Transactional
    public List<AttachmentResponseDto> findAllByPostId(Long postId) {
        Post postEntity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + postId));
        List<Attachment> attachmentList = postEntity.getAttachmentList();
        return attachmentList.stream().map(AttachmentResponseDto::new).collect(Collectors.toList());
    }

    /** 첨부파일 생성 */
    @Transactional
    public Long save(final Long postId, final List<MultipartFile> files) throws IOException {
        if (files != null) {
            Post postEntity = this.postRepository.findById(postId).orElseThrow(
                    () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + postId));
            this.saveFiles(files, postEntity);
        }
        return postId;
    }

    /** 첨부파일 수정 */
    @Transactional
    public Long update(final Long postId, final List<MultipartFile> files) throws IOException {
        // 1st Process: Delete All Old Files
        Post postEntity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + postId));
        List<Attachment> attachmentList = postEntity.getAttachmentList();
        this.attachmentRepository.deleteAll(attachmentList);

        // 2nd Process: Save All New Files
        if (files != null) {
            this.saveFiles(files, postEntity);
        }
        return postId;
    }

    /** 첨부파일 삭제 */
    @Transactional
    public void deleteAllByPostId(final Long postId) {
        Post postEntity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + postId));
        List<Attachment> attachmentList = postEntity.getAttachmentList();
        for (Attachment attachmentEntity : attachmentList) {
            File file = new File(attachmentEntity.getFilePath());
            if (file.exists() && file.delete()) {
                System.out.println("[DELETE] File Removed Success " + attachmentEntity.getFilePath());
            }
        }
        this.attachmentRepository.deleteAll(attachmentList);
    }
}
