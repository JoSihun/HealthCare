package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Post;
import com.shyd.healthcare.dto.post.PostSaveRequestDto;
import com.shyd.healthcare.dto.post.PostResponseDto;
import com.shyd.healthcare.dto.post.PostUpdateRequestDto;
import com.shyd.healthcare.repository.PostRepository;
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
    private final PostRepository postRepository;

    /** 게시판별 목록 조회 - 작성순, List */
    @Transactional
    public List<PostResponseDto> findAllByCategoryAsc(String category) {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Post> postList = this.postRepository.findAllByCategory(category, sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    /** 게시판별 목록 조회 - 최신순, List */
    @Transactional
    public List<PostResponseDto> findAllByCategoryDesc(String category) {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Post> postList = this.postRepository.findAllByCategory(category, sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    /** 게시판별 목록 조회 - 작성순, Pageable */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryAsc(String category, Pageable pageable) {
        // Sort sort = Sort.by(Sort.Direction.ASC, "id");
        // Pageable pageable = PageRequest.of(curPage, maxPage, sort);
        Page<Post> postList = this.postRepository.findAllByCategory(category, pageable);
        return postList.map(PostResponseDto::new);
    }

    /** 게시판별 목록 조회 - 최신순, Pageable */
    @Transactional
    public Page<PostResponseDto> findAllByCategoryDesc(String category, Pageable pageable) {
        // Sort sort = Sort.by(Sort.Direction.DESC, "id");
        // Pageable pageable = PageRequest.of(curPage, maxPage, sort);
        Page<Post> postList = this.postRepository.findAllByCategory(category, pageable);
        return postList.map(PostResponseDto::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 게시글 조회 */
    @Transactional
    public PostResponseDto findById(final Long id) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        entity.increaseHits();
        return new PostResponseDto(entity);
    }

    /** 게시글 저장 */
    @Transactional
    public Long save(final PostSaveRequestDto requestDto) {
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
    public Long delete(final Long id) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        this.postRepository.delete(entity);
        return id;
    }
}
