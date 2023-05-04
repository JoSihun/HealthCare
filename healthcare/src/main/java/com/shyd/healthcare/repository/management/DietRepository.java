package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DietRepository extends JpaRepository<Diet, Long> {
    List<Diet> findAllByUser(User user, Sort sort);
    Page<Diet> findAllByUser(User user, Pageable pageable);
}
