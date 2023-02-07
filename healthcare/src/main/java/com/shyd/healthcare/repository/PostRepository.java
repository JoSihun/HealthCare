package com.shyd.healthcare.repository;

import com.shyd.healthcare.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
