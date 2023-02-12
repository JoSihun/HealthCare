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
public class FAQBoardController {
    private final PostService postService;

    @GetMapping("/faqboard")
    public List<PostResponseDto> faqBoard() {
        return this.postService.findAllFaq();
    }

    @GetMapping("/faqboard/form")
    public void faqBoardForm() {

    }

    @GetMapping("/faqboard/form/{id}")
    public PostResponseDto faqBoardForm(@PathVariable Long id) {
        return null;
    }
}
