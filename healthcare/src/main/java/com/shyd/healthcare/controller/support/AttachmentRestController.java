package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.attachment.AttachmentResponseDto;
import com.shyd.healthcare.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AttachmentRestController {
    private final AttachmentService attachmentService;

    @GetMapping("/api/attachment/{postId}")
    public List<AttachmentResponseDto> attachmentRead(@PathVariable Long postId) {
        return this.attachmentService.findAllByPostId(postId);
    }
    
    // 파일 다운로드1: https://peachsoong.tistory.com/68
    // 파일 다운로드2: https://jforj.tistory.com/135
}
