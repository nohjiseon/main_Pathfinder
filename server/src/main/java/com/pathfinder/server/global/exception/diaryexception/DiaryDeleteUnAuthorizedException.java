package com.pathfinder.server.global.exception.diaryexception;

import org.springframework.http.HttpStatus;

public class DiaryDeleteUnAuthorizedException extends DiaryException{
    public static final String MESSAGE = "삭제할 수 있는 권한이 없습니다.";
    public static final String CODE = "DIARY-403";

    public DiaryDeleteUnAuthorizedException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
