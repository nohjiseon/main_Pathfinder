package com.pathfinder.server.global.exception.memberexception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class MemberEmailExistException extends MemberException{
    public static final String MESSAGE = "이미 존재하는 이메일입니다.";
    public static final String CODE = "MEMBER-409";

    public MemberEmailExistException() {
        super(CODE, HttpStatus.CONFLICT, MESSAGE);
    }
}
