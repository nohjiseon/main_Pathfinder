package com.pathfinder.server.global.response;

import com.pathfinder.server.global.exception.BusinessException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiSingleResponse<T> {

    private T data;
    private int code;
    private String status;
    private String message;

    public static ApiSingleResponse<Void> fail(BusinessException exception) {
        return new ApiSingleResponse<>(
                null,
                exception.getHttpStatus().value(),
                exception.getErrorCode(),
                exception.getMessage());
    }
}
