import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import waveBg1 from "../assets/images/wave-bg1.png";
import backArrow from "../assets/images/back-arrow.png";
import thumbUp from "../assets/images/thumb-up-icon.png";
import eye from "../assets/images/eye-icon.png";
import thumbUpWhite from "../assets/images/thumb-up-icon-white.png";
import { useFetch } from "../hooks/useFetch";
import { diaryDetailState } from "../atoms/atoms";
import { DiaryDetail } from "../types/types";
import { getFormattedDate } from "../util/date";
import axios from "axios";
import { getAccessToken, getUserId } from "../util/auth";

const Detail = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const { fetchData, isLoading, isError, data } = useFetch<DiaryDetail>(
    diaryDetailState,
    `diary/${params.id}`,
  );
  console.log(data);
  const patchBtnHandler = () => {
    // "수정" 버튼을 클릭할 때 글쓰기/편집 페이지로 이동하도록 합니다.
    // diaryId는 수정할 일기의 ID입니다.-
    navigate(`/write-edit/${params.id}`); // 경로 및 파라미터를 적절히 수정하십시오.
  };
  type Headers = Record<string, string>;
  const headers: Headers = {};
  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const likeBtnHandler = async () => {
    try {
      const response = await axios.post(`recommend?memberId=${getUserId()}&diaryId=${params.id}`, {
        headers,
      });
      if (response.status === 201 || 200) {
        console.log(data);
      } else {
        console.error(`${response.status} 실패`);
      }
    } catch (error) {
      alert("권한이 없습니다.");
    }
    await fetchData();
  };
  const deleteBtnHandler = async () => {
    try {
      const response = await axios.delete(`diary/${params.id}`, {
        headers,
      });
      if (response.status === 201 || 200) {
        console.log(data);
      }
    } catch (error) {
      alert("권한이 없습니다.");
    }
    await navigate(-1);
  };
  if (isLoading) {
    return <DetailBg>Loading...</DetailBg>;
  }
  if (isError) {
    return <DetailBg>Error...!</DetailBg>;
  }
  return (
    <DetailBg>
      <DetailBgImg src={waveBg1} />
      <DetailContentContainer>
        <DetailArrowContainer>
          <img src={backArrow} onClick={() => navigate(-1)} />
        </DetailArrowContainer>
        <DetailMainContent>
          <DetailTitleContainer>
            <DetailTitle>{data?.data.title}</DetailTitle>
            <DetailSide>
              <DetailDiaryInfo>{data?.data.name}</DetailDiaryInfo>
              <DetailDiaryInfo>{getFormattedDate(data?.data.modifiedAt)}</DetailDiaryInfo>
            </DetailSide>
          </DetailTitleContainer>
          <DetailContent>
            <DetailReaderRecordContainer>
              <DetailReaderRecord>
                <img src={thumbUp} />
                <div>{data?.data.recommendedCount}</div>
              </DetailReaderRecord>
              <DetailReaderRecord>
                <img src={eye} />
                <div>{data?.data.views}</div>
              </DetailReaderRecord>
            </DetailReaderRecordContainer>
            <DetailContentBox>
              <DetailConentParagraph>
                <div dangerouslySetInnerHTML={{ __html: data?.data.content }}></div>
              </DetailConentParagraph>
              <DetailBtnContainer>
                {data?.data.recommend ? (
                  <DetailLikeBtnFocus
                    onClick={() => {
                      likeBtnHandler();
                    }}
                  >
                    <img src={thumbUpWhite} />
                    <span>추천</span>
                  </DetailLikeBtnFocus>
                ) : (
                  <DetailLikeBtn
                    onClick={() => {
                      likeBtnHandler();
                    }}
                  >
                    <img src={thumbUp} />
                    <span>추천</span>
                  </DetailLikeBtn>
                )}
                <DetailEditBtnContainer>
                  <DetailEditBtn
                    onClick={() => {
                      patchBtnHandler();
                    }}
                  >
                    수정
                  </DetailEditBtn>
                  <DetailCancelBtn
                    onClick={() => {
                      deleteBtnHandler();
                    }}
                  >
                    삭제
                  </DetailCancelBtn>
                </DetailEditBtnContainer>
              </DetailBtnContainer>
            </DetailContentBox>
          </DetailContent>
        </DetailMainContent>
      </DetailContentContainer>
    </DetailBg>
  );
};

export default Detail;

const DetailBg = styled.div`
  min-height: calc(100vh - 120px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const DetailBgImg = styled.img`
  position: fixed;
  max-width: 100%;
  z-index: -100;
  left: 0;
  bottom: 0px;
`;

const DetailContentContainer = styled.div`
  width: 1200px;
  min-height: calc(100vh - 120px);
  background-color: rgba(255, 255, 255, 0.7);
  border-left: 1px solid #f3f3f3;
  border-right: 1px solid #f3f3f3;
`;

const DetailArrowContainer = styled(DetailContentContainer)`
  width: 1200px;
  min-height: 0%;
  height: 80px;
  padding: 30px 40px 10px 40px;
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  opacity: 100%;
  background-color: #ffffff;

  img {
    cursor: pointer;
  }
`;

const DetailMainContent = styled.div`
  padding: 100px 50px 30px 50px;
`;

const DetailTitleContainer = styled.div`
  border-bottom: 1px solid #bebebe;
  padding: 0 5px 10px 5px;
`;

const DetailTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const DetailSide = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-top: 5px;
`;

const DetailDiaryInfo = styled.span`
  font-weight: 400;
`;

const DetailContent = styled.div`
  padding: 10px 5px 0 5px;
`;

const DetailReaderRecordContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
`;

const DetailReaderRecord = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  img {
    width: 16px;
    height: 16px;
  }
`;

const DetailContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const DetailConentParagraph = styled.div`
  width: 1000px;
  margin-top: 20px;
  line-height: 30px;
`;

const DetailBtnContainer = styled.div`
  width: 1000px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`;

const DetailLikeBtn = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 0 0 1px #bebebe inset;
  border-radius: 4px;
  color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  img {
    width: 16px;
    height: 16px;
  }
`;

const DetailLikeBtnFocus = styled(DetailLikeBtn)`
  background-color: #416dc9;
  color: #ffffff;
  box-shadow: none;
  animation: vibration 0.1s infinite;
  animation-iteration-count: 6;

  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
  }
`;

const DetailEditBtnContainer = styled.div`
  width: 48%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
`;

const DetailEditBtn = styled(DetailLikeBtn)`
  background-color: #ffc03f;
  color: #ffffff;
  box-shadow: none;
`;

const DetailCancelBtn = styled(DetailEditBtn)`
  background-color: #f36c68;
`;
