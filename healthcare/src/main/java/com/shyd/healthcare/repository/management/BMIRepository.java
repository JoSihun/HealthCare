package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BMIRepository extends JpaRepository<BMI, Long> {
    List<BMI> findAllByUser(User user);
    Page<BMI> findAllByUser(User user, Pageable pageable);
}
