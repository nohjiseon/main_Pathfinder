import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import waveBg1 from "../assets/images/wave-bg1.png";
import backArrow from "../assets/images/back-arrow.png";
import thumbUp from "../assets/images/thumb-up-icon.png";
import eye from "../assets/images/eye-icon.png";
import thumbUpWhite from "../assets/images/thumb-up-icon-white.png";

const Detail = (): JSX.Element => {
  const [isRecommended, setIsRecommended] = useState(false);
  const navigate = useNavigate();

  return (
    <DetailBg>
      <DetailBgImg src={waveBg1} />
      <DetailContentContainer>
        <DetailArrowContainer>
          <img src={backArrow} onClick={() => navigate(-1)} />
        </DetailArrowContainer>
        <DetailMainContent>
          <DetailTitleContainer>
            <DetailTitle>제목</DetailTitle>
            <DetailSide>
              <DetailDiaryInfo>아이디</DetailDiaryInfo>
              <DetailDiaryInfo>2023/08/31</DetailDiaryInfo>
            </DetailSide>
          </DetailTitleContainer>
          <DetailContent>
            <DetailReaderRecordContainer>
              <DetailReaderRecord>
                <img src={thumbUp} />
                <div>0</div>
              </DetailReaderRecord>
              <DetailReaderRecord>
                <img src={eye} />
                <div>0</div>
              </DetailReaderRecord>
            </DetailReaderRecordContainer>
            <DetailContentBox>
              <DetailContentImg></DetailContentImg>
              <DetailConentParagraph>
                <p>
                  내용내용내용내용내용내용내용
                  <br />
                  내용내용내용내용내용내용
                  <br />
                  내용내용
                  <br />
                  내용내용내용내용내용
                </p>
              </DetailConentParagraph>
              <DetailBtnContainer>
                {isRecommended ? (
                  <DetailLikeBtnFocus onClick={() => setIsRecommended(false)}>
                    <img src={thumbUpWhite} />
                    <span>추천</span>
                  </DetailLikeBtnFocus>
                ) : (
                  <DetailLikeBtn onClick={() => setIsRecommended(true)}>
                    <img src={thumbUp} />
                    <span>추천</span>
                  </DetailLikeBtn>
                )}
                <DetailEditBtnContainer>
                  <DetailEditBtn>수정</DetailEditBtn>
                  <DetailCancelBtn>삭제</DetailCancelBtn>
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

const DetailContentImg = styled.img`
  width: 1000px;
  height: 300px;
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
