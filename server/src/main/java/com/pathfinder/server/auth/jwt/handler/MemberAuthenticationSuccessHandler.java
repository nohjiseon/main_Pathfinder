package com.pathfinder.server.auth.jwt.handler;

import com.pathfinder.server.auth.jwt.service.CustomUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    // 인증이 성공했을 때 호출
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // 인증 성공 시 사용자 정보를 가져온다.
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // 사용자 Id 추출
        Long memberId = userDetails.getMemberId();

        // 응답에 사용자 Id를 포함하여 설정
        setMemberIdInResponse(response, memberId);


    }

    // JSON 응답 데이터에 사용자 Id를 담아서 전송
    private void setMemberIdInResponse(HttpServletResponse response, Long memberId) throws IOException {

        String jsonResponse = "{\"memberId\":" + memberId + "}";

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonResponse);
    }
}
