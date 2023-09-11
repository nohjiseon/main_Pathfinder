package com.pathfinder.server.global.exception.rewardexception;

import com.pathfinder.server.global.exception.memberexception.MemberException;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RewardNotUnlockException extends MemberException {

    public static final String MESSAGE = "아직 획득하지 못한 보상입니다.";
    public static final String CODE = "REWARD-403";

    public RewardNotUnlockException() {
        super(CODE, HttpStatus.FORBIDDEN, MESSAGE);
    }
}

