package com.pathfinder.server.auth.controller.dto;

import com.pathfinder.server.auth.oauth.Provider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
@AllArgsConstructor
@Getter
@Builder
public class AuthLoginApiRequest {

    @NotNull(message = "OAuth 인증을 선택해주세요.")
    private Provider provider;
    private String code;
}

