package com.pathfinder.server.global.exception.authexception;

import org.springframework.http.HttpStatus;

public class OAuthGithubRequestException extends AuthException {

    public static final String MESSAGE = "깃허브 이메일을 받아오는데 실패했습니다. 다시 시도해주세요.";
    public static final String CODE = "Auth-400";

    public OAuthGithubRequestException() {
        super(CODE, HttpStatus.BAD_REQUEST, MESSAGE);
    }
}

