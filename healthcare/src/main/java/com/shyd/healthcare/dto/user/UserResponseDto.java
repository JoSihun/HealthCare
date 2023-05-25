package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String contact;
    private String username;
    private String birthday;
    private String createdDate;
    private String updatedDate;

    public UserResponseDto(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.contact = entity.getContact();
        this.username = entity.getUsername();
        this.birthday = entity.getBirthday().toString();
        this.createdDate = entity.getCreatedDate().toString();
        this.updatedDate = entity.getUpdatedDate().toString();
    }
}
