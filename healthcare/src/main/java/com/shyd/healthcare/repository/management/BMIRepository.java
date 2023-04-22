package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.BMI;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BMIRepository extends JpaRepository<BMI, Long> {
}
