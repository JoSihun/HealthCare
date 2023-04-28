package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.Diet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DietRepository extends JpaRepository<Diet, Long> {
}
