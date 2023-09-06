package com.pathfinder.server.tourinfo.controller;

import com.pathfinder.server.tourinfo.service.TourInfoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TourInfoController {
    private final TourInfoService tourInfoService;

    public TourInfoController(TourInfoService tourInfoService) {
        this.tourInfoService = tourInfoService;
    }

    @GetMapping
    public ResponseEntity fetchAndSaveTourInfo() {
        try {
            tourInfoService.fetchAndSaveTourInfo();
            return new ResponseEntity<>("Data fetched and stored successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to fetch and store data: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
