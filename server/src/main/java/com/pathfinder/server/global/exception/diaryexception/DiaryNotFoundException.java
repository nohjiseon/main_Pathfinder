package com.pathfinder.server.global.exception.diaryexception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public class DiaryNotFoundException extends DiaryException{
    public static final String MESSAGE = "존재하지 않는 글입니다.";
    public static final String CODE = "DIARTY-404";

    public DiaryNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
