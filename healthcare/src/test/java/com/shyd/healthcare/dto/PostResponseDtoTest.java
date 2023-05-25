package com.shyd.healthcare.dto;

import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.post.PostResponseDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PostResponseDTOTest {
    @Test
    @DisplayName("Entity to ResponseDTO 테스트")
    void convertEntity2ResponseDTOTest() {
        User user = User.builder()
                .name("홍길동")
                .username("TestUser")
                .email("test@test.com")
                .contact("010-1234-5678")
                .role(Role.ROLE_USER)
                .build();
        Post post = Post.builder()
                .hits(0)
                .author(user)
                .answerYn(false)
                .secretYn(false)
                .title("TestTitle")
                .content("TestContent")
                .build();
        PostResponseDTO responseDTO = new PostResponseDTO(post);
        assertThat(responseDTO.getHits()).isEqualTo(post.getHits());
        assertThat(responseDTO.getTitle()).isEqualTo(post.getTitle());
        assertThat(responseDTO.getContent()).isEqualTo(post.getContent());
        assertThat(responseDTO.getAnswerYn()).isEqualTo(post.getAnswerYn());
        assertThat(responseDTO.getSecretYn()).isEqualTo(post.getSecretYn());
        assertThat(responseDTO.getAuthor()).isEqualTo(user.getName());
        assertThat(responseDTO.getAuthor()).isEqualTo(post.getAuthor().getName());
    }

}