package com.pathfinder.server.thread.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ThreadDto {
    @Getter
    public static class Post {
        private Long memberId;
        private String title;
        private String content;
        private String area1;
        private String area2;
    }
    @Getter
    public static class Patch {
        private Long threadId;
        private String title;
        private String content;
        private String area1;
        private String area2;

        public void setThreadId(Long threadId) {
            this.threadId = threadId;
        }
    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response {
        private Long threadId;
        private String name;
        private String title;
        private String content;
        private String area1;
        private String area2;
        private Long recommendedCount;
        private Integer views;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }


}
