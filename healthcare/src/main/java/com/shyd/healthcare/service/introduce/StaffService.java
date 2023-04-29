package com.shyd.healthcare.service.introduce;

import com.shyd.healthcare.domain.introduce.Facility;
import com.shyd.healthcare.domain.introduce.Staff;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.introduce.facility.FacilitySaveRequestDto;
import com.shyd.healthcare.dto.introduce.facility.FacilityUpdateRequestDto;
import com.shyd.healthcare.dto.introduce.staff.StaffResponseDto;
import com.shyd.healthcare.dto.introduce.staff.StaffSaveRequestDto;
import com.shyd.healthcare.dto.introduce.staff.StaffUpdateRequestDto;
import com.shyd.healthcare.dto.user.UserResponseDto;
import com.shyd.healthcare.repository.introduce.StaffRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StaffService {
    private final UserRepository userRepository;
    private final StaffRepository staffRepository;

    /** 모든 자료 불러오기 오름차순 */
    @Transactional
    public List<StaffResponseDto> findAllAsc() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Staff> staffList = this.staffRepository.findAll(sort);
        return staffList.stream().map(StaffResponseDto::new).collect(Collectors.toList());
    }

    /** 모든 자료 불러오기 내림차순 */
    @Transactional
    public List<StaffResponseDto> findAllDesc() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Staff> staffList = this.staffRepository.findAll(sort);
        return staffList.stream().map(StaffResponseDto::new).collect(Collectors.toList());
    }

    /** Staff 저장 */
    @Transactional
    public Long save(Long userId, StaffSaveRequestDto requestDto) {
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수  없습니다. user_id = " + userId));
        requestDto.setUser(user);
        return this.staffRepository.save(requestDto.toEntity()).getId();
    }

    /** Staff 수정 */
    @Transactional
    public Long update(final Long id, final StaffUpdateRequestDto requestDto) {
        Staff entity = this.staffRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 정보는 존재하지 않습니다. id = " + id));
        return entity.update(requestDto);
    }

    /** Staff 삭제 */
    @Transactional
    public Long delete(final Long id) {
        Staff entity = this.staffRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 정보는 존재하지 않습니다. id = " + id));
        this.staffRepository.delete(entity);
        return id;
    }
}
