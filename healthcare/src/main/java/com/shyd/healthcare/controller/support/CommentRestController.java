package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.support.comment.CommentResponseDTO;
import com.shyd.healthcare.dto.support.comment.CommentSaveRequestDTO;
import com.shyd.healthcare.dto.support.comment.CommentUpdateRequestDTO;
import com.shyd.healthcare.service.support.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentRestController {
    private final CommentService commentService;

    /** 댓글 목록조회 API */
    @GetMapping("/api/v1/comment")
    public List<CommentResponseDTO> fetchComments(@RequestParam(value = "post") Long postId) {
        return this.commentService.findAllByPostId(postId);
    }

    /** 댓글 생성 API */
    @PostMapping("/api/v1/comment")
    public Long createComment(@RequestHeader("Authorization") String accessToken,
                              @RequestParam(value = "post") Long postId,
                              @RequestBody CommentSaveRequestDTO requestDto) {
        return this.commentService.create(accessToken, postId, requestDto);
    }

    /** 댓글 수정 API */
    @PutMapping("/api/v1/comment/{id}")
    public Long updateComment(@PathVariable(value = "id") Long id,
                              @RequestBody CommentUpdateRequestDTO requestDto) {
        return this.commentService.update(id, requestDto);
    }

    /** 댓글 삭제 API */
    @DeleteMapping("/api/v1/comment/{id}")
    public void deleteComment(@PathVariable(value = "id") Long id) {
        this.commentService.delete(id);
    }
}
