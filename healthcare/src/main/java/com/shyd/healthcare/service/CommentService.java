package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Comment;
import com.shyd.healthcare.domain.Post;
import com.shyd.healthcare.dto.comment.CommentResponseDto;
import com.shyd.healthcare.dto.comment.CommentSaveRequestDto;
import com.shyd.healthcare.dto.comment.CommentUpdateRequestDto;
import com.shyd.healthcare.repository.CommentRepository;
import com.shyd.healthcare.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    /** 게시글 댓글 읽기 */
    @Transactional
    public List<CommentResponseDto> findAllByPostId(final Long postId) {
        Post postEntity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. postId = " + postId));
        List<Comment> commentList = postEntity.getCommentList();
        return commentList.stream().map(CommentResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 댓글 저장 */
    @Transactional
    public Long save(final Long postId, final CommentSaveRequestDto requestDto) {
        Post postEntity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. postId = " + postId));
        requestDto.setPost(postEntity);
        return this.commentRepository.save(requestDto.toEntity()).getId();
    }

    /** 댓글 수정 */
    @Transactional
    public Long update(final Long commentId, final CommentUpdateRequestDto requestDto) {
        Comment commentEntity = this.commentRepository.findById(commentId).orElseThrow(
                () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. commentId = " + commentId));
        commentEntity.update(requestDto);
        return commentId;
    }

    /** 댓글 삭제 */
    @Transactional
    public Long delete(final Long commentId) {
        Comment commentEntity = this.commentRepository.findById(commentId).orElseThrow(
                () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. commentId = " + commentId));
        this.commentRepository.delete(commentEntity);
        return commentId;
    }
}
