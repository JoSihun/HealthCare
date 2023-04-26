package com.shyd.healthcare.service.management;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.dto.management.diet.DietRequestDto;
import com.shyd.healthcare.dto.management.diet.DietResponseDto;
import com.shyd.healthcare.repository.management.DietRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DietService {
    private final DietRepository dietRepository;

    /** 식단 데이터 조회 */
    @Transactional
    public DietResponseDto findById(Long id) {
        Diet diet = this.dietRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 식단이 존재하지 않습니다. diet_id = " + id));
        return new DietResponseDto(diet);
    }

    /** 식단 데이터 조회 */
    @Transactional
    public List<DietResponseDto> findAll() {
        List<Diet> diets = this.dietRepository.findAll();
        return diets.stream().map(DietResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 식단 데이터 삽입 */
    @Transactional
    public Long create(DietRequestDto requestDto) {
        return this.dietRepository.save(requestDto.toEntity()).getId();
    }

    /** 식단 데이터 수정 */
    @Transactional
    public Long update(Long id, DietRequestDto requestDto) {
        Diet diet = this.dietRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 식단이 존재하지 않습니다. diet_id = " + id));
        diet.update(requestDto);
        return diet.getId();
    }

    /** 식단 데이터 삭제 */
    @Transactional
    public void delete(Long id) {
        Diet diet = this.dietRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 식단이 존재하지 않습니다. diet_id = " + id));
        this.dietRepository.delete(diet);
    }
}
