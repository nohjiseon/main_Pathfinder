package com.pathfinder.server.global.exception.scrapexception;

import com.pathfinder.server.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class ScrapException extends BusinessException {

    protected ScrapException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
