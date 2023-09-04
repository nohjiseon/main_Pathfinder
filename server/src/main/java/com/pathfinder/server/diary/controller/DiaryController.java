package com.pathfinder.server.diary.controller;

import com.pathfinder.server.dto.MultiResponseDto;
import com.pathfinder.server.dto.SingleResponseDto;
import com.pathfinder.server.diary.entity.Diary;
import com.pathfinder.server.diary.dto.DiaryDto;
import com.pathfinder.server.diary.mapper.DiaryMapper;
import com.pathfinder.server.diary.service.DiaryService;
import com.pathfinder.server.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/diary")
public class DiaryController {
    private final static String DIARY_DEFAULT_URL = "/diary";
    private DiaryService diaryService;
    private DiaryMapper mapper;

    public DiaryController(DiaryService diaryService, DiaryMapper mapper) {
        this.diaryService = diaryService;
        this.mapper = mapper;
    }

    @PostMapping("/registration") // 게시글 생성
    public ResponseEntity postDiary(@RequestBody DiaryDto.Post diaryPostDto) {
        Diary diary = diaryService.createDiary(mapper.diaryPostDtoToDiary(diaryPostDto));

        URI location = UriCreator.createUri(DIARY_DEFAULT_URL, diary.getDiaryId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{diary-id}") //게시글 자세히 보기
    public ResponseEntity getDiary(@PathVariable("diary-id") Long diaryId){
        Diary diary = diaryService.getDiary(diaryId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.DiaryToDiaryResponseDto(diary)),
                HttpStatus.OK);
    }

    @GetMapping // 전체 게시글 조회
    public ResponseEntity getDiaries(@RequestParam int page) {
        Page<Diary> pageDiaries = diaryService.getDiaries(page - 1);

        List<Diary> diaries = pageDiaries.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.DiariesToDiaryResponseDtos(diaries),
                        pageDiaries),
                HttpStatus.OK);
    }
    @GetMapping("/area/{area1}") // area1을 갖는 게시글 조회
    public ResponseEntity getDiariesByRegion(@PathVariable("area1") String area1,
                                             @RequestParam int page) {
        Page<Diary> pageDiaries = diaryService.getDiariesByRegion(area1, page);

        List<Diary> diaries = pageDiaries.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.DiariesToDiaryResponseDtos(diaries),
                        pageDiaries),
                HttpStatus.OK);
    }

    @GetMapping("/member/{member-id}") // member가 작성한 게시글 조회
    public ResponseEntity getDiariesByRegion(@PathVariable("member-id") Long memberId,
                                             @RequestParam int page) {
        Page<Diary> pageDiaries = diaryService.getDiariesByMember(memberId, page);

        List<Diary> diaries = pageDiaries.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.DiariesToDiaryResponseDtos(diaries),
                        pageDiaries),
                HttpStatus.OK);
    }

    @GetMapping("/recommend") // 추천순으로 상위 3개 게시글 리스트 조회
    public ResponseEntity getDiariesByRegion() {
        List<Diary> top3Diaries = diaryService.getTop3DiariesByRecommendedCount();

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.DiariesToDiaryResponseDtos(top3Diaries)),
                HttpStatus.OK);
    }

    @PatchMapping("/edit/{diary-id}")
    public ResponseEntity patchDiary(@PathVariable("diary-id") long diaryId,
                                      @RequestBody DiaryDto.Patch diaryPatchDto) {
        diaryPatchDto.setDiaryId(diaryId);
        Diary diary = diaryService.updateDiary(mapper.diaryPatchDtoToDiary(diaryPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.DiaryToDiaryResponseDto(diary)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{diary-id}")
    public ResponseEntity deleteDiary(@PathVariable("diary-id") Long diaryId){
        diaryService.deleteDiary(diaryId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
