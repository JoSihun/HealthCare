package com.shyd.healthcare.service.introduce;

import com.shyd.healthcare.domain.introduce.Facility;
import com.shyd.healthcare.domain.introduce.Image;
import com.shyd.healthcare.dto.introduce.facility.FacilityResponseDto;
import com.shyd.healthcare.dto.introduce.facility.FacilitySaveRequestDto;
import com.shyd.healthcare.dto.introduce.facility.FacilityUpdateRequestDto;
import com.shyd.healthcare.repository.introduce.FacilityRepository;
import com.shyd.healthcare.repository.introduce.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FacilityService {
    private final ImageRepository imageRepository;
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 시설 생성 */
    @Transactional
    public Long create(Long imageId, FacilitySaveRequestDto requestDto) {
        Image image = this.imageRepository.findById(imageId).orElseThrow(
                () -> new IllegalArgumentException("해당 이미지를 찾을 수 없습니다. image_id = " + imageId));
        requestDto.setImage(image);
        return this.facilityRepository.save(requestDto.toEntity()).getId();
    }

    /** 시설 수정 */
    @Transactional
    public Long update(Long id, FacilityUpdateRequestDto requestDto) {
        Facility entity = this.facilityRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 시설이 존재하지 않습니다. facility_id = " + id));
        return entity.update(requestDto);
    }

    /** 시설 삭제 */
    @Transactional
    public void delete(final Long id) {
        Facility entity = this.facilityRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 시설이 존재하지 않습니다. facility_id = " + id));
        this.facilityRepository.delete(entity);
    }
}