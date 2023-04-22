package com.shyd.healthcare.config;

import com.shyd.healthcare.config.CustomUserDetails;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("해당 유저가 존재하지 않습니다. username = " + username));
        return new CustomUserDetails(user);
    }

    public UserDetails loadUserById(Long userId) throws IllegalArgumentException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. user_id = " + userId));
        return new CustomUserDetails(user);
    }

    public UserDetails loadUserByEmail(String email) throws IllegalArgumentException {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. email = " + email));
        return new CustomUserDetails(user);
    }
}