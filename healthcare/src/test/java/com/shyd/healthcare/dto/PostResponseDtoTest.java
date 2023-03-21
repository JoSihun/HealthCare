package com.shyd.healthcare.dto;

import com.shyd.healthcare.domain.Post;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

class PostResponseDtoTest {
    @Test
    void postCreateTest() {
        Post post = Post.builder()
                .hits(10)
                .title("title")
                .content("content")
                .author("author")
                .build();
        assertThat(post.getHits()).isEqualTo(10);
        assertThat(post.getTitle()).isEqualTo("title");
        assertThat(post.getContent()).isEqualTo("content");
        assertThat(post.getAuthor()).isEqualTo("author");
    }

}