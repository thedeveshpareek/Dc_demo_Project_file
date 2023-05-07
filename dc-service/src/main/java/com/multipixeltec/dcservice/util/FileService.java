package com.multipixeltec.dcservice.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.DatatypeConverter;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.UUID;

@Service
public class FileService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${spring.external.path}")
    private String externalPath;
    public String saveFile(String folder, String sourceData){
        File store = store(folder, sourceData);
        if (store == null)
            return null;
        return store.getAbsolutePath().replace(externalPath,"");
    }

    public String saveFile(String folder, MultipartFile multipartFile){
        if (multipartFile.isEmpty()){
            return null;
        }
        String extension;
        switch (multipartFile.getContentType()) {//check image's extension
            case "image/webp":
                extension = "webp";
                break;
            case "image/jpeg":
                extension = "jpeg";
                break;
            case "image/png":
                extension = "png";
                break;
            case "image/bmp":
                extension = "bmp";
                break;
            case "application/pdf":
                extension = "pdf";
                break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                extension = "docx";
                break;
            default://should write cases for more images types
                extension = multipartFile.getOriginalFilename().replace(" ","_");
                break;
        }
        Calendar today = Calendar.getInstance();
        int year = today.get(Calendar.YEAR);
        int month = today.get(Calendar.MONTH);
        //convert base64 string to binary data
        try {
            Path basePath = Paths.get(externalPath.concat(String.valueOf(year)).concat("/").concat(String.valueOf(month + 1)).concat("/").concat(folder));
            Files.createDirectories(basePath);
            logger.info("Created Folder in "+basePath.toString());
            String fileName = UUID.randomUUID().toString();
            String path = basePath.toFile().getAbsolutePath()+"/"+fileName+"."+extension;
            File file = new File(path);
            Path serverPath = Files.write(file.toPath(), multipartFile.getBytes());
            logger.info(serverPath.toFile().getAbsolutePath());
            return serverPath.toFile().getAbsolutePath().replace(externalPath,"");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String saveFace(String folder, String sourceData){
        File file = store(folder, sourceData);
        return file.getAbsolutePath();
    }

    private File store(String folder, String sourceData){
        String[] strings = sourceData.split(",");
        String extension;
        switch (strings[0]) {//check image's extension
            case "data:image/webp;base64":
                extension = "webp";
                break;
            case "data:image/jpeg;base64":
                extension = "jpeg";
                break;
            case "data:image/png;base64":
                extension = "png";
                break;
            case "image/bmp":
                extension = "bmp";
                break;
            case "data:application/pdf;base64":
                extension = "pdf";
                break;
            case "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64":
                extension = "docx";
                break;
            default://should write cases for more images types
                extension = "jpg";
                break;
        }
        Calendar today = Calendar.getInstance();
        int year = today.get(Calendar.YEAR);
        int month = today.get(Calendar.MONTH);
        //convert base64 string to binary data
        byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
        try {
            Path basePath = Paths.get(externalPath.concat(String.valueOf(year)).concat("/").concat(String.valueOf(month + 1)).concat("/").concat(folder));
            Files.createDirectories(basePath);
            String fileName = UUID.randomUUID().toString();
            String path = basePath.toFile().getAbsolutePath()+"/"+fileName+"."+extension;
            File file = new File(path);

            OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file));
            outputStream.write(data);
            outputStream.flush();
            outputStream.close();
            logger.info(file.getAbsolutePath());
            return file;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    public String saveFileWithName(String folder, MultipartFile multipartFile){
        if (multipartFile.isEmpty()){
            return null;
        }
        String originalFileName = multipartFile.getOriginalFilename().replace(" ","_");
        Calendar today = Calendar.getInstance();
        int year = today.get(Calendar.YEAR);
        int month = today.get(Calendar.MONTH);
        //convert base64 string to binary data
        try {
            Path basePath = Paths.get(externalPath.concat(String.valueOf(year)).concat("/").concat(String.valueOf(month + 1)).concat("/").concat(folder));
            Files.createDirectories(basePath);
            logger.info("Created Folder in "+basePath.toString());
            String path = basePath.toFile().getAbsolutePath()+"/"+originalFileName;
            File file = new File(path);
            Path serverPath = Files.write(file.toPath(), multipartFile.getBytes());
            logger.info(serverPath.toFile().getAbsolutePath());
            return serverPath.toFile().getAbsolutePath().replace(externalPath,"");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
