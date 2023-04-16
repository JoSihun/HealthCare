package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.board.Category;
import com.shyd.healthcare.domain.support.board.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    /** 카테고리별 게시판 목록조회 - List */
    List<Post> findAllByCategory(String category, Sort sort);
    /** 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByCategory(String category, Pageable pageable);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByCategoryAndTitleContaining(String category, String title, Pageable pageable);
    /** 내용으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByCategoryAndContentContaining(String category, String content, Pageable pageable);
    /** 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByCategoryAndAuthorContaining(String category, String author, Pageable pageable);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목 + 내용으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByCategoryAndTitleContainingOrContentContaining(String category, String title, String content, Pageable pageable);
    /** 제목 + 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByCategoryAndTitleContainingOrAuthorContaining(String category, String title, String author, Pageable pageable);
    /** 내용 + 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByCategoryAndContentContainingOrAuthorContaining(String category, String content, String author, Pageable pageable);
}
