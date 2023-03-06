package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.post.PostResponseDto;
import com.shyd.healthcare.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/support")
public class QNABoardController {
    private final PostService postService;

    @GetMapping("/qnaboard")
    public Page<PostResponseDto> qnaBoard(
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllByCategoryDesc("QNABoard", pageable);
    }

    @GetMapping("/qnaboard/search")
    public Page<PostResponseDto> qnaBoardSearch(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "searchFilter", required = false) String searchFilter,
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        if (searchFilter.equals("Title"))
            return this.postService.findAllByTitle("QNABoard", searchValue, pageable);
        else if (searchFilter.equals("Content"))
            return this.postService.findAllByContent("QNABoard", searchValue, pageable);
        else if (searchFilter.equals("Author"))
            return this.postService.findAllByAuthor("QNABoard", searchValue, pageable);
        else if (searchFilter.equals("TitleContent"))
            return this.postService.findAllByTitleOrContent("QNABoard", searchValue, searchValue, pageable);
        else if (searchFilter.equals("TitleAuthor"))
            return this.postService.findAllByTitleOrAuthor("QNABoard", searchValue, searchValue, pageable);
        else if (searchFilter.equals("ContentAuthor"))
            return this.postService.findAllByContentOrAuthor("QNABoard", searchValue, searchValue, pageable);
        else
            return this.postService.findAllByCategoryDesc("QNABoard", pageable);
    }

    @GetMapping("/qnaboard/post/{id}")
    public PostResponseDto qnaBoardPost(@PathVariable Long id) {
        return this.postService.findById(id);
    }

    @GetMapping("/qnaboard/form/{id}")
    public PostResponseDto qnaBoardForm(@PathVariable Long id) {
        return this.postService.findById(id);
    }
}
