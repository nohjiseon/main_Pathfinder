package com.pathfinder.server.tourinfo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class TourInfo {
    @Id
    private Long contentid;
    private String title;
    private String addr1;           // 주소
    private String addr2;           // 상세주소
    private String tel;
    private String firstimage;      // 대표이미지(원본)
    private String firstimage2;     // 대표이미지(썸네일)
    private String tag;             // 관광타입
}
