package com.pathfinder.server.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.pathfinder.server.global.exception.imageexception.FileIsNotImageFile;
import com.pathfinder.server.global.exception.imageexception.ImageNotFoundException;
import com.pathfinder.server.image.entity.Image;
import com.pathfinder.server.image.repository.ImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component
@Service
public class ImageService {
    private static final List<String> ALLOWED_IMAGE_EXTENSIONS = Arrays.asList(
            "jpg", "jpeg", "png", "gif", "bmp"
    );
    private final AmazonS3 amazonS3;
    private final ImageRepository imageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public ImageService(AmazonS3 amazonS3, ImageRepository imageRepository) {
        this.amazonS3 = amazonS3;
        this.imageRepository = imageRepository;
    }

    public String saveFile(MultipartFile file) throws IOException {
        if (!isImageFile(file)) {
            throw new FileIsNotImageFile();
        }

        String imageName = file.getOriginalFilename() + "_" + UUID.randomUUID().toString();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        amazonS3.putObject(bucket, imageName, file.getInputStream(), metadata);
        String url = amazonS3.getUrl(bucket, imageName).toString();

        Image image = new Image();
        image.setImageName(imageName);
        image.setUrl(url);
        imageRepository.save(image);

        return url;
    }


    public void deleteImage(String imageUrl)  {
        Image image = findVerifiedImage(imageUrl);
        amazonS3.deleteObject(bucket, image.getImageName());
        imageRepository.delete(image);
    }

    private Image findVerifiedImage(String imageUrl) {
        Optional<Image> optionalImage =
                imageRepository.findByUrl(imageUrl);
        Image findImage =
                optionalImage.orElseThrow(() ->
                        new ImageNotFoundException());
        return findImage;
    }

    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            throw new FileIsNotImageFile();
        }

        String fileExtension = getFileEctension(fileName).toLowerCase();
        return ALLOWED_IMAGE_EXTENSIONS.contains(fileExtension);

    }

    private String getFileEctension(String fileName) {
        int lastIndexOfDot = fileName.lastIndexOf(".");
        if (lastIndexOfDot == -1) {
            return "";
        }
        return fileName.substring(lastIndexOfDot+1);
    }
}