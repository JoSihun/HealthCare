package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.board.BoardType;
import com.shyd.healthcare.domain.support.board.Post;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PostRepositoryTest {
    @Autowired
    private PostRepository postRepository;

    @Test
    @DisplayName("PostRepository.save() 테스트")
    void saveTest() {
        Post post = this.postRepository.save(Post.builder()
                        .hits(0)
                        .answerYn(false)
                        .secretYn(false)
                        .title("TestTitle")
                        .content("TestContent")
                        .boardType(BoardType.FREE_BOARD)
                .build());

        assertThat(post.getHits()).isEqualTo(0);
        assertThat(post.getAnswerYn()).isEqualTo(false);
        assertThat(post.getSecretYn()).isEqualTo(false);
        assertThat(post.getTitle()).isEqualTo("TestTitle");
        assertThat(post.getContent()).isEqualTo("TestContent");
        assertThat(post.getBoardType()).isEqualTo(BoardType.FREE_BOARD);
        this.postRepository.delete(post);
    }

    @Test
    @DisplayName("Enum Class BoardType 을 사용한 데이터 필터링 - List")
    void findAllByBoardType1() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Post> posts = this.postRepository.findAllByBoardType(BoardType.FREE_BOARD, sort);
        for (Post post : posts) {
            assertThat(post.getBoardType()).isEqualTo(BoardType.FREE_BOARD);
        }
    }

    @Test
    @DisplayName("Enum Class BoardType 을 사용한 데이터 필터링 - Page")
    void findAllByBoardType2() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Pageable pageable = PageRequest.of(0, 20, sort);
        Page<Post> posts = this.postRepository.findAllByBoardType(BoardType.FREE_BOARD, pageable);

        assertThat(posts.getSize()).isEqualTo(20);
        for (Post post : posts.getContent()) {
            assertThat(post.getBoardType()).isEqualTo(BoardType.FREE_BOARD);
        }
    }

    @Test
    void findAllByBoardTypeAndTitleContaining() {
    }

    @Test
    void findAllByBoardTypeAndContentContaining() {
    }

    @Test
    void findAllByBoardTypeAndAuthorContaining() {
    }

    @Test
    void findAllByBoardTypeAndTitleContainingOrContentContaining() {
    }

    @Test
    void findAllByBoardTypeAndTitleContainingOrAuthorContaining() {
    }

    @Test
    void findAllByBoardTypeAndContentContainingOrAuthorContaining() {
    }



}