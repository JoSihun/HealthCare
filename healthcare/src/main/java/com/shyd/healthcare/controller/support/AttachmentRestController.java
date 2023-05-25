package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.support.attachment.AttachmentResponseDTO;
import com.shyd.healthcare.service.support.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class AttachmentRestController {
    private final AttachmentService attachmentService;

    /** 첨부파일 다운로드 API */
    @GetMapping("/api/v1/attachment/download/{id}")
    public ResponseEntity<Resource> downloadAttachment(@PathVariable Long id) throws MalformedURLException {
        AttachmentResponseDTO responseDTO = this.attachmentService.findById(id);
        Resource resource = this.attachmentService.downloadFile(id);
        String filename = responseDTO.getFileName();
        String encodedFilename = UriUtils.encode(filename, StandardCharsets.UTF_8);
        String contentDisposition = "attachment; filename=\"" + encodedFilename + "\"";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    /** 첨부파일 바이너리 데이터 API */
    @GetMapping("/api/v1/attachment/binary/{id}")
    public ResponseEntity<byte[]> fetchBinaryData(@PathVariable Long id) {
        AttachmentResponseDTO responseDTO = this.attachmentService.findById(id);
        byte[] bytes = this.attachmentService.fetchBinary(id);
        String filename = responseDTO.getFileName();
        String encodedFilename = UriUtils.encode(filename, StandardCharsets.UTF_8);
        String contentDisposition = "attachment; filename=\"" + encodedFilename + "\"";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(bytes);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 첨부파일 목록조회 API */
    @GetMapping("/api/v1/attachment")
    public List<AttachmentResponseDTO> fetchAttachments(@RequestParam(value = "post") Long postId) {
        return this.attachmentService.findAllByPostId(postId);
    }

    /** 첨부파일 생성 API */
    @PostMapping("/api/v1/attachment")
    public Long createAttachment(@RequestParam(value = "post") Long postId,
                                 @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        return this.attachmentService.create(postId, files);
    }

    /** 첨부파일 수정 API */
    @PutMapping("/api/v1/attachment")
    public void updateAttachment(@RequestParam(value = "post") Long postId,
                                 @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        this.attachmentService.update(postId, files);
    }

    /** 첨부파일 삭제 API */
    @DeleteMapping("/api/v1/attachment")
    public void deleteAttachment(@RequestParam(value = "post") Long postId) {
        this.attachmentService.deleteAllByPostId(postId);
    }
}
