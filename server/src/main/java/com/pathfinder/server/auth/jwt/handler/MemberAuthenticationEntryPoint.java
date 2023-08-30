package com.pathfinder.server.auth.jwt.handler;

import com.pathfinder.server.global.exception.BusinessException;
import com.pathfinder.server.global.exception.authexception.JwtExpiredAuthException;
import com.pathfinder.server.auth.utils.AuthUtil;
import com.pathfinder.server.global.exception.commonexception.UnknownException;
import com.pathfinder.server.global.exception.memberexception.MemberAccessDeniedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.pathfinder.server.auth.utils.AuthConstant.*;

@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // Spring Security에서 인증이 필요한 리소스에 접근하려고 할 때 인증되지 않은 사용자에 대한 Entry Point에서 어떻게 처리할지 정의
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {

        // Business Exception과 Exception 객체 추출
        BusinessException businessException = (BusinessException) request.getAttribute(BUSINESS_EXCEPTION);
        Exception exception = (Exception) request.getAttribute(EXCEPTION);

        if(exist(businessException)){
            // Business Exception이 존재하면 응답 헤더와 에러 응답 설정 후 전송
            setResponseHeaderFrom(request, response, businessException);
            AuthUtil.sendErrorResponse(response, businessException);
            return;
        }

        if(authException instanceof InsufficientAuthenticationException){
            // 인증이 부족한 경우 부족함을 나타내는 에러 응답 전송
            AuthUtil.sendErrorResponse(response, new MemberAccessDeniedException());
            return;
        }

        if(exist(exception)){
            // Exception 객체가 존재하는 경우 로그 출력 후 알 수 없는 예외 응답 전송
            printLog(exception);
            AuthUtil.sendErrorResponse(response, new UnknownException(exception.getMessage()));
            return;
        }

        // 인증 예외에 대한 처리
        // 로그 출력 후 알 수 없는 예외 응답 전송
        printLog(authException);
        AuthUtil.sendErrorResponse(response, new UnknownException(authException.getMessage()));
    }

    // Exception 객체 존재 여부 체크
    private boolean exist(Exception exception) {
        return exception != null;
    }

    // 로그 출력 메서드
    private void printLog(Exception exception) {
        log.error("Unknown error {} happened: {}", exception.getClass().getName(), exception.getMessage());
        exception.printStackTrace();
    }

    // Business Exception에 따라 응답 헤더 설정
    private void setResponseHeaderFrom(HttpServletRequest request, HttpServletResponse response, BusinessException businessException) throws IOException {

        if(businessException instanceof JwtExpiredAuthException){
            response.setHeader(ALLOW, "POST");
            response.setHeader(LOCATION,
                    request.getScheme() + "://" + request.getServerName() +  AUTH_REFRESH_URL);
        }
    }

}