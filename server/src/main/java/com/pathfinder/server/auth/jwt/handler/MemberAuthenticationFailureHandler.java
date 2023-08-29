package com.pathfinder.server.auth.jwt.handler;

import com.pathfinder.server.auth.utils.AuthUtil;
import com.pathfinder.server.global.exception.commonexception.UnknownException;
import com.pathfinder.server.global.exception.memberexception.MemberBadCredentialsException;
import com.pathfinder.server.global.exception.memberexception.MemberDisabledException;
import com.pathfinder.server.global.exception.requestiexception.RequestNotAllowedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {

    // 인증이 실패했을 때 호출
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        if(exception instanceof BadCredentialsException){
            AuthUtil.sendErrorResponse(response, new MemberBadCredentialsException());
            return;
        }
        if(exception.getCause() instanceof DisabledException){
            AuthUtil.sendErrorResponse(response, new MemberDisabledException());
            return;
        }
        if(exception instanceof InternalAuthenticationServiceException){
            AuthUtil.sendErrorResponse(response, new MemberBadCredentialsException());
            return;
        }
        if(exception instanceof AuthenticationServiceException){
            AuthUtil.sendErrorResponse(response, new RequestNotAllowedException("POST"));
            return;
        }

        // 알 수 없는 예외인 경우 로그 출력 및 에러 응답 전송
        log.error("Unknown error {} happened: {}", exception.getClass().getName(), exception.getMessage());
        exception.printStackTrace();
        AuthUtil.sendErrorResponse(response, new UnknownException());
    }
}
