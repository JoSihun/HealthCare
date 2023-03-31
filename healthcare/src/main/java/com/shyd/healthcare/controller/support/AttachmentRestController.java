package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.support.attachment.AttachmentResponseDto;
import com.shyd.healthcare.service.support.AttachmentService;
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
    @PostMapping("/api/attachment/{postId}")
    public void saveAttachment(@PathVariable(value = "postId") Long postId,
                               @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        this.attachmentService.save(postId, files);
    }

    @PutMapping("/api/attachment/{postId}")
    public void updateAttachment(@PathVariable(value = "postId") Long postId,
                                 @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        this.attachmentService.update(postId, files);
    }

    @DeleteMapping("/api/attachment/{postId}")
    public void deleteAttachment(@PathVariable(value = "postId") Long postId) {
        this.attachmentService.deleteAllByPostId(postId);
    }
}
