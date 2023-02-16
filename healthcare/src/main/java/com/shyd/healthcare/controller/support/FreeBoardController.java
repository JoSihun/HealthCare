package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.PostResponseDto;
import com.shyd.healthcare.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/support")
public class FreeBoardController {
    private final PostService postService;

    @GetMapping("/freeboard")
    public List<PostResponseDto> freeBoard() {
        return this.postService.findAllFaqDesc("FreeBoard");
    }

    @GetMapping("/freeboard/post/{id}")
    public PostResponseDto freeBoardPost(@PathVariable Long id) {
        return this.postService.findById(id);
    }

    @GetMapping("/freeboard/form")
    public void freeBoardForm() {

    }

    @GetMapping("/freeboard/form/{id}")
    public PostResponseDto freeBoardForm(@PathVariable Long id) {
        return null;
    }
}
