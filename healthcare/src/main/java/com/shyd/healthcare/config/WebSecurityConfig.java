package com.shyd.healthcare.config;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.service.user.CustomUserDetailsService;
import com.shyd.healthcare.utils.jwt.JwtTokenFilter;
import com.shyd.healthcare.utils.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf().disable()
                .authorizeRequests()
                // 회원가입 및 로그인 아무나 승인
                .antMatchers("/api/v1/user/**").permitAll()
                .antMatchers("/api/v1/auth/**").permitAll()
                // 모든 POST 요청은 승인된 사용자만 허용
                .antMatchers(HttpMethod.POST, "/api/v1/**").authenticated()
                .antMatchers(HttpMethod.POST, "/api/v2/**").authenticated()
                //.antMatchers(HttpMethod.POST, "/api/v1/post").authenticated()
                //.antMatchers(HttpMethod.POST, "/api/v1/comment").authenticated()
                // 모든 GET 요청은 승인된 사용자 중 USER 권한이 있는 사용자만 허용
                //.antMatchers(HttpMethod.GET, "/api/v1/**").hasRole("USER")
                //.antMatchers(HttpMethod.GET, "/api/v2/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/api/v1/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/api/v2/**").hasRole("USER")
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new JwtTokenFilter(jwtTokenProvider, customUserDetailsService),
                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
