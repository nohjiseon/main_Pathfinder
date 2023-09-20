package com.pathfinder.server.tourinfo.repository;

import com.pathfinder.server.tourinfo.entity.TourInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourInfoRepository extends JpaRepository<TourInfo, Long> {
    List<TourInfo> findByAddr1Containing(String addr1);
}
