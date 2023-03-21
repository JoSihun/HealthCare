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

//    @GetMapping("/api/comment/?post={postId}")
//    public List<CommentResponseDto> readComment(@PathVariable(value = "postId") Long postId) {
//        return this.commentService.findAllByPostId(postId);
//    }
//
//    @PostMapping("/api/comment/?post={postId}")
//    public List<CommentResponseDto> saveComment(@PathVariable(value = "postId") Long postId,
//                                                @RequestBody CommentSaveRequestDto requestDto) {
//        this.commentService.save(postId, requestDto);
//        return this.commentService.findAllByPostId(postId);
//    }
//
//    @PutMapping("/api/comment/?post={postId}&comment={commentId}")
//    public List<CommentResponseDto> updateComment(@PathVariable(value = "postId") Long postId,
//                                                  @PathVariable(value = "commentId") Long commentId,
//                                                  @RequestBody CommentUpdateRequestDto requestDto) {
//        this.commentService.update(commentId, requestDto);
//        return this.commentService.findAllByPostId(postId);
//    }
//
//    @DeleteMapping("/api/comment/?comment={commentId}")
//    public Long deleteComment(@PathVariable(value = "commentId") Long commentId) {
//        return this.commentService.delete(commentId);
//    }

    @GetMapping("/api/comment")
    public List<CommentResponseDto> readComment(@RequestParam(value = "post") Long postId) {
        return this.commentService.findAllByPostId(postId);
    }

    @PostMapping("/api/comment")
    public List<CommentResponseDto> saveComment(@RequestParam(value = "post") Long postId,
                                                @RequestBody CommentSaveRequestDto requestDto) {
        this.commentService.save(postId, requestDto);
        return this.commentService.findAllByPostId(postId);
    }

    @PutMapping("/api/comment")
    public List<CommentResponseDto> updateComment(@RequestParam(value = "post") Long postId,
                                                  @RequestParam(value = "comment") Long commentId,
                                                  @RequestBody CommentUpdateRequestDto requestDto) {
        this.commentService.update(commentId, requestDto);
        return this.commentService.findAllByPostId(postId);
    }

    @DeleteMapping("/api/comment")
    public List<CommentResponseDto> deleteComment(@RequestParam(value = "post") Long postId,
                                                  @RequestParam(value = "comment") Long commentId) {
        this.commentService.delete(commentId);
        return this.commentService.findAllByPostId(postId);
    }
}
