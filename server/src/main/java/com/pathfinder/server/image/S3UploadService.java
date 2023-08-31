package com.pathfinder.server.image;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
@Service
public class S3UploadService {
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public S3UploadService(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String saveFile(MultipartFile multipartFile) throws IOException {
        String filename = multipartFile.getOriginalFilename() + "_" + UUID.randomUUID().toString();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, filename, multipartFile.getInputStream(), metadata);
        return amazonS3.getUrl(bucket, filename).toString();
    }

    public String updateFile(MultipartFile img, String imageUrl) throws IOException {
        deleteImage(imageUrl);
        return saveFile(img);
    }

    public void deleteImage(String originalFilename)  {
        amazonS3.deleteObject(bucket, originalFilename);
    }
}