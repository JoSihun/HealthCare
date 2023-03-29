package com.shyd.healthcare.service;

import com.shyd.healthcare.dto.post.PostSaveRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PostServiceTest {
    @Autowired
    private PostService postService;

    @Test
    void save() {
    }

    @Test
    @DisplayName("대용량 데이터 삽입 테스트")
    void saveHugeData() {
        Boolean secretYn = false;
        String category = "QNABoard";
        for (int i = 0; i < 300; i++) {
            Integer hits = i + 1;
            String title = "TestTitle" + (i + 1);
            String content = "TestContent" + (i + 1);
            String author = "TestUserName" + (i + 1);
            PostSaveRequestDto requestDto = new PostSaveRequestDto(title, content, author, hits, category, secretYn);
            this.postService.save(requestDto);
        }
    }

    @Test
    void update() {
    }

    @Test
    void delete() {
    }
}