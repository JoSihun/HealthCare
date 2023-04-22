package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.BMI;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.bmi.BMIResponseDto;
import com.shyd.healthcare.dto.bmi.BMISaveRequestDto;
import com.shyd.healthcare.dto.bmi.BMIUpdateRequestDto;
import com.shyd.healthcare.repository.BMIRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import com.shyd.healthcare.config.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class BMIService {
    private final BMIRepository bmiRepository;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /** BMI 데이터 조회 */
    @Transactional
    public BMIResponseDto findById(final Long id) {
        BMI entity = this.bmiRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 BMI 데이터가 존재하지 않습니다. bmi_id = " + id));
        return new BMIResponseDto(entity);
    }

    /** BMI 데이터 생성 */
    @Transactional
    public Long save(String token, final BMISaveRequestDto requestDto) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Long userId = this.jwtTokenProvider.getUserIdFromToken(token);
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        requestDto.setUser(user);
        return this.bmiRepository.save(requestDto.toEntity()).getId();
    }

    /** BMI 데이터 수정 */
    @Transactional
    public Long update(final Long id, final BMIUpdateRequestDto requestDto) {
        BMI entity = this.bmiRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 BMI 데이터가 존재하지 않습니다. bmi_id = " + id));
        return entity.update(requestDto);
    }

    /** BMI 데이터 삭제 */
    @Transactional
    public void delete(final Long id) {
        BMI entity = this.bmiRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 BMI 데이터가 존재하지 않습니다. bmi_id = " + id));
        this.bmiRepository.delete(entity);
    }
}
