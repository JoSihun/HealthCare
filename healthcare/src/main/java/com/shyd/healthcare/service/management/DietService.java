package com.shyd.healthcare.service.management;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.management.DietFood;
import com.shyd.healthcare.domain.management.Food;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.management.diet.DietRequestDto;
import com.shyd.healthcare.dto.management.diet.DietResponseDto;
import com.shyd.healthcare.repository.management.DietFoodRepository;
import com.shyd.healthcare.repository.management.DietRepository;
import com.shyd.healthcare.repository.management.FoodRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DietService {
    private final UserRepository userRepository;
    private final DietRepository dietRepository;
    private final FoodRepository foodRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final DietFoodRepository dietFoodRepository;

    /** 식단 조회 */
    @Transactional
    public DietResponseDto findById(Long id) {
        Diet diet = this.dietRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 식단이 존재하지 않습니다. diet_id = " + id));
        return new DietResponseDto(diet);
    }

    /** 식단 목록조회 - List */
    @Transactional
    public List<DietResponseDto> findAllByUser(String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. user_id = " + id));
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Diet> diets = this.dietRepository.findAllByUser(user, sort);
        return diets.stream().map(DietResponseDto::new).collect(Collectors.toList());
    }

    /** 식단 목록조회 - Page */
    @Transactional
    public Page<DietResponseDto> findAllByUser(String accessToken, Pageable pageable) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. user_id = " + id));
        Page<Diet> diets = this.dietRepository.findAllByUser(user, pageable);
        return diets.map(DietResponseDto::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 식단 생성 */
    @Transactional
    public Long create(String accessToken, DietRequestDto requestDto) {
        // FIND USER BY USER_ID FROM ACCESS_TOKEN
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. user_id = " + id));

        // SAVE NEW DIET ENTITY AND FIND FOOD ENTITIES TO CONNECT THEM
        Diet diet = this.dietRepository.save(Diet.builder()
                .user(user)                                                             // 해당유저
                .title(requestDto.getTitle())                                           // 식단타이틀
                .totalCalories(requestDto.getTotalCalories())                           // 칼로리총합
                .basalMetabolicRate(requestDto.getBasalMetabolicRate())                 // 기초대사량
                .recommendedCaloriesIntake(requestDto.getRecommendedCaloriesIntake())   // 권장섭취량
                .build());

        // SAVE DIET_FOOD ENTITIES WHICH IS CONNECTED WITH DIET ENTITY AND FOOD ENTITIES
        List<Food> foods = this.foodRepository.findAllById(requestDto.getFoodIds());
        foods.stream()
                .map(food -> DietFood.builder().diet(diet).food(food).build())
                .forEach(this.dietFoodRepository::save);

        // RETURN NEW DIET ENTITY ID
        return diet.getId();
    }

    /** 식단 수정 */
    @Transactional
    public Long update(Long id, DietRequestDto requestDto) {
        // FIND DIET BY DIET ID
        Diet diet = this.dietRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 식단이 존재하지 않습니다. diet_id = " + id));

        // CHECK IF WHEN DIET_FOOD IS CHANGED, IF DIET_FOOD ENTITIES REMAINED OR NOT
        // this.dietFoodRepository.deleteAll(diet.getDietFoods());

        // FIND FOODS BY FOOD IDS
        List<Food> foods = this.foodRepository.findAllById(requestDto.getFoodIds());
        List<DietFood> dietFoods = foods.stream()
                .map(food -> DietFood.builder()
                        .diet(diet)
                        .food(food).build())
                .collect(Collectors.toList());

        // UPDATE DIET AND DIET_FOOD
        diet.update(requestDto);
        diet.updateDietFoods(dietFoods);

        // RETURN UPDATED DIET ENTITY ID
        return id;
    }

    /** 식단 삭제 */
    @Transactional
    public void delete(Long id) {
        this.dietRepository.delete(this.dietRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 식단이 존재하지 않습니다. diet_id = " + id)));
    }
}
