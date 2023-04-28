package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
    Food findByName(String foodName);
    Boolean existsByName(String foodName);
}
