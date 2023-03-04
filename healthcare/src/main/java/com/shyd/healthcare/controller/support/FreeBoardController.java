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
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "author", required = false) String author,
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        if (title != null && content == null && author == null)
            return this.postService.findAllByTitle("FreeBoard", title, pageable);
        else if (title == null && content != null && author == null)
            return this.postService.findAllByContent("FreeBoard", content, pageable);
        else if (title == null && content == null && author != null)
            return this.postService.findAllByAuthor("FreeBoard", author, pageable);
        else if (title != null && content != null && author == null)
            return this.postService.findAllByTitleOrContent("FreeBoard", title, content, pageable);
        else if (title != null && content == null && author != null)
            return this.postService.findAllByTitleOrAuthor("FreeBoard", title, author, pageable);
        else if (title == null && content != null && author != null)
            return this.postService.findAllByContentOrAuthor("FreeBoard", content, author, pageable);
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
