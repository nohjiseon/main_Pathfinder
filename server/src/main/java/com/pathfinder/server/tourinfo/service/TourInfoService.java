package com.pathfinder.server.tourinfo.service;

import com.pathfinder.server.tourinfo.dto.TourInfoDto;
import com.pathfinder.server.tourinfo.entity.TourInfo;
import com.pathfinder.server.tourinfo.repository.TourInfoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TourInfoService {
    @Value("${service-key}")
    private static String API_KEY;
    private final TourInfoRepository tourInfoRepository;
    private final RestTemplate restTemplate;

    public TourInfoService(TourInfoRepository tourInfoRepository, RestTemplate restTemplate) {
        this.tourInfoRepository = tourInfoRepository;
        this.restTemplate = restTemplate;
    }

    public void saveTourInfo(String keyword) {
        String url = "http://apis.data.go.kr/B551011/KorService1/searchKeyword1";

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
                .queryParam("numOfRows", "10000")
                .queryParam("MobileOS", "ETC")
                .queryParam("MobileApp", "pathfinder")
                .queryParam("_type", "json")
                .queryParam("keyword", keyword)
                .queryParam("serviceKey", API_KEY);

        ResponseEntity<TourInfoDto> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                null,
                TourInfoDto.class
        );


        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            List<TourInfo> tourInfos = response.getBody().getResponse().getBody().getItems().getItem().stream().map(item -> {
                TourInfo tourInfo = new TourInfo();
                tourInfo.setTitle(item.getTitle());
                tourInfo.setAddr1(item.getAddr1());
                tourInfo.setAddr2(item.getAddr2());
                tourInfo.setTel(item.getTel());
                tourInfo.setFirstimage(item.getFirstimage());
                tourInfo.setFirstimage2(item.getFirstimage2());
                tourInfo.setTag(tagIdToTag(item.getContenttypeid()));
                return tourInfo;
            }).collect(Collectors.toList());

            tourInfoRepository.saveAll(tourInfos);
        }
    }

    private String tagIdToTag(int tagId) {
        switch (tagId) {
            case 12:
                return "관광지";
            case 14:
                return "문화시설";
            case 15:
                return "행사/공연/축제";
            case 25:
                return "여행코스";
            case 28:
                return "레포츠";
            case 32:
                return "숙박";
            case 38:
                return "쇼핑";
            case 39:
                return "음식점";
            default:
                return "";
        }
    }
}
