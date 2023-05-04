package com.shyd.healthcare.controller.management;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.dto.management.bmi.BMIResponseDto;
import com.shyd.healthcare.service.management.BMIService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BMIController {
    private final BMIService bmiService;
    private final JwtTokenProvider jwtTokenProvider;

    /** GET REQUEST - header: "default" */
    @GetMapping("/api/v1/bmi/{id}")
    public BMIResponseDto readBMI(@PathVariable Long id) {
        return this.bmiService.findById(id);
    }

    @GetMapping("/api/v1/bmi/list")
    public List<BMIResponseDto> fetchBMIList(@RequestHeader("Authorization") String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        return this.bmiService.findAllByUserId(id);
    }

    @GetMapping("/api/v1/bmi/page")
    public Page<BMIResponseDto> fetchBMIPage(@RequestHeader("Authorization") String accessToken,
                                           @PageableDefault(sort = "createdDate", size = 20, direction = Sort.Direction.DESC) Pageable pageable) {
        return this.bmiService.findAllByAccessToken(accessToken, pageable);
    }
}
