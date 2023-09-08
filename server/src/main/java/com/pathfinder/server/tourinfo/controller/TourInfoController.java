package com.pathfinder.server.tourinfo.controller;

import com.pathfinder.server.dto.MultiResponseDto;
import com.pathfinder.server.dto.SingleResponseDto;
import com.pathfinder.server.tourinfo.entity.TourInfo;
import com.pathfinder.server.tourinfo.mapper.TourInfoMapper;
import com.pathfinder.server.tourinfo.service.TourInfoService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api")
@Validated
public class TourInfoController {
    private final TourInfoService tourInfoService;
    private final TourInfoMapper mapper;

    public TourInfoController(TourInfoService tourInfoService, TourInfoMapper mapper) {
        this.tourInfoService = tourInfoService;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity getTourInfoList(@RequestParam String address) {
        List<TourInfo> tourInfos = tourInfoService.findTourInfosByAddress(address);

        return new ResponseEntity<>(
                new SingleResponseDto<>(
                        mapper.tourInfoToTourInfoResponses(tourInfos)),
                        HttpStatus.OK
        );
    }

}
