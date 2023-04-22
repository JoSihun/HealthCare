package com.shyd.healthcare.service.support;

import com.shyd.healthcare.domain.support.board.Comment;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.comment.CommentResponseDto;
import com.shyd.healthcare.dto.support.comment.CommentSaveRequestDto;
import com.shyd.healthcare.dto.support.comment.CommentUpdateRequestDto;
import com.shyd.healthcare.repository.support.CommentRepository;
import com.shyd.healthcare.repository.support.PostRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import com.shyd.healthcare.config.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /** 댓글 조회 */
    @Transactional
    public List<CommentResponseDto> findAllByPostId(final Long postId) {
        Post postEntity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + postId));
        List<Comment> commentList = postEntity.getCommentList();
        return commentList.stream().map(CommentResponseDto::new).collect(Collectors.toList());
    }

    /** 댓글 생성 */
    @Transactional
    public Long save(String token, final Long postId, final CommentSaveRequestDto requestDto) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Long userId = this.jwtTokenProvider.getUserIdFromToken(token);
        User userEntity = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        Post postEntity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + postId));
        requestDto.setPost(postEntity);
        requestDto.setAuthor(userEntity);
        return this.commentRepository.save(requestDto.toEntity()).getId();
    }

    /** 댓글 수정 */
    @Transactional
    public Long update(final Long commentId, final CommentUpdateRequestDto requestDto) {
        Comment commentEntity = this.commentRepository.findById(commentId).orElseThrow(
                () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. comment_id = " + commentId));
        return commentEntity.update(requestDto);
    }

    /** 댓글 삭제 */
    @Transactional
    public void delete(final Long commentId) {
        Comment commentEntity = this.commentRepository.findById(commentId).orElseThrow(
                () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. comment_id = " + commentId));
        this.commentRepository.delete(commentEntity);
    }
}
