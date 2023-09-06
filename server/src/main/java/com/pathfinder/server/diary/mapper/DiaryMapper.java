package com.pathfinder.server.diary.mapper;

import com.pathfinder.server.diary.dto.DiaryDto;
import com.pathfinder.server.diary.entity.Diary;
import com.pathfinder.server.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface DiaryMapper {
//    Diary diaryPostDtoToDiary(DiaryDto.Post diaryPostDto);
    Diary diaryPatchDtoToDiary(DiaryDto.Patch diaryPatchDto);
    DiaryDto.Response DiaryToDiaryResponseDto(Diary diary);
    List<DiaryDto.Response> DiariesToDiaryResponseDtos(List<Diary> diaries);

    default Diary diaryPostDtoToDiary(DiaryDto.Post diaryPostDto){
        Diary diary = new Diary();
        Member member = new Member();

        member.setMemberId(diaryPostDto.getMemberId());
        diary.setMember(member);
        diary.setTitle(diaryPostDto.getTitle());
        diary.setContent(diaryPostDto.getContent());
        diary.setArea1(diaryPostDto.getArea1());
        diary.setArea2(diaryPostDto.getArea2());


        return diary;
    }
}
