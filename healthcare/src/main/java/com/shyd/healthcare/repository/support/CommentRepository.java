package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.board.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
