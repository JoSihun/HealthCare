package com.shyd.healthcare.controller.introduce;

import com.shyd.healthcare.dto.introduce.facility.FacilityResponseDto;
import com.shyd.healthcare.dto.introduce.facility.FacilitySaveRequestDto;
import com.shyd.healthcare.service.introduce.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class FacilityController {
    private final FacilityService facilitiyService;

    @GetMapping("/v1/facility")
    public List<FacilityResponseDto> facility() {
        return this.facilitiyService.findAllAsc();
    }

    @PostMapping("/v1/facility")
    public Long saveFacility(@RequestBody FacilitySaveRequestDto requestDto) {
        return this.facilitiyService.save(requestDto);
    }
}