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
public class QNABoardController {
    private final PostService postService;

    @GetMapping("/qnaboard")
    public List<PostResponseDto> qnaBoard() {
        return this.postService.findAllQnaBoardDesc();
    }

    @GetMapping("/qnaboard/post/{id}")
    public PostResponseDto qnaBoardPost(@PathVariable Long id) {
        return this.postService.findById(id);
    }

    @GetMapping("/qnaboard/form")
    public void qnaBoardForm() {

    }

    @GetMapping("/qnaboard/form/{id}")
    public PostResponseDto qnaBoardForm(@PathVariable Long id) {
        return this.postService.findById(id);
    }
}
