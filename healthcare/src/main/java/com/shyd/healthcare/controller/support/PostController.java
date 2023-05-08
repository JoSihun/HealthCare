package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.domain.support.board.BoardType;
import com.shyd.healthcare.dto.support.post.PostListResponseDTO;
import com.shyd.healthcare.dto.support.post.PostResponseDTO;
import com.shyd.healthcare.service.support.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    /** 게시글 조회 API */
    @GetMapping("/api/v1/post/{id}")
    public PostResponseDTO fetchPost(@PathVariable(value = "id") Long id) {
        return this.postService.findById(id);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** FAQ 게시판 목록조회 API */
    @GetMapping("/api/v1/post/faq-board")
    public Page<PostListResponseDTO> fetchFaqBoard(
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllByBoardType(BoardType.FAQ_BOARD, pageable);
    }

    /** Q&A 게시판 목록조회 API */
    @GetMapping("/api/v1/post/qna-board")
    public Page<PostListResponseDTO> fetchQnaBoard(
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllByBoardType(BoardType.QNA_BOARD, pageable);
    }

    /** FREE 게시판 목록조회 API */
    @GetMapping("/api/v1/post/free-board")
    public Page<PostListResponseDTO> fetchFreeBoard(
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllByBoardType(BoardType.FREE_BOARD, pageable);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    private Page<PostListResponseDTO> search(BoardType boardType, String searchValue, String searchFilter, Pageable pageable) {
        switch (searchFilter) {
            case "Title":
                return this.postService.findAllByBoardTypeAndTitle(boardType, searchValue, pageable);
            case "Content":
                return this.postService.findAllByBoardTypeAndContent(boardType, searchValue, pageable);
            case "Author":
                return this.postService.findAllByBoardTypeAndAuthor(boardType, searchValue, pageable);
            case "TitleContent":
                return this.postService.findAllByBoardTypeAndTitleOrContent(boardType, searchValue, searchValue, pageable);
            case "TitleAuthor":
                return this.postService.findAllByBoardTypeAndTitleOrAuthor(boardType, searchValue, searchValue, pageable);
            case "ContentAuthor":
                return this.postService.findAllByBoardTypeAndContentOrAuthor(boardType, searchValue, searchValue, pageable);
            default:
                return this.postService.findAllByBoardType(boardType, pageable);
        }
    }

    /** FAQ 게시판 검색목록조회 API */
    @GetMapping("/api/v1/post/faq-board/search")
    public Page<PostListResponseDTO> searchFaqBoard(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "searchFilter", required = false) String searchFilter,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return search(BoardType.FAQ_BOARD, searchValue, searchFilter, pageable);
    }

    /** Q&A 게시판 검색목록조회 API */
    @GetMapping("/api/v1/post/qna-board/search")
    public Page<PostListResponseDTO> searchQnaBoard(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "searchFilter", required = false) String searchFilter,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return search(BoardType.QNA_BOARD, searchValue, searchFilter, pageable);
    }

    /** FREE 게시판 검색목록조회 API */
    @GetMapping("/api/v1/post/free-board/search")
    public Page<PostListResponseDTO> searchFreeBoard(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "searchFilter", required = false) String searchFilter,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return search(BoardType.FREE_BOARD, searchValue, searchFilter, pageable);
    }
}
