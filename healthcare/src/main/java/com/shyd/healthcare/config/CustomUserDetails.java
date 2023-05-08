package com.shyd.healthcare.config;

import com.shyd.healthcare.domain.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole().name()));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public Long getId() {
        return this.user.getId();
    }

    public String getName() {
        return this.user.getName();
    }
    public String getEmail() {
        return this.user.getEmail();
    }

    public String getContact() {
        return this.user.getContact();
    }

    public LocalDate getBirthday() {
        return this.user.getBirthday();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
