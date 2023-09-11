package com.pathfinder.server.global.exception.memberexception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public class MemberNameExistException extends MemberException{
    public static final String MESSAGE = "이미 존재하는 이름입니다.";
    public static final String CODE = "MEMBER-409";

    public MemberNameExistException() {
        super(CODE, HttpStatus.CONFLICT, MESSAGE);
    }
}
