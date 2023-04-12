package com.shyd.healthcare.repository;

import com.shyd.healthcare.domain.BMI;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BMIRepository extends JpaRepository<BMI, Long> {
}
