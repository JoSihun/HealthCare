package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    Food findByName(String foodName);
    Boolean existsByName(String foodName);
    List<Food> findAllByCaloriesBetween(Double minCalories, Double maxCalories, Sort sort);
    Page<Food> findAllByCaloriesBetween(Double minCalories, Double maxCalories, Pageable pageable);
}
