package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.attachment.AttachmentResponseDto;
import com.shyd.healthcare.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AttachmentRestController {
    private final AttachmentService attachmentService;

    @GetMapping("/api/attachment/{postId}")
    public List<AttachmentResponseDto> readAttachment(@PathVariable Long postId) {
        return this.attachmentService.findAllByPostId(postId);
    }

    @GetMapping("/api/attachment/download/{attachmentId}")
    public ResponseEntity<Resource> downloadAttachment(@PathVariable Long attachmentId) throws MalformedURLException {
        return this.attachmentService.download(attachmentId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @PostMapping("/api/v2/attachment/{postId}")
    public Long saveAttachment(@PathVariable(value = "postId") Long postId,
                               @RequestPart(value = "files", required = false)List<MultipartFile> files) throws IOException {
        return this.attachmentService.save(postId, files);
    }

    @PutMapping("/api/v2/attachment/{postId}")
    public Long updateAttachment(@PathVariable(value = "postId") Long postId,
                                 @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        return this.attachmentService.update(postId, files);
    }

    @DeleteMapping("/api/v2/attachment/{attachmentId}")
    public void deleteAttachment(@PathVariable(value = "attachmentId") Long attachmentId) {
        this.attachmentService.delete(attachmentId);
    }

}
