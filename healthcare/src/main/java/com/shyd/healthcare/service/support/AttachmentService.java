package com.shyd.healthcare.service.support;

import com.shyd.healthcare.domain.support.board.Attachment;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.dto.support.attachment.AttachmentResponseDTO;
import com.shyd.healthcare.dto.support.attachment.AttachmentRequestDTO;
import com.shyd.healthcare.repository.support.AttachmentRepository;
import com.shyd.healthcare.repository.support.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttachmentService {
    private final PostRepository postRepository;
    private final AttachmentRepository attachmentRepository;

    /** 실제파일 바이너리 */
    @Transactional
    public byte[] fetchBinary(Long id) {
        Attachment attachment = this.attachmentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일을 찾을 수 없습니다. attachment_id = " + id));
        return attachment.getFileByte();
    }

    /** 실제파일 다운로드 */
    @Transactional
    public Resource downloadFile(Long id) throws MalformedURLException {
        Attachment attachment = this.attachmentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일을 찾을 수 없습니다. attachment_id = " + id));
        return new UrlResource(Paths.get(attachment.getFilePath()).toUri());
    }

//    /** 실제파일 바이너리 목록 */
//    @Transactional
//    public List<byte[]> fetchBinaries(Long postId) {
//        Post post = this.postRepository.findById(postId).orElseThrow(
//                () -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. post_id = " + postId));
//        List<Attachment> attachments = post.getAttachments();
//
//        return attachments.stream()
//                .map(Attachment::getFileByte)
//                .collect(Collectors.toList());
//    }

//    /** 실제파일 다운로드 - 바이너리 데이터도 가능 */
//    @Transactional
//    public Resource downloadFile(Long id) throws MalformedURLException {
//        Attachment attachment = this.attachmentRepository.findById(id).orElseThrow(
//                () -> new IllegalArgumentException("해당 첨부파일을 찾을 수 없습니다. attachment_id = " + id));
//        return new ByteArrayResource(attachment.getFileByte());
//    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 실제파일 저장 */
    private AttachmentRequestDTO uploadFile(Post post, MultipartFile file) throws IOException {
        // 저장경로 설정 (Windows: "/", Linux: "\\", Default: "\\")
        Path basePath = Paths.get(System.getProperty("user.dir"));
        Path savePath = basePath.getParent().resolve("attachments");

        // 파일이름, 파일경로 설정 및 파일 저장
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = savePath.resolve(fileName);
        file.transferTo(filePath);

        // Linux 파일 권한 적용
        // Runtime.getRuntime().exec("chmod -R 777 " + saveFile);

        // AttachmentSaveRequestDto 생성 및 반환
        return AttachmentRequestDTO.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .filePath(filePath.toString())
                .fileByte(file.getBytes())
                .fileSize(file.getSize())
                .post(post)
                .build();
    }

    /** 실제파일 삭제 */
    private void deleteFile(Attachment attachment) {
        File file = new File(attachment.getFilePath());
        if (file.exists() && file.delete()) {
            System.out.println("[DELETE] File Removed Successfully. Filepath = " + attachment.getFilePath());
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 첨부파일 조회 */
    @Transactional
    public AttachmentResponseDTO findById(Long id) {
        Attachment attachment = this.attachmentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일을 찾을 수 없습니다. attachment_id = " + id));
        return new AttachmentResponseDTO(attachment);
    }

    /** 첨부파일 목록조회 */
    @Transactional
    public List<AttachmentResponseDTO> findAllByPostId(Long postId) {
        Post post = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. post_id = " + postId));
        List<Attachment> attachments = post.getAttachments();
        return attachments.stream().map(AttachmentResponseDTO::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 첨부파일 생성 */
    @Transactional
    public Long create(Long postId, List<MultipartFile> files) throws IOException {
        if (files != null) {
            Post post = this.postRepository.findById(postId).orElseThrow(
                    () -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. post_id = " + postId));
            for (MultipartFile file : files) {
                AttachmentRequestDTO requestDTO = uploadFile(post, file);
                this.attachmentRepository.save(requestDTO.toEntity());
            }
        }
        return postId;
    }

    /** 첨부파일 수정 */
    @Transactional
    public Long update(Long postId, List<MultipartFile> files) throws IOException {
        Post post = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. post_id = " + postId));
        List<Attachment> attachments = post.getAttachments();

        // 기존 파일 삭제
        attachments.forEach(attachment -> {
                    this.deleteFile(attachment);
                    this.attachmentRepository.delete(attachment);
                });

        // 새 파일 추가
        if (files != null) {
            for (MultipartFile file : files) {
                AttachmentRequestDTO attachmentRequestDTO = uploadFile(post, file);
                this.attachmentRepository.save(attachmentRequestDTO.toEntity());
            }
        }
        return postId;
    }

    /** 첨부파일 삭제 */
    @Transactional
    public void deleteAllByPostId(Long postId) {
        Post post = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. post_id = " + postId));
        List<Attachment> attachments = post.getAttachments();
        attachments.forEach(this::deleteFile);
        this.attachmentRepository.deleteAll(attachments);
    }
}
