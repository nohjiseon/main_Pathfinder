package com.pathfinder.server.reward.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;


public class RewardDto {
    @Getter
    @AllArgsConstructor
    public static class Response {
        private String rewardId;
        private String name;
        private String requirement;
        private String imageUrl;
        private boolean unlocked;
    }
}
