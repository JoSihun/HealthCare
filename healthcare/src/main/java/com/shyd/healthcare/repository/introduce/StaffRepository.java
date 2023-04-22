package com.shyd.healthcare.repository.introduce;

import com.shyd.healthcare.domain.introduce.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}
