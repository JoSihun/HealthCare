package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Facility;
import com.shyd.healthcare.dto.facility.FacilityResponseDto;
import com.shyd.healthcare.dto.facility.FacilitySaveRequestDto;
import com.shyd.healthcare.dto.facility.FacilityUpdateRequestDto;
import com.shyd.healthcare.repository.FacilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FacilityService {
    private final FacilityRepository facilityRepository;

    /** 모든 자료 불러오기 오름차순 */
    @Transactional
    public List<FacilityResponseDto> findAllAsc() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<Facility> facilityList = this.facilityRepository.findAll(sort);
        return facilityList.stream().map(FacilityResponseDto::new).collect(Collectors.toList());
    }

    /** 모든 자료 불러오기 내림차순 */
    @Transactional
    public List<FacilityResponseDto> findAllDesc() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Facility> facilityList = this.facilityRepository.findAll(sort);
        return facilityList.stream().map(FacilityResponseDto::new).collect(Collectors.toList());
    }
    
    //추가기능 수정기능, 삭제기능 구현필요
    /** Facility 저장 */
    @Transactional
    public Long save(final FacilitySaveRequestDto requestDto) {
        return this.facilityRepository.save(requestDto.toEntity()).getId();
    }

    /** Facility 수정 */
    @Transactional
    public Long update(final Long id, final FacilityUpdateRequestDto requestDto) {
        Facility entity = this.facilityRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        return entity.update(requestDto);
    }

    /** Facility 삭제 */
    @Transactional
    public Long delete(final Long id) {
        Facility entity = this.facilityRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + id));
        this.facilityRepository.delete(entity);
        return id;
    }
}