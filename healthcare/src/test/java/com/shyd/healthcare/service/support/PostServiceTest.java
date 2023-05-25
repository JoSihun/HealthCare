package com.shyd.healthcare.service.support;

import com.shyd.healthcare.domain.support.board.BoardType;
import com.shyd.healthcare.dto.support.post.PostSaveRequestDTO;
import com.shyd.healthcare.dto.user.AuthRequestDto;
import com.shyd.healthcare.dto.user.AuthResponseDto;
import com.shyd.healthcare.service.user.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PostServiceTest {
    @Autowired
    private AuthService authService;
    @Autowired
    private PostService postService;

    @Test
    void findAllByBoardType() {
    }

    @Test
    void testFindAllByBoardType() {
    }

    @Test
    void findAllByBoardTypeAndTitle() {
    }

    @Test
    void findAllByBoardTypeAndContent() {
    }

    @Test
    void findAllByBoardTypeAndAuthor() {
    }

    @Test
    void findAllByBoardTypeAndTitleOrContent() {
    }

    @Test
    void findAllByBoardTypeAndTitleOrAuthor() {
    }

    @Test
    void findAllByBoardTypeAndContentOrAuthor() {
    }

    @Test
    void findById() {
    }

    @Test
    @DisplayName("Test Data 대량 삽입")
    void createTestData() {
        AuthRequestDto authRequestDto = new AuthRequestDto("test3058", "test");
        AuthResponseDto authResponseDto = this.authService.login(authRequestDto);

        for (int i = 0; i < 300; i++) {
            PostSaveRequestDTO postSaveRequestDTO = new PostSaveRequestDTO();
            postSaveRequestDTO.setTitle("TestTitle" + (i + 1));
            postSaveRequestDTO.setContent("TestContent" + (i + 1));
            postSaveRequestDTO.setSecretYn((i % 2) == 0);                       // true, false, true, false
            postSaveRequestDTO.setAnswerYn((i % 4 == 0) || (i % 4 == 1));       // true, true, false, false

            postSaveRequestDTO.setBoardType(BoardType.FAQ_BOARD);
            this.postService.create("Bearer " + authResponseDto.getAccessToken(), postSaveRequestDTO);
            postSaveRequestDTO.setBoardType(BoardType.QNA_BOARD);
            this.postService.create("Bearer " + authResponseDto.getAccessToken(), postSaveRequestDTO);
            postSaveRequestDTO.setBoardType(BoardType.FREE_BOARD);
            this.postService.create("Bearer " + authResponseDto.getAccessToken(), postSaveRequestDTO);
        }
    }

    @Test
    void create() {

    }

    @Test
    void update() {
    }

    @Test
    void delete() {
    }
}