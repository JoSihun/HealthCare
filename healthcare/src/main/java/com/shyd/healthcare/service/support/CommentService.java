package com.shyd.healthcare.service.support;

import com.shyd.healthcare.domain.support.board.Comment;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.comment.CommentResponseDTO;
import com.shyd.healthcare.dto.support.comment.CommentSaveRequestDTO;
import com.shyd.healthcare.dto.support.comment.CommentUpdateRequestDTO;
import com.shyd.healthcare.repository.support.CommentRepository;
import com.shyd.healthcare.repository.support.PostRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import com.shyd.healthcare.config.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /** 댓글 조회 */
    @Transactional
    public List<CommentResponseDTO> findAllByPostId(Long postId) {
        Post posts = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + postId));
        List<Comment> comments = posts.getComments();
        return comments.stream().map(CommentResponseDTO::new).collect(Collectors.toList());
    }

    /** 댓글 생성 */
    @Transactional
    public Long create(String accessToken, Long postId, CommentSaveRequestDTO requestDto) {
        Long userId = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        Post post = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + postId));
        requestDto.setPost(post);
        requestDto.setAuthor(user);
        return this.commentRepository.save(requestDto.toEntity()).getId();
    }

    /** 댓글 수정 */
    @Transactional
    public Long update(Long id, CommentUpdateRequestDTO requestDto) {
        Comment comment = this.commentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. comment_id = " + id));
        return comment.update(requestDto);
    }

    /** 댓글 삭제 */
    @Transactional
    public void delete(Long id) {
        Comment comment = this.commentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. comment_id = " + id));
        this.commentRepository.delete(comment);
    }
}
