package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.PostSaveRequestDto;
import com.shyd.healthcare.dto.PostUpdateRequestDto;
import com.shyd.healthcare.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class PostRestController {
    private final PostService postService;

    @PostMapping("/api/post")
    public Long postSave(PostSaveRequestDto requestDto) {
        return this.postService.save(requestDto);
    }

    @PutMapping("/api/post/{id}")
    public Long postUpdate(@PathVariable Long id, PostUpdateRequestDto requestDto) {
        return this.postService.update(id, requestDto);
    }

    @DeleteMapping("/api/post/{id}")
    public Long postDelete(@PathVariable Long id) {
        return this.postService.delete(id);
    }
}
