package com.shyd.healthcare.controller;

import com.shyd.healthcare.dto.bmi.BMISaveRequestDto;
import com.shyd.healthcare.dto.bmi.BMIUpdateRequestDto;
import com.shyd.healthcare.service.BMIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class BMIRestController {
    private final BMIService bmiService;

    /** POST REQUEST - header: "default" */
    @PostMapping("/api/v1/bmi")
    public Long saveBMI(@RequestHeader("Authorization") String token,
                        @RequestBody BMISaveRequestDto requestDto) {
        return this.bmiService.save(token, requestDto);
    }

    /** PUT REQUEST - header: "default" */
    @PutMapping("/api/v1/bmi/{id}")
    public Long updateBMI(@PathVariable Long id,
                          @RequestBody BMIUpdateRequestDto requestDto) {
        return this.bmiService.update(id, requestDto);
    }

    /** DELETE REQUEST - header: "default" */
    @DeleteMapping("/api/v1/bmi/{id}")
    public void deleteBMI(@PathVariable Long id) {
        this.bmiService.delete(id);
    }
}
