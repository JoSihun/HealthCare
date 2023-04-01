package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.support.board.Category;
import com.shyd.healthcare.dto.support.post.PostSaveRequestDto;
import com.shyd.healthcare.service.support.PostService;
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
    @DisplayName("save() 테스트")
    void saveTest() {
        PostSaveRequestDto requestDto1 = new PostSaveRequestDto(
                "TestTitle1", "TestContent1", "TestAuthor1", Category.FAQ_BOARD.name(), 1, true, true);;
        PostSaveRequestDto requestDto2 = new PostSaveRequestDto(
                "TestTitle2", "TestContent2", "TestAuthor2", Category.FAQ_BOARD.name(), 2, true, false);;
        PostSaveRequestDto requestDto3 = new PostSaveRequestDto(
                "TestTitle3", "TestContent3", "TestAuthor3", Category.FAQ_BOARD.name(), 3, false, true);;
        PostSaveRequestDto requestDto4 = new PostSaveRequestDto(
                "TestTitle4", "TestContent4", "TestAuthor4", Category.FAQ_BOARD.name(), 4, false, false);;
        this.postService.save(requestDto1);
        this.postService.save(requestDto2);
        this.postService.save(requestDto3);
        this.postService.save(requestDto4);
    }

    @Test
    @DisplayName("FAQ_BOARD 테스트 데이터 삽입")
    void saveTestDataFAQBoard() {
        for (int i = 0; i < 10; i++) {
            Integer hits = i + 1;
            String title = "FAQTestTitle" + (i + 1);
            String content = "FAQTestContent" + (i + 1);
            String author = "TestUserName" + (i + 1);
            Boolean secretYn = (i + 1) % 2 == 1;                        // true, false, true, false
            Boolean answerYn = (i + 1) % 4 == 1 || (i + 1) % 4 == 2;    // true, true, false, false
            PostSaveRequestDto requestDto = new PostSaveRequestDto(title, content, author,
                    Category.FAQ_BOARD.name(), hits, secretYn, answerYn);
            this.postService.save(requestDto);
        }
    }

    @Test
    @DisplayName("QNA_BOARD 테스트 데이터 삽입")
    void saveTestDataQNABoard() {
        for (int i = 0; i < 300; i++) {
            Integer hits = i + 1;
            String title = "Q&ATestTitle" + (i + 1);
            String content = "Q&ATestContent" + (i + 1);
            String author = "TestUserName" + (i + 1);
            Boolean secretYn = (i + 1) % 2 == 1;                        // true, false, true, false
            Boolean answerYn = (i + 1) % 4 == 1 || (i + 1) % 4 == 2;    // true, true, false, false
            PostSaveRequestDto requestDto = new PostSaveRequestDto(title, content, author,
                    Category.QNA_BOARD.name(), hits, secretYn, answerYn);
            this.postService.save(requestDto);
        }
    }

    @Test
    @DisplayName("FREE_BOARD 테스트 데이터 삽입")
    void saveTestDataFreeBoard() {
        for (int i = 0; i < 300; i++) {
            Integer hits = i + 1;
            String title = "FreeBoardTestTitle" + (i + 1);
            String content = "FreeBoardTestContent" + (i + 1);
            String author = "TestUserName" + (i + 1);
            Boolean secretYn = (i + 1) % 2 == 1;                        // true, false, true, false
            Boolean answerYn = (i + 1) % 4 == 1 || (i + 1) % 4 == 2;    // true, true, false, false
            PostSaveRequestDto requestDto = new PostSaveRequestDto(title, content, author,
                    Category.FREE_BOARD.name(), hits, secretYn, answerYn);
            this.postService.save(requestDto);
        }
    }
}