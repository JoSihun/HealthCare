package com.shyd.healthcare.controller.introduce;

import com.shyd.healthcare.dto.introduce.facility.FacilityResponseDto;
import com.shyd.healthcare.dto.introduce.facility.FacilitySaveRequestDto;
import com.shyd.healthcare.dto.introduce.facility.FacilityUpdateRequestDto;
import com.shyd.healthcare.service.introduce.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class FacilityController {
    private final FacilityService facilitiyService;

    /** Facility 오름차순 조회 */
    @GetMapping("/v1/facility")
    public List<FacilityResponseDto> facility() {
        return this.facilitiyService.findAllAsc();
    }

    /** Facility 삽입 API */
    @PostMapping("/v1/facility")
    public Long saveFacility(@RequestBody FacilitySaveRequestDto requestDto) {
        return this.facilitiyService.save(requestDto);
    }

    /** Facility 수정 API */
    @PutMapping("/v1/facility/{id}")
    public Long updateFacility(@PathVariable Long id,
                               @RequestBody FacilityUpdateRequestDto requestDto) {
        return this.facilitiyService.update(id, requestDto);
    }

    /** Facility 삭제 API */
    @DeleteMapping("/v1/facility/{id}")
    public Long deleteFacility(@PathVariable Long id) {
        return this.facilitiyService.delete(id);
    }
}