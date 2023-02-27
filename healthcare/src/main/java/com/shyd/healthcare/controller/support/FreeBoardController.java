package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.attachment.AttachmentResponseDto;
import com.shyd.healthcare.dto.post.PostResponseDto;
import com.shyd.healthcare.service.AttachmentService;
import com.shyd.healthcare.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/support")
public class FreeBoardController {
    private final PostService postService;
    private final AttachmentService attachmentService;

//    @GetMapping("/freeboard")
//    public List<PostResponseDto> freeBoard() {
//        return this.postService.findAllFreeBoardDesc();
//    }

    @GetMapping("/freeboard")
    public Page<PostResponseDto> freeBoard(
            @PageableDefault(sort = "id", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return this.postService.findAllFreeBoardDesc(pageable);
    }

    @GetMapping("/freeboard/?page={page}&size={size}")
    public Page<PostResponseDto> freeBoardPage(Pageable pageable) {
        return this.postService.findAllFreeBoardDesc(pageable);
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
        return this.postService.findById(id);
    }
}
