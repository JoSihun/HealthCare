package com.shyd.healthcare.repository;

import com.shyd.healthcare.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    /** 카테고리별 게시판 목록조회 - Sort */
    List<Post> findAllByCategory(String category, Sort sort);

    /** 카테고리별 게시판 목록조회 - Page */
    Page<Post> findAllByCategory(String category, Pageable pageable);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findByCategoryAndTitleContaining(String category, String title, Pageable pageable);
    /** 내용으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findByCategoryAndContentContaining(String category, String content, Pageable pageable);
    /** 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findByCategoryAndAuthorContaining(String category, String author, Pageable pageable);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목 + 내용으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findByCategoryAndTitleContainingOrContentContaining(String category, String title, String content, Pageable pageable);
    /** 제목 + 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findByCategoryAndTitleContainingOrAuthorContaining(String category, String title, String author, Pageable pageable);
    /** 내용 + 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findByCategoryAndContentContainingOrAuthorContaining(String category, String content, String author, Pageable pageable);
    
}
