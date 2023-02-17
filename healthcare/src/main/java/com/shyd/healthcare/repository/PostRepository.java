package com.shyd.healthcare.repository;

import com.shyd.healthcare.domain.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    /* 카테고리별 게시판 목록보기 - Sort */
    List<Post> findAllByCategory(String category, Sort sort);
}
