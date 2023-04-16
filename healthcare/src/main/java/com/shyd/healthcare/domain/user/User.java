package com.shyd.healthcare.domain.user;

import com.shyd.healthcare.domain.BaseTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class User extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50, nullable = false, unique = true)
    private String email;
    @Column(length = 50, nullable = false, unique = true)
    private String username;
    @Column(length = 100, nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public User(String email, String username, String password, Role role) {
        this.role = role;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
