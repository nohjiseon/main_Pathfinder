package com.pathfinder.server.reward.service;


public enum UnlockImage {
        URL_1("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/꽁치.png",1),
        URL_3("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/참치.png",3),
        URL_5("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/흰동가리.png",5),
        URL_10("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/개복치.png",10),
        URL_20("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/고래.png",20),
        URL_30("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/소라게.png",30),
        URL_50("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/범고래.png",50),
        URL_100("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/펭귄.png",100),
        URL_200("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/물범.png",200),
        URL_365("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈/해달.png",365);

        private final String url;
        private final int value;


    UnlockImage(String url, int value) {
        this.url = url;
        this.value = value;
    }

    public String getUrl() {
        return url;
    }

    public int getValue() {
        return value;
    }

    public static String getUrlByValue(int value) {
        for (UnlockImage image : values()) {
            if (image.value == value) {
                return image.url;
            }
        }
        return null;
    }
}
