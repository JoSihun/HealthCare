package com.shyd.healthcare.controller.introduce;

import com.shyd.healthcare.dto.introduce.staff.StaffResponseDto;
import com.shyd.healthcare.service.introduce.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class StaffController {
    private final StaffService staffService;

    @GetMapping("/v1/staff")
    public List<StaffResponseDto> staff() {
        return this.staffService.findAllAsc();
    }


}
