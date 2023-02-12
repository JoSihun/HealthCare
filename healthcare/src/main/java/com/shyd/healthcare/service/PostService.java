package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Post;
import com.shyd.healthcare.dto.PostSaveRequestDto;
import com.shyd.healthcare.dto.PostResponseDto;
import com.shyd.healthcare.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    /* FAQ 목록 조회 - 작성순 */
    /* 추후 FaqListResponseDto 분리 검토 */
    @Transactional
    public List<PostResponseDto> findAllFaqAsc(String category) {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Post> postList = this.postRepository.findAllByCategory(category, sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    /* FAQ 목록 조회 - 최신순 */
    /* 추후 FaqListResponseDto 분리 검토 */
    @Transactional
    public List<PostResponseDto> findAllFaqDesc(String category) {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Post> postList = this.postRepository.findAllByCategory(category, sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }


    /* 게시글 조회 */
    @Transactional
    public PostResponseDto findById(final Long id) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id)
        );
        entity.increaseHits();
        return new PostResponseDto(entity);
    }

    /* 게시글 저장 */
    @Transactional
    public Long save(final PostSaveRequestDto requestDto) {
        Long postId = this.postRepository.save(requestDto.toEntity()).getId();
        Post entity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + postId)
        );

        return postId;
    }
}
