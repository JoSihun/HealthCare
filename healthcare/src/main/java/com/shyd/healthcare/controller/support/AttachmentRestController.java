package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.attachment.AttachmentResponseDto;
import com.shyd.healthcare.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class AttachmentRestController {
    private final AttachmentService attachmentService;

    @GetMapping("/api/attachment/download/{attachmentId}")
    public ResponseEntity<Resource> downloadAttachment(@PathVariable Long attachmentId) throws MalformedURLException {
        return this.attachmentService.download(attachmentId);
    }

    @GetMapping("/api/attachment/{postId}")
    public List<AttachmentResponseDto> attachmentRead(@PathVariable Long postId) {
        return this.attachmentService.findAllByPostId(postId);
    }

}
