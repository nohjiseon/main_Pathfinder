package com.pathfinder.server.auth.jwt.handler;

import com.pathfinder.server.auth.utils.AuthUtil;
import com.pathfinder.server.global.exception.BusinessException;
import com.pathfinder.server.global.exception.authexception.AuthException;
import com.pathfinder.server.global.exception.commonexception.UnknownException;
import com.pathfinder.server.global.exception.requestiexception.RequestException;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.pathfinder.server.auth.utils.AuthConstant.*;

@Slf4j
public class MemberRefreshFailureHandler {

    // Refresh Token 갱신에 실패한 경우에 대한 처리
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, Exception exception) throws IOException {

        if(exception instanceof AuthException){

            response.setHeader(ALLOW, "POST");
            response.setHeader(LOCATION, request.getScheme() + "://" + request.getServerName() + AUTH_LOGIN_URL);
            AuthUtil.sendErrorResponse(response, (AuthException) exception);
            return;
        }

        if(exception instanceof RequestException){
            response.setHeader(ALLOW, "POST");
            response.setHeader(LOCATION, request.getScheme() + "://" + request.getServerName() +  AUTH_REFRESH_URL);
            AuthUtil.sendErrorResponse(response, (RequestException) exception);
            return;
        }

        if(exception instanceof BusinessException){
            AuthUtil.sendErrorResponse(response, (BusinessException) exception);
            return;
        }

        log.error("Unknown error {} happened: {}", exception.getClass().getName(), exception.getMessage());
        exception.printStackTrace();
        AuthUtil.sendErrorResponse(response, new UnknownException());
    }
}