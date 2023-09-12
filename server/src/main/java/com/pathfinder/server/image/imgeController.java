package com.pathfinder.server.image;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity postQuestion(@RequestParam(value="image") MultipartFile image) throws  IOException {
        String url = s3UploadService.saveFile(image);
        return new ResponseEntity(url, HttpStatus.OK);
    }

    //todo 이미지 수정이나 삭제 컨트롤러 추가
}
