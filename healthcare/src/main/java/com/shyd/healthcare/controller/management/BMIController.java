package com.shyd.healthcare.controller.management;

import com.shyd.healthcare.dto.management.bmi.BMIResponseDto;
import com.shyd.healthcare.service.management.BMIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BMIController {
    private final BMIService bmiService;

    /** GET REQUEST - header: "default" */
    @GetMapping("/api/v1/bmi/{id}")
    public BMIResponseDto readBMI(@PathVariable Long id) {
        return this.bmiService.findById(id);
    }
}
