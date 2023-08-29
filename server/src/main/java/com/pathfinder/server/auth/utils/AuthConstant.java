package com.pathfinder.server.auth.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthConstant {

    public static String AUTH_LOGIN_URL = "/auth/login";
    public static String AUTH_REFRESH_URL = "/auth/refresh";
    public static String LOCATION = "Location";
    public static String AUTHORIZATION = "Authorization";
    public static String ALLOW = "Allow";
    public static String REFRESH = "Refresh";
    public static String BEARER = "Bearer ";
    public static String BUSINESS_EXCEPTION = "businessException";
    public static String EXCEPTION = "exception";
    public static String CLAIM_AUTHORITY = "auth";
    public static String CLAIM_ID = "id";

    public static long ACCESS_TOKEN_EXPIRE_TIME;
    public static long REFRESH_TOKEN_EXPIRE_TIME;

    @Value("Access Token 만료 시간 설정 예정")
    public void setAccessTokenExpireTime(long value) {
        ACCESS_TOKEN_EXPIRE_TIME = value;
    }

    @Value("Refresh Token 만료 시간 설정 예정")
    public void setRefreshTokenExpireTime(long value) {
        REFRESH_TOKEN_EXPIRE_TIME = value;
    }
}
