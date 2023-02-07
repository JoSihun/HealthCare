package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Post;
import com.shyd.healthcare.dto.PostResponseDto;
import com.shyd.healthcare.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    /* 게시글 조회 */
    @Transactional
    public PostResponseDto findById(final Long id) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id)
        );
        entity.increaseHits();
        return new PostResponseDto(entity);
    }

}
