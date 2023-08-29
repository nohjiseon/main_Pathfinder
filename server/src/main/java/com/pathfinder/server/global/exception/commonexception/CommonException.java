package com.pathfinder.server.global.exception.commonexception;

import com.pathfinder.server.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public abstract class CommonException extends BusinessException {

    protected CommonException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }

}
