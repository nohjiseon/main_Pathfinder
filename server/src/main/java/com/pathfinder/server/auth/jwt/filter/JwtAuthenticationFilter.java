package com.pathfinder.server.auth.jwt.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathfinder.server.auth.jwt.dto.LoginDto;
import com.pathfinder.server.auth.jwt.service.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.pathfinder.server.auth.utils.AuthConstant.*;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;


    // 클라이언트가 제공한 토큰을 검증
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        checkRequestPOST(request);

        LoginDto loginDto = getLoginDtoFrom(request);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    private void checkRequestPOST(HttpServletRequest request) {
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }
    }

    private LoginDto getLoginDtoFrom(HttpServletRequest request) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(request.getInputStream(), LoginDto.class);
    }

    // 토큰이 유효한 경우 새로운 접근 토큰을 생성하여 응답 헤더에 추가
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authentication) throws ServletException, IOException {

        String accessToken = tokenProvider.generateAccessToken(authentication, ACCESS_TOKEN_EXPIRE_TIME);
        String refreshToken = tokenProvider.generateRefreshToken(authentication, REFRESH_TOKEN_EXPIRE_TIME);

        response.setHeader(AUTHORIZATION, BEARER + accessToken);
        response.setHeader(REFRESH, BEARER + refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authentication);
    }
}
