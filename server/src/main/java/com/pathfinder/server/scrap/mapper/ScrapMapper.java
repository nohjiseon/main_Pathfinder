package com.pathfinder.server.scrap.mapper;

import com.pathfinder.server.diary.dto.DiaryDto;
import com.pathfinder.server.diary.entity.Diary;
import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.scrap.dto.ScrapDto;
import com.pathfinder.server.scrap.entity.Scrap;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ScrapMapper {
//    Scrap scarpPostDtoToScrap(ScrapDto.Post scrapPostDto);
//    List<ScrapDto.Response> scrapsToScrapResponseDtos(List<Scrap> scraps);
    default Scrap scarpPostDtoToScrap(ScrapDto.Post scrapPostDto){
        Scrap scrap = new Scrap();
        Diary diary = new Diary();
        Member member = new Member();

        member.setMemberId(scrapPostDto.getMemberId());
        scrap.setMember(member);
        diary.setDiaryId(scrapPostDto.getDiaryId());
        scrap.setDiary(diary);



        return scrap;
    }
    default ScrapDto.Response scrapToScrapResponseDto(Scrap scrap) {
        ScrapDto.Response.ResponseBuilder response = ScrapDto.Response.builder();

        response.diaryId( scrap.getDiary().getDiaryId() );
        response.name( scrap.getDiary().getName() );
        response.title( scrap.getDiary().getTitle() );
        response.content( scrap.getDiary().getContent() );
        response.area1( scrap.getDiary().getArea1() );
        response.area2( scrap.getDiary().getArea2() );
        response.recommendedCount( scrap.getDiary().getRecommendedCount() );
        response.scrapCount( (long) scrap.getDiary().getScrapCount() );
        response.views( scrap.getDiary().getViews() );
        response.createdAt( scrap.getDiary().getCreatedAt() );
        response.modifiedAt( scrap.getDiary().getModifiedAt() );

        return response.build();
    }

    default List<ScrapDto.Response> scrapsToScrapResponseDtos(List<Scrap> scraps) {
        if ( scraps == null ) {
            return null;
        }

        List<ScrapDto.Response> list = new ArrayList<ScrapDto.Response>( scraps.size() );
        for ( Scrap scrap : scraps ) {
            list.add( scrapToScrapResponseDto( scrap ) );
        }

        return list;
    }
}
