package com.pathfinder.server.auth.jwt.filter;

import com.pathfinder.server.auth.jwt.service.CustomUserDetails;
import com.pathfinder.server.auth.jwt.service.TokenProvider;
import com.pathfinder.server.global.exception.BusinessException;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.slf4j.MDC;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static com.pathfinder.server.auth.utils.AuthConstant.*;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;


    // 사용자의 인증 정보를 설정하고 예외 처리와 로깅을 수행
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try{
            Claims claims = verifyTokenClaims(request);

            setAuthenticationToContext(claims);

            MDC.put("email", claims.getSubject());

        }catch(BusinessException exception){
            request.setAttribute(BUSINESS_EXCEPTION, exception);
        }catch(Exception exception){
            request.setAttribute(EXCEPTION, exception);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String accessToken = getAccessToken(request);

        return accessToken == null || !accessToken.startsWith(BEARER);
    }

    private Claims verifyTokenClaims(HttpServletRequest request) {

        String accessToken = getAccessToken(request).replace(BEARER, "");

        return tokenProvider.getParseClaims(accessToken);
    }

    private String getAccessToken(HttpServletRequest request) {

        return request.getHeader(AUTHORIZATION);
    }

    // 사용자 정보와 역할 정보로 인증 객체를 만들어 Spring Security의 보안 컨텍스트에 설정
    private void setAuthenticationToContext(Claims claims) {

        Collection<? extends GrantedAuthority> authorities = getRoles(claims);

        CustomUserDetails principal = new CustomUserDetails(claims.get(CLAIM_ID, Long.class), claims.getSubject(), "", authorities);

        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    // 클레임으로부터 역할 정보를 추출하여 리스트로 반환
    private List<SimpleGrantedAuthority> getRoles(Claims claims) {
        return Arrays.stream(claims.get(CLAIM_AUTHORITY).toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}