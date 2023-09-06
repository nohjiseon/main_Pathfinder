package com.pathfinder.server.tourinfo.dto;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement(name = "TourInfoDto")
public class TourInfoDto {

    @XmlElement(name = "response")
    private Response response;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        @XmlElement(name = "body")
        private Body body;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Body {
        @XmlElement(name = "items")
        private Items items;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Items {
        @XmlElement(name = "item")
        private List<Item> item;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Item {
        @XmlElement(name = "contentid")
        private Long contentid;
        @XmlElement(name = "title")
        private String title;
        @XmlElement(name = "addr1")
        private String addr1;
        @XmlElement(name = "addr2")
        private String addr2;
        @XmlElement(name = "tel")
        private String tel;
        @XmlElement(name = "firstimage")
        private String firstimage;
        @XmlElement(name = "firstimage2")
        private String firstimage2;
        @XmlElement(name = "contenttypeid")
        private int contenttypeid;
    }
}
