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

    /* FAQ 목록 조회 - 작성순 */
    /* 추후 FaqListResponseDto 분리 검토 */
    @Transactional
    public List<PostResponseDto> findAllFaqBoardAsc() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Post> postList = this.postRepository.findAllByCategory("FAQBoard", sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    /* FAQ 목록 조회 - 최신순 */
    /* 추후 FaqListResponseDto 분리 검토 */
    @Transactional
    public List<PostResponseDto> findAllFaqBoardDesc() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Post> postList = this.postRepository.findAllByCategory("FAQBoard", sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    //////////////////////////////////////////////////////QNABoard//////////////////////////////////////////////////////
    /** QNABoard 목록 조회 - 작성순 */
    @Transactional
    public List<PostResponseDto> findAllQnaBoardAsc() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Post> postList = this.postRepository.findAllByCategory("QNABoard", sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    /** QNABoard 목록 조회 - 최신순 */
    @Transactional
    public List<PostResponseDto> findAllQnaBoardDesc() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Post> postList = this.postRepository.findAllByCategory("QNABoard", sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }
    //////////////////////////////////////////////////////FreeBoard/////////////////////////////////////////////////////
    /** FreeBoard 목록 조회 - 작성순 */
    @Transactional
    public List<PostResponseDto> findAllFreeBoardAsc() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Post> postList = this.postRepository.findAllByCategory("FreeBoard", sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    /** FreeBoard 목록 조회 - 최신순 */
    @Transactional
    public List<PostResponseDto> findAllFreeBoardDesc() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Post> postList = this.postRepository.findAllByCategory("FreeBoard", sort);
        return postList.stream().map(PostResponseDto::new).collect(Collectors.toList());
    }

    /** FreeBoard 목록 조회 - 작성순, 페이징 적용 */
    @Transactional
    public Page<PostResponseDto> findAllFreeBoardBoardAsc(Pageable pageable) {
//        Sort sort = Sort.by(Sort.Direction.ASC, "id");
//        Pageable pageable = PageRequest.of(curPage, maxPage, sort);
        Page<Post> postList = this.postRepository.findAllByCategory("FreeBoard", pageable);
        return postList.map(PostResponseDto::new);
    }

    /** FreeBoard 목록 조회 - 최신순, 페이징 적용 */
    @Transactional
    public Page<PostResponseDto> findAllFreeBoardDesc(Pageable pageable) {
//        Sort sort = Sort.by(Sort.Direction.DESC, "id");
//        Pageable pageable = PageRequest.of(curPage, maxPage, sort);
        Page<Post> postList = this.postRepository.findAllByCategory("FreeBoard", pageable);
        return postList.map(PostResponseDto::new);
    }

    ////////////////////////////////////////////////////////Post////////////////////////////////////////////////////////

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

    @Transactional
    public Long update(final Long id, final PostUpdateRequestDto requestDto) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id)
        );

        return entity.update(requestDto);
    }

    @Transactional
    public Long delete(final Long id) {
        Post entity = this.postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id)
        );

        this.postRepository.delete(entity);
        return id;
    }
}
