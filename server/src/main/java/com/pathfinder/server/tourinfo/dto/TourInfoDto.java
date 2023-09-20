package com.pathfinder.server.tourinfo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class TourInfoDto {
    @Getter
    @AllArgsConstructor
    public static class Response {
        private String title;
        private String addr1;
        private String addr2;
        private String tel;
        private String firstimage;
        private String firstimage2;
        private String tag;
        private String zipcode;
    }
}