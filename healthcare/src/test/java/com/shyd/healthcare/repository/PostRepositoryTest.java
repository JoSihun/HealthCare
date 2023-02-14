package com.shyd.healthcare.repository;

import com.shyd.healthcare.domain.Post;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class PostRepositoryTest {
    @Autowired
    private PostRepository postRepository;

    @Test
    void postJpaSaveTest() {
        Post p1 = new Post("TestTitle1", "TestContent1", "TestAuthor1", "FAQBoard", 1,  true);
        Post p2 = new Post("TestTitle2", "TestContent2", "TestAuthor2", "QNABoard", 2,  true);
        Post p3 = new Post("TestTitle3", "TestContent3", "TestAuthor3", "FreeBoard", 3, false);
        Post p4 = new Post("TestTitle4", "TestContent4", "TestAuthor4", "FreeBoard", 4, false);
        this.postRepository.save(p1);
        this.postRepository.save(p2);
        this.postRepository.save(p3);
        this.postRepository.save(p4);
    }

    @Test
    void postJpaReadTest() {
        List<Post> postList = this.postRepository.findAll();
        Post p1 = postList.get(0);
        Post p2 = postList.get(1);
        Post p3 = postList.get(2);
        Post p4 = postList.get(3);

        assertThat(p1.getTitle()).isEqualTo("TestTitle1");
        assertThat(p2.getTitle()).isEqualTo("TestTitle2");
        assertThat(p3.getTitle()).isEqualTo("TestTitle3");
        assertThat(p4.getTitle()).isEqualTo("TestTitle4");

        assertThat(p1.getContent()).isEqualTo("TestContent1");
        assertThat(p2.getContent()).isEqualTo("TestContent2");
        assertThat(p3.getContent()).isEqualTo("TestContent3");
        assertThat(p4.getContent()).isEqualTo("TestContent4");

        assertThat(p1.getAuthor()).isEqualTo("TestAuthor1");
        assertThat(p2.getAuthor()).isEqualTo("TestAuthor2");
        assertThat(p3.getAuthor()).isEqualTo("TestAuthor3");
        assertThat(p4.getAuthor()).isEqualTo("TestAuthor4");

        assertThat(p1.getHits()).isEqualTo(1);
        assertThat(p2.getHits()).isEqualTo(2);
        assertThat(p3.getHits()).isEqualTo(3);
        assertThat(p4.getHits()).isEqualTo(4);

        assertThat(p1.getSecretYn()).isEqualTo(true);
        assertThat(p2.getSecretYn()).isEqualTo(true);
        assertThat(p3.getSecretYn()).isEqualTo(false);
        assertThat(p4.getSecretYn()).isEqualTo(false);
    }
}