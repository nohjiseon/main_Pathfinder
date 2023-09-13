package com.pathfinder.server.auth.jwt.filter;

import com.pathfinder.server.auth.jwt.handler.MemberRefreshFailureHandler;
import com.pathfinder.server.auth.jwt.service.TokenProvider;
import com.pathfinder.server.global.exception.authexception.JwtNotFoundAuthException;
import com.pathfinder.server.global.exception.requestiexception.RequestNotAllowedException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.pathfinder.server.auth.utils.AuthConstant.*;

@RequiredArgsConstructor
public class JwtRefreshFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final MemberRefreshFailureHandler refreshFailureHandler;


    // 새로운 접근 토큰을 생성
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //POST 방식이 아니면 refresh 페이지를 포함해서 다시 예외를 던진다.
        if(!isPOST(request)){
            this.refreshFailureHandler.onAuthenticationFailure(request, response, new RequestNotAllowedException("POST"));
        }
        else{
            try {
                String refreshToken = getRefreshToken(request);

                tokenProvider.validateToken(refreshToken);

                String regeneratedAccessToken =
                        tokenProvider.generateAccessTokenFrom(refreshToken, ACCESS_TOKEN_EXPIRE_TIME);

                response.setHeader(AUTHORIZATION, BEARER + regeneratedAccessToken);

                //모든 예외는 이곳에서 처리된다.
            }catch(Exception exception){
                this.refreshFailureHandler.onAuthenticationFailure(request, response, exception);
            }
        }
    }

    private boolean isPOST(HttpServletRequest request) {
        return request.getMethod().equals("POST");
    }

    // Header에서 토큰 추출
    private String getRefreshToken(HttpServletRequest request) {

        String refreshToken = request.getHeader(REFRESH);

        if(refreshToken == null){
            throw new JwtNotFoundAuthException();
        }

        return refreshToken.replace(BEARER, "");
    }

    // "/auth/refresh"로 한 요청이 아니면 무시
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        return !request.getRequestURI().equals(AUTH_REFRESH_URL);
    }
}
