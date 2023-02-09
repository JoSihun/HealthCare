package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.PostResponseDto;
import com.shyd.healthcare.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/support")
public class FAQController {
    private final PostService postService;

    @GetMapping("/faq")
    public List<PostResponseDto> faq() {
        return this.postService.findAllFaq();
    }
}
