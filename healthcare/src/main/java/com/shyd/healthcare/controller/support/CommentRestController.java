package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.comment.CommentResponseDto;
import com.shyd.healthcare.dto.comment.CommentSaveRequestDto;
import com.shyd.healthcare.dto.comment.CommentUpdateRequestDto;
import com.shyd.healthcare.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommentRestController {
    private final CommentService commentService;

    @GetMapping("/api/comment/?post={postId}")
    public List<CommentResponseDto> readComment(@PathVariable Long postId) {
        return this.commentService.findAllByPostId(postId);
    }

    @PostMapping("/api/comment/?post={postId}")
    public List<CommentResponseDto> saveComment(@PathVariable Long postId,
                                                @RequestBody CommentSaveRequestDto requestDto) {
        this.commentService.save(postId, requestDto);
        return this.commentService.findAllByPostId(postId);
    }

    @PutMapping("/api/comment/?post={postId}&comment={commentId}")
    public List<CommentResponseDto> updateComment(@PathVariable Long postId, @PathVariable Long commentId,
                                                  @RequestBody CommentUpdateRequestDto requestDto) {
        this.commentService.update(commentId, requestDto);
        return this.commentService.findAllByPostId(postId);
    }

    @DeleteMapping("/api/comment/?comment={commentId}")
    public Long deleteComment(@PathVariable Long commentId) {
        return this.commentService.delete(commentId);
    }
}
