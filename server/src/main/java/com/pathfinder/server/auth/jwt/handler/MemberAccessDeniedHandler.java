package com.pathfinder.server.auth.jwt.handler;

import com.pathfinder.server.auth.utils.AuthUtil;
import com.pathfinder.server.global.exception.memberexception.MemberAccessDeniedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberAccessDeniedHandler implements AccessDeniedHandler {

    // 사용자가 특정 리소스 또는 기능에 대한 접근 권한이 없을 때 호출
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        AuthUtil.sendErrorResponse(response, new MemberAccessDeniedException());
    }

}