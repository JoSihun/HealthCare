package com.shyd.healthcare.controller.introduce;

import com.shyd.healthcare.dto.facility.FacilityResponseDto;
import com.shyd.healthcare.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/introduce")
public class FacilityController {
    private final FacilityService facilitiyService;

    @GetMapping("/facility")
    public List<FacilityResponseDto> facility() {
        return this.facilitiyService.findAllAsc();
    }

}