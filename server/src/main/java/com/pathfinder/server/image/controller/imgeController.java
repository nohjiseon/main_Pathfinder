package com.pathfinder.server.image.controller;

import com.pathfinder.server.image.service.S3UploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
public class imgeController {
    private final S3UploadService s3UploadService;

    public imgeController(S3UploadService s3UploadService) {
        this.s3UploadService = s3UploadService;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity postImage(@RequestParam(value="image") MultipartFile image) throws  IOException {
        String url = s3UploadService.saveFile(image);
        return new ResponseEntity(url, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteImage(@RequestParam String imageUrl) {
        s3UploadService.deleteImage(imageUrl);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
