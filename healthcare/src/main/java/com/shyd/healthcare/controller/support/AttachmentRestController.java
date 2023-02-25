package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.attachment.AttachmentResponseDto;
import com.shyd.healthcare.dto.attachment.AttachmentSaveRequestDto;
import com.shyd.healthcare.dto.attachment.AttachmentUpdateRequestDto;
import com.shyd.healthcare.dto.post.PostSaveRequestDto;
import com.shyd.healthcare.dto.post.PostUpdateRequestDto;
import com.shyd.healthcare.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AttachmentRestController {
    private final AttachmentService attachmentService;

    @GetMapping("api/attachment/{postId}")
    public List<AttachmentResponseDto> attachmentRead(@PathVariable Long postId) {
        return this.attachmentService.findAllByPostId(postId);
    }

    @PostMapping("/api/attachment")
    public Long attachmentSave(@RequestBody AttachmentSaveRequestDto requestDto) {
        return this.attachmentService.save(requestDto);
    }

    @PutMapping("/api/attachment/{id}")
    public Long attachmentUpdate(@PathVariable Long id, @RequestBody AttachmentUpdateRequestDto requestDto) {
        return this.attachmentService.update(id, requestDto);
    }

    @DeleteMapping("/api/attachment/{id}")
    public Long attachmentDelete(@PathVariable Long id) {
        return this.attachmentService.delete(id);
    }
}
