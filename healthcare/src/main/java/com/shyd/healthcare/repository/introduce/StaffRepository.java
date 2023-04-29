package com.shyd.healthcare.repository.introduce;

import com.shyd.healthcare.domain.introduce.Staff;
import com.shyd.healthcare.domain.support.board.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}
