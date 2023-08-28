package com.pathfinder.server.thread.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ThreadDto {
    @Getter
    public static class Post {

        private String title;
        private String content;

    }
    @Getter
    public static class Patch {
        private Long threadId;
        private String title;
        private String content;

        public void setThreadId(Long threadId) {
            this.threadId = threadId;
        }
    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response {
        private Long threadId;
        // 작성자 name 가져오기
        private String name;
        private String title;
        private String content;
        private Integer recommendedCount;
        private Integer views;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }


}
