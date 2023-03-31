package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.domain.support.board.Category;
import com.shyd.healthcare.dto.support.post.PostResponseDto;
import com.shyd.healthcare.service.support.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class PostController {
    private final PostService postService;

    /** GET REQUEST - header: "default" */
    @GetMapping("/api/v1/post/{id}")
    public PostResponseDto getPost(@PathVariable(value = "id") Long id) {
        return this.postService.findById(id);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping("/api/v1/post/faq-board")
    public Page<PostResponseDto> readFAQBoard(
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllByCategoryDesc(Category.FAQ_BOARD.name(), pageable);
    }

    @GetMapping("/api/v1/post/qna-board")
    public Page<PostResponseDto> readQNABoard(
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllByCategoryDesc(Category.QNA_BOARD.name(), pageable);
    }

    @GetMapping("/api/v1/post/free-board")
    public Page<PostResponseDto> readFreeBoard(
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllByCategoryDesc(Category.FREE_BOARD.name(), pageable);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    private Page<PostResponseDto> search(String category, String searchValue, String searchFilter, Pageable pageable) {
        if (searchFilter.equals("Title"))
            return this.postService.findAllByCategoryAndTitle(category, searchValue, pageable);
        else if (searchFilter.equals("Content"))
            return this.postService.findAllByCategoryAndContent(category, searchValue, pageable);
        else if (searchFilter.equals("Author"))
            return this.postService.findAllByCategoryAndAuthor(category, searchValue, pageable);
        else if (searchFilter.equals("TitleContent"))
            return this.postService.findAllByCategoryAndTitleOrContent(category, searchValue, searchValue, pageable);
        else if (searchFilter.equals("TitleAuthor"))
            return this.postService.findAllByCategoryAndTitleOrAuthor(category, searchValue, searchValue, pageable);
        else if (searchFilter.equals("ContentAuthor"))
            return this.postService.findAllByCategoryAndContentOrAuthor(category, searchValue, searchValue, pageable);
        else
            return this.postService.findAllByCategoryDesc(category, pageable);
    }

    @GetMapping("/api/v1/post/faq-board/search")
    public Page<PostResponseDto> searchFAQBoard(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "searchFilter", required = false) String searchFilter,
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return search(Category.FAQ_BOARD.name(), searchValue, searchFilter, pageable);
    }

    @GetMapping("/api/v1/post/qna-board/search")
    public Page<PostResponseDto> searchQNABoard(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "searchFilter", required = false) String searchFilter,
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return search(Category.QNA_BOARD.name(), searchValue, searchFilter, pageable);
    }

    @GetMapping("/api/v1/post/free-board/search")
    public Page<PostResponseDto> searchFreeBoard(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "searchFilter", required = false) String searchFilter,
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return search(Category.FREE_BOARD.name(), searchValue, searchFilter, pageable);
    }
}
