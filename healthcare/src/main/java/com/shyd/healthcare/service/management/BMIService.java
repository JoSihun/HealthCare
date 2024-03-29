package com.shyd.healthcare.service.management;

import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.management.bmi.BMIResponseDto;
import com.shyd.healthcare.dto.management.bmi.BMISaveRequestDto;
import com.shyd.healthcare.dto.management.bmi.BMIUpdateRequestDto;
import com.shyd.healthcare.repository.management.BMIRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import com.shyd.healthcare.config.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

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

    /** BMI 데이터 목록조회 - List */
    @Transactional
    public List<BMIResponseDto> findAllByUserId(Long id) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        return user.getBmis().stream().map(BMIResponseDto::new).collect(Collectors.toList());
    }

    /** BMI 데이터 목록조회 - Page */
    @Transactional
    public Page<BMIResponseDto> findAllByAccessToken(String accessToken, Pageable pageable) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        Page<BMI> bmis = this.bmiRepository.findAllByUser(user, pageable);
        return bmis.map(BMIResponseDto::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
