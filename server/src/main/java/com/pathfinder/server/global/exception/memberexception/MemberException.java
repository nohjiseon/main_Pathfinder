package com.pathfinder.server.global.exception.memberexception;

import com.pathfinder.server.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public abstract class MemberException extends BusinessException {

    protected MemberException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
