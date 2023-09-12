package com.pathfinder.server.global.exception.memberexception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class MemberNotFoundException extends MemberException {

    public static final String MESSAGE = "존재하지 않는 회원입니다.";
    public static final String CODE = "MEMBER-404";

    public MemberNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}

