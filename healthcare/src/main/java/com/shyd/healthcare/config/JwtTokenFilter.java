package com.shyd.healthcare.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private static final String BEARER_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = getAccessTokenFromRequest(request);
        String refreshToken = getRefreshTokenFromRequest(request);
        if (accessToken != null && this.jwtTokenProvider.validateToken(accessToken)) {
            if (refreshToken != null && this.jwtTokenProvider.validateToken(refreshToken)) {
                UsernamePasswordAuthenticationToken authentication = getAuthenticationFromToken(accessToken);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }

    private String getAccessTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }
        return null;
    }

    private String getRefreshTokenFromRequest(HttpServletRequest request) {
        String refreshToken = request.getHeader("X-Refresh-Token");
        if (StringUtils.hasText(refreshToken)) {
            return refreshToken;
        }
        return null;
    }

    private UsernamePasswordAuthenticationToken getAuthenticationFromToken(String token) {
        Long userId = this.jwtTokenProvider.getUserIdFromToken(token);
        CustomUserDetails customUserDetails = (CustomUserDetails) this.customUserDetailsService.loadUserById(userId);
        return new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
    }
}

//public class JwtTokenFilter extends OncePerRequestFilter {
//    private final JwtTokenProvider jwtTokenProvider;
//    private final CustomUserDetailsService customUserDetailsService;
//
//    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider,
//                          CustomUserDetailsService customUserDetailsService) {
//        this.jwtTokenProvider = jwtTokenProvider;
//        this.customUserDetailsService = customUserDetailsService;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
////        UsernamePasswordAuthenticationToken authenticationToken =
////                new UsernamePasswordAuthenticationToken(username, null, List.of(new SimpleGrantedAuthority("USER")));
////        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
////        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
////        filterChain.doFilter(request, response);
//
//        try {
//            String token = getJwtFromRequest(request);
//            if (token != null && jwtTokenProvider.validateToken(token)) {
//                String username = jwtTokenProvider.getUserNameFromToken(token);
//                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
////                String username = jwtTokenProvider.getUsernameFromToken(token);
////                UsernamePasswordAuthenticationToken authentication =
////                        new UsernamePasswordAuthenticationToken(username, null, List.of(new SimpleGrantedAuthority(Role.ROLE_USER.name())));
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        } catch (Exception ex) {
//            logger.error("Could not set user authentication in security context", ex);
//        }
//        filterChain.doFilter(request, response);
//    }
//
//    private String getJwtFromRequest(HttpServletRequest request) {
//        String bearerToken = request.getHeader("Authorization");
//        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
//            return bearerToken.substring(7);
//        }
//        return null;
//    }
//}