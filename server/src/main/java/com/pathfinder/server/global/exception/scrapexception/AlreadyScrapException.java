package com.pathfinder.server.global.exception.scrapexception;

import org.springframework.http.HttpStatus;

public class AlreadyScrapException extends ScrapException{
    public static final String MESSAGE = "이미 스크랩한 게시물입니다.";
    public static final String CODE = "SCRAP-409";

    public AlreadyScrapException() {
        super(CODE, HttpStatus.CONFLICT, MESSAGE);
    }
}
