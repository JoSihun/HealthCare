package com.shyd.healthcare.domain.user;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.introduce.Staff;
import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.support.board.Comment;
import com.shyd.healthcare.domain.support.board.Post;
import com.shyd.healthcare.dto.user.UserRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // PERSONAL INFO
    @Column(length = 50, nullable = false)
    private String name;
    @Column(length = 50)
    private String email;
    @Column(length = 50)
    private String contact;
    @Column
    private LocalDate birthday;

    // ACCOUNT INFO
    @Column(length = 50, nullable = false, unique = true)
    private String username;
    @Column(length = 100, nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    // RELATIONSHIPS WITH OTHER ENTITIES
    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Auth auth;
    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Staff staff;
    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Post> posts;
    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private List<Comment> comments;
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<BMI> bmis;
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Diet> diets;

    public void update(UserRequestDto requestDto) {
        this.name = requestDto.getName();
        this.email = requestDto.getEmail();
        this.contact = requestDto.getContact();
        this.birthday = LocalDate.parse(requestDto.getBirthday());
    }

    public void updatePassword(String password) {
        this.password = password;
    }
}
