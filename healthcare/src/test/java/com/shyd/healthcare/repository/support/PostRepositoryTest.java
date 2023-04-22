package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.board.Category;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.dto.support.post.PostSaveRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PostRepositoryTest {
    @Autowired
    private PostRepository postRepository;

//    @Test
//    @DisplayName("Enum Class 를 사용하여 데이터 저장")
//    void saveTest() {
//        PostSaveRequestDto requestDto = new PostSaveRequestDto("TestTitle", "TestContent", "TestAuthor",
//                Category.FREE_BOARD.name(), 0, true, true);
//        Post savedPost = this.postRepository.save(requestDto.toEntity());
//        assertThat(savedPost.getCategory()).isEqualTo(Category.FREE_BOARD);
//    }

    @Test
    @DisplayName("Enum Class 를 사용하여 데이터 필터링")
    void findAllByCategory() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Post> foundPostList = this.postRepository.findAllByCategory(Category.FREE_BOARD.name(), sort);
        for (Post foundPost : foundPostList) {
            assertThat(foundPost.getCategory()).isEqualTo(Category.FREE_BOARD);
        }
    }

    @Test
    void testFindAllByCategory() {
    }

    @Test
    void findAllByCategoryAndTitleContaining() {
    }

    @Test
    void findAllByCategoryAndContentContaining() {
    }

    @Test
    void findAllByCategoryAndAuthorContaining() {
    }

    @Test
    void findAllByCategoryAndTitleContainingOrContentContaining() {
    }

    @Test
    void findAllByCategoryAndTitleContainingOrAuthorContaining() {
    }

    @Test
    void findAllByCategoryAndContentContainingOrAuthorContaining() {
    }
}