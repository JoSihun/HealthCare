package com.shyd.healthcare.dto;

import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.post.PostResponseDto;
import com.shyd.healthcare.repository.support.PostRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PostResponseDtoTest {
    @Autowired
    private PostRepository postRepository;

    @Test
    @DisplayName("ResponseDTO 변환 테스트")
    void convertEntityToDTOTest() {
        User user = User.builder()
                .username("TestUser")
                .email("test@test.com")
                .contact("010-1234-5678")
                .role(Role.ROLE_USER)
                .build();
        Post post = Post.builder()
                .author(user)
                .title("TestTitle")
                .content("TestContent")
                .build();

        PostResponseDto responseDTO = new PostResponseDto(post);
        assertThat(responseDTO.getId()).isEqualTo(post.getId());
        assertThat(responseDTO.getTitle()).isEqualTo(post.getTitle());
        assertThat(responseDTO.getContent()).isEqualTo(post.getContent());
        assertThat(responseDTO.getAuthor()).isEqualTo(post.getAuthor());
    }

}