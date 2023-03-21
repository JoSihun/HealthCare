package com.shyd.healthcare.repository;

import com.shyd.healthcare.domain.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Long> {

}