package com.shyd.healthcare.service.management;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.management.Food;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.management.diet.DietRequestDto;
import com.shyd.healthcare.dto.management.diet.DietResponseDto;
import com.shyd.healthcare.dto.management.food.FoodResponseDto;
import com.shyd.healthcare.repository.management.DietRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DietService {
    private final UserRepository userRepository;
    private final DietRepository dietRepository;

    /** 식단 조회 */
    @Transactional
    public List<FoodResponseDto> findById(Long id) {
        Diet diet = this.dietRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 식단이 존재하지 않습니다. diet_id = " + id));
        return diet.getFoods().stream().map(FoodResponseDto::new).collect(Collectors.toList());
    }

    /** 식단 목록조회 */
    @Transactional
    public List<DietResponseDto> findByUserId(Long id) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. user_id = " + id));
        return user.getDiets().stream().map(DietResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 식단 생성 */
    @Transactional
    public Long create(Long id, DietRequestDto requestDto) {
        // USER_ID 필요
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. user_id = " + id));
        requestDto.setUser(user);
        return this.dietRepository.save(requestDto.toEntity()).getId();
    }

    /** 식단 삭제 */
    @Transactional
    public void delete(Long id) {
        Diet diet = this.dietRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 식단이 존재하지 않습니다. diet_id = " + id));
        this.dietRepository.delete(diet);
    }
}
