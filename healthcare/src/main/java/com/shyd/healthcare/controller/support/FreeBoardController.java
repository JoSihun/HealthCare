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
public class FreeBoardController {
    private final PostService postService;

    @GetMapping("/freeboard")
    public Page<PostResponseDto> freeBoard(
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllByCategoryDesc("FreeBoard", pageable);
    }

    @GetMapping("/freeboard/search")
    public Page<PostResponseDto> freeBoardSearch(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "searchFilter", required = false) String searchFilter,
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        if (searchFilter.equals("Title"))
            return this.postService.findAllByTitle("FreeBoard", searchValue, pageable);
        else if (searchFilter.equals("Content"))
            return this.postService.findAllByContent("FreeBoard", searchValue, pageable);
        else if (searchFilter.equals("Author"))
            return this.postService.findAllByAuthor("FreeBoard", searchValue, pageable);
        else if (searchFilter.equals("TitleContent"))
            return this.postService.findAllByTitleOrContent("FreeBoard", searchValue, searchValue, pageable);
        else if (searchFilter.equals("TitleAuthor"))
            return this.postService.findAllByTitleOrAuthor("FreeBoard", searchValue, searchValue, pageable);
        else if (searchFilter.equals("ContentAuthor"))
            return this.postService.findAllByContentOrAuthor("FreeBoard", searchValue, searchValue, pageable);
        else
            return this.postService.findAllByCategoryDesc("FreeBoard", pageable);
    }

    @GetMapping("/freeboard/post/{id}")
    public PostResponseDto freeBoardPost(@PathVariable Long id) {
        return this.postService.findById(id);
    }

    @GetMapping("/freeboard/form/{id}")
    public PostResponseDto freeBoardForm(@PathVariable Long id) {
        return this.postService.findById(id);
    }

}
