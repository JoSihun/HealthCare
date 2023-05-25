package com.shyd.healthcare.service.support;

import com.shyd.healthcare.domain.support.board.BoardType;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.post.PostListResponseDTO;
import com.shyd.healthcare.dto.support.post.PostResponseDTO;
import com.shyd.healthcare.dto.support.post.PostSaveRequestDTO;
import com.shyd.healthcare.dto.support.post.PostUpdateRequestDTO;
import com.shyd.healthcare.repository.support.PostRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import com.shyd.healthcare.config.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AttachmentService attachmentService;

    /** 카테고리별 목록조회 - List */
    @Transactional
    public List<PostListResponseDTO> findAllByBoardType(BoardType boardType, String sortOption) {
        Sort sort = Sort.by(sortOption.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "id");
        List<Post> posts = this.postRepository.findAllByBoardType(boardType, sort);
        return posts.stream().map(PostListResponseDTO::new).collect(Collectors.toList());
    }

    /** 카테고리별 목록조회 - Page */
    @Transactional
    public Page<PostListResponseDTO> findAllByBoardType(BoardType boardType, Pageable pageable) {
        Page<Post> posts = this.postRepository.findAllByBoardType(boardType, pageable);
        return posts.map(PostListResponseDTO::new);
    }

//    /** 카테고리별 목록조회 - Page, 하드코딩 */
//    @Transactional
//    public Page<PostListResponseDTO> findAllByBoardType(int page, int size, String sortOption, BoardType boardType) {
//        Sort sort = Sort.by(sortOption.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "id");
//        Pageable pageable = PageRequest.of(page - 1, size, sort);
//        Page<Post> posts = this.postRepository.findAllByBoardType(boardType, pageable);
//        return posts.map(PostListResponseDTO::new);
//    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목으로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostListResponseDTO> findAllByBoardTypeAndTitle(BoardType boardType, String title, Pageable pageable) {
        Page<Post> posts = this.postRepository.findAllByBoardTypeAndTitleContaining(boardType, title, pageable);
        return posts.map(PostListResponseDTO::new);
    }

    /** 내용으로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostListResponseDTO> findAllByBoardTypeAndContent(BoardType boardType, String content, Pageable pageable) {
        Page<Post> posts = this.postRepository.findAllByBoardTypeAndContentContaining(boardType, content, pageable);
        return posts.map(PostListResponseDTO::new);
    }

    /** 작성자로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostListResponseDTO> findAllByBoardTypeAndAuthor(BoardType boardType, String author, Pageable pageable) {
        Page<Post> posts = this.postRepository.findAllByBoardTypeAndAuthorContaining(boardType, author, pageable);
        return posts.map(PostListResponseDTO::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목 + 내용으로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostListResponseDTO> findAllByBoardTypeAndTitleOrContent(BoardType boardType, String title, String content, Pageable pageable) {
        // where board_type and ( post title like ) or post content like => where board_type and ( post title like or post content like)
        // JPARepository 에서 매뉴얼로 SQL Query 날려야 할 것 같음
        Page<Post> posts = this.postRepository.findAllByBoardTypeAndTitleContainingOrContentContaining(boardType, title, content, pageable);
        return posts.map(PostListResponseDTO::new);
    }

    /** 제목 + 작성자로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostListResponseDTO> findAllByBoardTypeAndTitleOrAuthor(BoardType boardType, String title, String author, Pageable pageable) {
        Page<Post> posts = this.postRepository.findAllByBoardTypeAndTitleContainingOrAuthorContaining(boardType, title, author, pageable);
        return posts.map(PostListResponseDTO::new);
    }

    /** 내용 + 작성자로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostListResponseDTO> findAllByBoardTypeAndContentOrAuthor(BoardType boardType, String content, String author, Pageable pageable) {
        Page<Post> posts = this.postRepository.findAllByBoardTypeAndContentContainingOrAuthorContaining(boardType, content, author, pageable);
        return posts.map(PostListResponseDTO::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 게시글 조회 */
    @Transactional
    public PostResponseDTO findById(Long id) {
        Post post = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + id));
        post.increaseHits();
        return new PostResponseDTO(post);
    }

    /** 게시글 생성 */
    @Transactional
    public Long create(String accessToken, PostSaveRequestDTO requestDto) {
        Long userId = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        requestDto.setAuthor(user);
        return this.postRepository.save(requestDto.toEntity()).getId();
    }

    /** 게시글 수정 */
    @Transactional
    public Long update(Long id, PostUpdateRequestDTO requestDto) {
        Post post = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + id));
        return post.update(requestDto);
    }

    /** 게시글 삭제 */
    @Transactional
    public void delete(Long id) {
        Post post = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. post_id = " + id));
        this.attachmentService.deleteAllByPostId(id);
        this.postRepository.delete(post);
    }
}
