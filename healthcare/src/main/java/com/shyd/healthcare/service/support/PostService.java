package com.shyd.healthcare.service.support;

import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.post.PostResponseDto;
import com.shyd.healthcare.dto.support.post.PostSaveRequestDto;
import com.shyd.healthcare.dto.support.post.PostUpdateRequestDto;
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

    /** 카테고리별 목록조회 - 작성순, List */
    @Transactional
    public List<PostResponseDto> findAllByCategoryAsc(String category) {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Post> postList = this.postRepository.findAllByCategory(category, sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    /** 카테고리별 목록조회 - 최신순, List */
    @Transactional
    public List<PostResponseDto> findAllByCategoryDesc(String category) {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Post> postList = this.postRepository.findAllByCategory(category, sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 카테고리별 목록조회 - 작성순, Page */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryAsc(String category, Pageable pageable) {
        // Sort sort = Sort.by(Sort.Direction.ASC, "id");
        // Pageable pageable = PageRequest.of(curPage, maxPage, sort);
        Page<Post> postPage = this.postRepository.findAllByCategory(category, pageable);
        return postPage.map(PostResponseDto::new);
    }

    /** 카테고리별 목록조회 - 최신순, Page */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryDesc(String category, Pageable pageable) {
        // Sort sort = Sort.by(Sort.Direction.DESC, "id");
        // Pageable pageable = PageRequest.of(curPage, maxPage, sort);
        Page<Post> postPage = this.postRepository.findAllByCategory(category, pageable);
        return postPage.map(PostResponseDto::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목으로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryAndTitle(String category, String title, Pageable pageable) {
        Page<Post> postPage = this.postRepository.findAllByCategoryAndTitleContaining(category, title, pageable);
        return postPage.map(PostResponseDto::new);
    }

    /** 내용으로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryAndContent(String category, String content, Pageable pageable) {
        Page<Post> postPage = this.postRepository.findAllByCategoryAndContentContaining(category, content, pageable);
        return postPage.map(PostResponseDto::new);
    }

    /** 작성자로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryAndAuthor(String category, String author, Pageable pageable) {
        Page<Post> postPage = this.postRepository.findAllByCategoryAndAuthorContaining(category, author, pageable);
        return postPage.map(PostResponseDto::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목 + 내용으로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryAndTitleOrContent(String category, String title, String content, Pageable pageable) {
        Page<Post> postPage = this.postRepository.findAllByCategoryAndTitleContainingOrContentContaining(category, title, content, pageable);
        return postPage.map(PostResponseDto::new);
    }

    /** 제목 + 작성자로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryAndTitleOrAuthor(String category, String title, String author, Pageable pageable) {
        Page<Post> postPage = this.postRepository.findAllByCategoryAndTitleContainingOrAuthorContaining(category, title, author, pageable);
        return postPage.map(PostResponseDto::new);
    }

    /** 내용 + 작성자로 검색, 카테고리별 게시판 목록조회 - 최신순, Pageable */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryAndContentOrAuthor(String category, String content, String author, Pageable pageable) {
        Page<Post> postPage = this.postRepository.findAllByCategoryAndContentContainingOrAuthorContaining(category, content, author, pageable);
        return postPage.map(PostResponseDto::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 게시글 조회 */
    @Transactional
    public PostResponseDto findById(final Long id) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        return new PostResponseDto(entity);
    }

    /** 게시글 생성 */
    @Transactional
    public Long save(String token, final PostSaveRequestDto requestDto) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Long userId = this.jwtTokenProvider.getUserIdFromToken(token);
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        requestDto.setAuthor(user);
        return this.postRepository.save(requestDto.toEntity()).getId();
    }

    /** 게시글 수정 */
    @Transactional
    public Long update(final Long id, final PostUpdateRequestDto requestDto) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        return entity.update(requestDto);
    }

    /** 게시글 삭제 */
    @Transactional
    public void delete(final Long id) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        this.postRepository.delete(entity);
    }
}
