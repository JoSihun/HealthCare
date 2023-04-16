package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.support.post.PostSaveRequestDto;
import com.shyd.healthcare.dto.support.post.PostUpdateRequestDto;
import com.shyd.healthcare.service.support.AttachmentService;
import com.shyd.healthcare.service.support.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostRestController {
    private final PostService postService;
    private final AttachmentService attachmentService;

    /** POST REQUEST - header: "default" */
    @PostMapping("/api/v1/post")
    public Long savePost(@RequestBody PostSaveRequestDto requestDto) {
        return this.postService.save(requestDto);
    }

    /** PUT REQUEST - header: "default" */
    @PutMapping("/api/v1/post/{id}")
    public Long updatePost(@PathVariable(value = "id") Long id,
                           @RequestBody PostUpdateRequestDto requestDto) {
        return this.postService.update(id, requestDto);
    }

    /** DELETE REQUEST - header: "default" */
    @DeleteMapping("/api/v1/post/{id}")
    public void deletePost(@PathVariable(value = "id") Long id) {
        this.postService.delete(id);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** POST REQUEST - header: "multipart/form-data" */
    @PostMapping("/api/v2/post")
    public Long postSave(@RequestPart(value = "data") PostSaveRequestDto requestDto,
                         @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        Long postId = this.postService.save(requestDto);
        return this.attachmentService.save(postId, files);
    }

    /** PUT REQUEST - header: "multipart/form-data" */
    @PutMapping("/api/v2/post/{id}")
    public Long postUpdate(@PathVariable(value = "id") Long postId,
                           @RequestPart(value = "data") PostUpdateRequestDto requestDto,
                           @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        this.attachmentService.update(postId, files);
        return this.postService.update(postId, requestDto);
    }

    /** DELETE REQUEST - header: "multipart/form-data" */
    @DeleteMapping("/api/v2/post/{id}")
    public void postDelete(@PathVariable Long id) {
        this.attachmentService.deleteAllByPostId(id);
        this.postService.delete(id);
    }
}
