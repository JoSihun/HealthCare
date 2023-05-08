package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.support.post.PostSaveRequestDTO;
import com.shyd.healthcare.dto.support.post.PostUpdateRequestDTO;
import com.shyd.healthcare.service.support.AttachmentService;
import com.shyd.healthcare.service.support.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostRestController {
    private final PostService postService;
    private final AttachmentService attachmentService;

    /** 게시글 생성 API V1 */
    @PostMapping("/api/v1/post")
    public Long createPostV1(@RequestHeader("Authorization") String accessToken,
                             @RequestBody PostSaveRequestDTO requestDto) {
        return this.postService.create(accessToken, requestDto);
    }

    /** 게시글 수정 API V1 */
    @PutMapping("/api/v1/post/{id}")
    public Long updatePostV1(@PathVariable(value = "id") Long id,
                             @RequestBody PostUpdateRequestDTO requestDto) {
        return this.postService.update(id, requestDto);
    }

    /** 게시글 삭제 API V1 */
    @DeleteMapping("/api/v1/post/{id}")
    public void deletePostV1(@PathVariable(value = "id") Long id) {
        this.postService.delete(id);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** POST REQUEST - header: "multipart/form-data" */
    @PostMapping("/api/v2/post")
    public Long createPostV2(@RequestHeader("Authorization") String accessToken,
                             @RequestPart(value = "data") PostSaveRequestDTO requestDto,
                             @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        Long id = this.postService.create(accessToken, requestDto);
        return this.attachmentService.save(id, files);
    }

    /** PUT REQUEST - header: "multipart/form-data" */
    @PutMapping("/api/v2/post/{id}")
    public Long updatePostV2(@PathVariable(value = "id") Long id,
                             @RequestPart(value = "data") PostUpdateRequestDTO requestDto,
                             @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        this.attachmentService.update(id, files);
        return this.postService.update(id, requestDto);
    }

    /** DELETE REQUEST - header: "multipart/form-data" */
    @DeleteMapping("/api/v2/post/{id}")
    public void deletePostV2(@PathVariable(value = "id") Long id) {
        this.attachmentService.deleteAllByPostId(id);
        this.postService.delete(id);
    }
}
