package com.shyd.healthcare.repository.introduce;

import com.shyd.healthcare.domain.introduce.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Long> {

}