import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";

import SubWave from "../components/common/SubWave";
import RecommendCard from "../components/common/RecommendCard";
import { DiaryData } from "../types/types";

import AirPlane from "../assets/images/ic_air.png";

const recommendData = [
  {
    diaryId: 1,
    name: "홍길동",
    title:
      "나는 긴 제목이야 말줄임처리를 한줄에서 할거야 제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
    content:
      '<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbezjux%2FbtqCX8fuOPX%2F6uq138en4osoKRq9rtbEG0%2Fimg.jpg" alt="라이언옐로우"><p>나는 긴 내용이야 두줄에서 말줄임 처리를 할거야</p><p>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</p><p><br></p><p>',
    area1: "경기도",
    area2: "성남시",
    recommendedCount: 0,
    views: 1,
    createdAt: "2023-09-07T05:00:19.610172",
    modifiedAt: "2023-09-07T05:01:26.83374",
  },
  {
    diaryId: 2,
    name: "홍길동",
    title: "나는 긴 제목이야",
    content:
      '<img src="http://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYsYS3%2FbtqCUcjAZ7r%2Fm5X0e1aFeQfijCZ6ybLQE1%2Fimg.jpg" alt="라이언핑크"><p>나는 긴 내용이야 두줄에서 말줄임 처리를 할거야</p><p>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</p><p><br></p><p>',
    area1: "경기도",
    area2: "성남시",
    recommendedCount: 0,
    views: 1,
    createdAt: "2023-09-07T05:00:19.610172",
    modifiedAt: "2023-09-07T05:01:26.83374",
  },
  {
    diaryId: 3,
    name: "홍길동",
    title: "제목",
    content:
      "<p>나는 긴 내용이야 두줄에서 말줄임 처리를 할거야</p><p>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</p><p><br></p><p>",
    area1: "경기도",
    area2: "성남시",
    recommendedCount: 0,
    views: 1,
    createdAt: "2023-09-07T05:00:19.610172",
    modifiedAt: "2023-09-07T05:01:26.83374",
  },
];

const Recommend = (): JSX.Element => {
  // const [recommendData, setRecommendData] = useState<DiaryData[]>([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/diary/recommend",
  //     );

  //     // response.data가 배열이 아닌 경우 배열로 변환
  //     const dataArray = Array.isArray(response.data) ? response.data : [response.data];

  //     setRecommendData(dataArray);
  //     console.log(dataArray);
  //   } catch (error) {
  //     console.error("데이터 불러오기 실패:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <MainCon>
      <SubWave />
      <RecommendCon>
        <Title>이번 여행지는 부산 어떠세요?</Title>
        <SubTitle>추천 수 가장 높은 게시물</SubTitle>
        <ul>
          {recommendData.map((item: DiaryData) => (
            <RecommendCard key={item.diaryId} data={item}></RecommendCard>
          ))}
        </ul>
      </RecommendCon>
    </MainCon>
  );
};
export default Recommend;

const MainCon = styled.main`
  position: relative;
  min-height: calc(100vh - 120px);
  padding: 35px 20px 70px;
`;

const RecommendCon = styled.div`
  min-width: 600px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 50px 40px;
  box-shadow: 2px 4px 6px rgba(167, 167, 167, 0.15);
  border: 0.5px solid #eaeaea;
`;
const Title = styled.strong`
  display: block;
  padding-bottom: 10px;
  margin-bottom: 24px;
  font-size: 30px;
  &:after {
    content: "";
    display: inline-block;
    width: 40px;
    height: 27px;
    background: url(${AirPlane}) no-repeat center / contain;
    vertical-align: middle;
    margin-left: 15px;
  }
`;

const SubTitle = styled.p`
  font-size: 20px;
  padding-bottom: 20px;
`;
