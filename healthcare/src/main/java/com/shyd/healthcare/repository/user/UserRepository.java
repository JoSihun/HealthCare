package com.shyd.healthcare.repository.user;

import com.shyd.healthcare.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // ENTITY
    Optional<User> findByUsername(String username);
    List<User> findAllByNameContaining(String name, Sort sort);
    Page<User> findAllByNameContaining(String name, Pageable pageable);

    // BOOLEAN
    Boolean existsByName(String name);
    Boolean existsByUsername(String username);
}
