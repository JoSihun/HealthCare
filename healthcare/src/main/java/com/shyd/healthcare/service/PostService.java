package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Post;
import com.shyd.healthcare.dto.PostCreateRequestDto;
import com.shyd.healthcare.dto.PostResponseDto;
import com.shyd.healthcare.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    /* FAQ 목록 조회 */
    /* 추후 카테고리 분류 및 정렬작업 필요 */
    /* 추후 FaqListResponseDto 분리 검토 */
    @Transactional
    public List<PostResponseDto> findAllFaq() {
        List<Post> postList = this.postRepository.findAll();
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
    public Long save(final PostCreateRequestDto requestDto) {
        Long postId = this.postRepository.save(requestDto.toEntity()).getId();
        Post entity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + postId)
        );

        return postId;
    }
}
