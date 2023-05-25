package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.board.BoardType;
import com.shyd.healthcare.domain.support.board.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    /** 카테고리별 게시판 목록조회 - List */
    List<Post> findAllByBoardType(BoardType boardType, Sort sort);
    Page<Post> findAllByBoardType(BoardType boardType, Pageable pageable);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByBoardTypeAndTitleContaining(BoardType boardType, String title, Pageable pageable);
    /** 내용으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByBoardTypeAndContentContaining(BoardType boardType, String content, Pageable pageable);
    /** 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByBoardTypeAndAuthorContaining(BoardType boardType, String author, Pageable pageable);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 제목 + 내용으로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByBoardTypeAndTitleContainingOrContentContaining(BoardType boardType, String title, String content, Pageable pageable);
    /** 제목 + 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByBoardTypeAndTitleContainingOrAuthorContaining(BoardType boardType, String title, String author, Pageable pageable);
    /** 내용 + 작성자로 검색, 카테고리별 게시판 목록조회 - Pageable */
    Page<Post> findAllByBoardTypeAndContentContainingOrAuthorContaining(BoardType boardType, String content, String author, Pageable pageable);
}
