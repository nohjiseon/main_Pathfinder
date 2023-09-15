import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { DiaryData } from "../types/types";
import SubWave from "../components/common/SubWave";
import RecommendCard from "../components/common/RecommendCard";
import Loading from "../components/common/Loading";
import AirPlane from "../assets/images/ic_air.png";

const Recommend = (): JSX.Element => {
  const [recommendData, setRecommendData] = useState<DiaryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/diary/recommend",
      );
      setRecommendData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainCon>
      <SubWave />
      <RecommendCon>
        <Title>이번 여행지는 부산 어떠세요?</Title>
        <SubTitle>추천 수 가장 높은 게시물</SubTitle>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>server Error...</div>
        ) : (
          <ul>
            {recommendData.map((item: DiaryData) => (
              <RecommendCard key={item.diaryId} data={item}></RecommendCard>
            ))}
          </ul>
        )}
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
  min-height: 726px;
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
