package com.shyd.healthcare.repository;

import com.shyd.healthcare.domain.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}
