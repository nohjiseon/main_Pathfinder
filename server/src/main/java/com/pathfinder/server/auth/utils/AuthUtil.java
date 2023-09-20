package com.pathfinder.server.auth.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathfinder.server.global.exception.BusinessException;
import com.pathfinder.server.global.response.ApiSingleResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class AuthUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void sendErrorResponse(HttpServletResponse response, BusinessException exception) throws IOException {
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(exception.getHttpStatus().value());
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(ApiSingleResponse.fail(exception)));
    }
}