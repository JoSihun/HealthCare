package com.shyd.healthcare.controller.introduce;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.introduce.staff.StaffResponseDto;
import com.shyd.healthcare.dto.introduce.staff.StaffSaveRequestDto;
import com.shyd.healthcare.dto.user.UserResponseDto;
import com.shyd.healthcare.service.introduce.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class StaffController {
    private final StaffService staffService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/v1/staff")
    public List<StaffResponseDto> staffList() {
        return this.staffService.findAllAsc();
    }

    @PostMapping("/v1/staff/{userId}")
    public Long createStaff(@PathVariable Long userId,
                            @RequestBody StaffSaveRequestDto requestDto) {
        return this.staffService.save(userId, requestDto);
    }

    @DeleteMapping("/v1/staff/{id}")
    public Long deleteStaff(@PathVariable Long id) {
        return this.staffService.delete(id);
    }

//    @PostMapping("/v1/staff")
//    public Long createStaff(@RequestParam(value = "userId") Long userId,
//                            @RequestBody StaffSaveRequestDto requestDto) {
//        return this.staffService.save(userId, requestDto);
//    }

}
