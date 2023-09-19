package com.pathfinder.server.scrap.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class ScrapDto {
    @Getter
    public static class Post {
        private Long memberId;
        private Long diaryId;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response {
        private Long diaryId;
        private String name;
        private String title;
        private String content;
        private String area1;
        private String area2;
        private Long recommendedCount;
        private Long scrapCount;
        private Integer views;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
