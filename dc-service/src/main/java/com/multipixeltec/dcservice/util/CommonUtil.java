package com.multipixeltec.dcservice.util;

import java.net.InetAddress;
import java.util.Random;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-08
 * Developer : priyamal
 */
public class CommonUtil {
    private static String AlphaNumericString = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static String REGEX_NUMBER = "^[0-9.]+$";

    public static String generateRandomString(int length){
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        Random random = new Random();
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return generatedString;
    }
    public static String generateRandomStringWithSpace(int length){
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }


    public static String generateRandomNumber(int charLength) {
        return String.valueOf(charLength < 1 ? 0 : new Random()
                .nextInt((9 * (int) Math.pow(10, charLength - 1)) - 1)
                + (int) Math.pow(10, charLength - 1));
    }
    public static Integer getRandomNumber(int min, int max) {
        return (int) Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static boolean isNumber(String text) {
        return text.matches(REGEX_NUMBER);
    }

    public static String getHostName() {
        String hostName = System.getenv("HOSTNAME");
        if(hostName == null || hostName.isEmpty()) {
            try {
                InetAddress addr = InetAddress.getLocalHost();
                hostName = addr.getHostName();
                return hostName;
            } catch (Exception e) {
                System.err.println(e);
            }
        }
        return null;
    }
}
