package com.pathfinder.server.global.exception.rewardexception;

import com.pathfinder.server.global.exception.memberexception.MemberException;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RewardNotFoundException extends MemberException {

    public static final String MESSAGE = "존재하지 않는 보상입니다.";
    public static final String CODE = "REWARD-404";

    public RewardNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}

