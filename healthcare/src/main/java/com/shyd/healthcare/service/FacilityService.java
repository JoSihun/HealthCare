package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Facility;
import com.shyd.healthcare.dto.facility.FacilityResponseDto;
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

}