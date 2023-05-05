package com.shyd.healthcare.repository.introduce;

import com.shyd.healthcare.domain.introduce.Facility;
import com.shyd.healthcare.domain.introduce.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    Image findByFacility(Facility facility);
}
