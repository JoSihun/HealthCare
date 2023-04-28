package com.shyd.healthcare.service.management;

import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.domain.management.Food;
import com.shyd.healthcare.dto.management.food.FoodRequestDto;
import com.shyd.healthcare.dto.management.food.FoodResponseDto;
import com.shyd.healthcare.repository.management.BMIRepository;
import com.shyd.healthcare.repository.management.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodService {
    private final BMIRepository bmiRepository;
    private final FoodRepository foodRepository;

    /*
    메뉴 추천 알고리즘
    # 일반적인 기초대사량 계산식(Kcal)
    남성: 체중 x 1.0 x 24
    여성: 체중 x 0.9 x 24

    # 헬스장 기계 기초대사량 측정 방식(Katch-McArdle 방정식)
    제지방량 = 체중 - 체지방량
    기초대사량 = 370 + (21.6 x 제지방량)

    # 일일 권장 섭취 칼로리(Kcal)
    기초대사량 X 1.20	// 좌식생활(전혀 운동하지 않음)
    기초대사량 X 1.375	// 가벼운 활동(주 1~3일 운동)
    기초대사량 X 1.55	// 적당한 활동(주 3~5일 운동)
    기초대사량 X 1.725	// 격렬한 활동(주 6~7일 운동)
    기초대사량 X 1.90	// 운동선수(스포츠 선수)

    # 기타사항
    1) 한 끼 기준 500kcal 를 넘지 않는 것이 좋다

    # 보건복지부 01_pdf 참고
    https://www.mohw.go.kr/react/jb/sjb030301vw.jsp?PAR_MENU_ID=03&MENU_ID=032901&CONT_SEQ=362385
     */
    /** 메뉴 추천 알고리즘 */
    @Transactional
    public List<FoodResponseDto> recommend(Integer basalMetabolicRate, Integer count) {
        // SET THE RECOMMENDED DAILY INTAKE FOR CALORIES
        Double minCaloIntake = Math.ceil(basalMetabolicRate * 1.55 - 200) / 3 / 3;
        Double maxCaloIntake = Math.ceil(basalMetabolicRate * 1.55 + 200) / 3 / 3;

        // FETCH AND FILTER THE LIST OF DIET OBJECTS BY CRITERIA
        List<Food> foods = this.foodRepository.findAll();
        List<Food> filteredFoods = foods.stream()
                .filter(diet -> !diet.getName().contains("과자"))
                .filter(diet -> minCaloIntake <= diet.getCalories() && diet.getCalories() <= maxCaloIntake)
                .collect(Collectors.toList());

        // SORT AND SHUFFLE THE FILTERED LIST BY DESCENDING ORDER OF CALORIES
        filteredFoods.sort(Comparator.comparing(Food::getCalories).reversed());
        Collections.shuffle(filteredFoods);

        // RETURN TOP COUNT DIETS RESPONSE DTO THAT MEET ALL CRITERIA
        return filteredFoods.stream().limit(count).map(FoodResponseDto::new).collect(Collectors.toList());
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 메뉴 데이터 조회 */
    @Transactional
    public FoodResponseDto findById(Long id) {
        Food food = this.foodRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 메뉴이 존재하지 않습니다. diet_id = " + id));
        return new FoodResponseDto(food);
    }

    /** 메뉴 데이터 목록조회 */
    @Transactional
    public List<FoodResponseDto> findAll() {
        List<Food> foods = this.foodRepository.findAll();
        return foods.stream().map(FoodResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 메뉴 데이터 삽입 */
    @Transactional
    public Long create(FoodRequestDto requestDto) {
        return this.foodRepository.save(requestDto.toEntity()).getId();
    }

    /** 메뉴 데이터 수정 */
    @Transactional
    public Long update(Long id, FoodRequestDto requestDto) {
        Food food = this.foodRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 메뉴이 존재하지 않습니다. diet_id = " + id));
        food.update(requestDto);
        return food.getId();
    }

    /** 메뉴 데이터 삭제 */
    @Transactional
    public void delete(Long id) {
        Food food = this.foodRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 메뉴이 존재하지 않습니다. diet_id = " + id));
        this.foodRepository.delete(food);
    }
}
