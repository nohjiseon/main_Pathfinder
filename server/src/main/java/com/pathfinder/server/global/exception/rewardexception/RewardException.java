package com.pathfinder.server.global.exception.rewardexception;

import com.pathfinder.server.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public abstract class RewardException extends BusinessException {

    protected RewardException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
