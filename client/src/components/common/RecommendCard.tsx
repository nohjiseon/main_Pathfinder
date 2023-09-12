import { styled } from "styled-components";
import { useEffect, useState } from "react";

import { DiaryData } from "../../types/types";
import { Link } from "react-router-dom";

import Ic_1st from "../../assets/images/ic_1st.png";
import Ic_2st from "../../assets/images/ic_2st.png";
import Ic_3st from "../../assets/images/ic_3st.png";
import IcPin from "../../assets/images/ic_pin.png";
import EmptyImg from "../../assets/images/img_empty.png";

const RecommentCard = ({ data }: { data: DiaryData }): JSX.Element => {
  const [imageUrl, setImageUrl] = useState(""); // 이미지 url 상태 관리
  const [altText, setAltText] = useState(""); // 이미지 alt 상태 관리
  const [textContent, setTextContent] = useState(""); // 텍스트 내용 상태 관리

  // 썸네일
  useEffect(() => {
    if (!data || !data.content) {
      return;
    }

    // data.content에서 첫 번째 이미지 URL을 추출
    const imgPattern = /<img\s+[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/i;
    const match = data.content.match(imgPattern);

    if (match) {
      const firstImageUrl = match[1];
      const imgAltText = match[2];

      setImageUrl(firstImageUrl);
      setAltText(imgAltText);
    }
  }, [data]);

  // html 태그 제거 & 이미지 제거
  useEffect(() => {
    const htmlContent = data.content;
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const textContent = div.textContent || div.innerText;
    setTextContent(textContent);
  }, [data]);

  return (
    <CardBox>
      <Link to={`/${data.diaryId}`}>
        <ImgBox>
          <img src={imageUrl} alt={altText} />
        </ImgBox>
        <Content>
          <TxtBox>
            <strong>{data.title}</strong>
            <p>{textContent}</p>
          </TxtBox>
          <Information>
            여행 장소: {data.area1} {data.area2}
          </Information>
        </Content>
      </Link>
    </CardBox>
  );
};

export default RecommentCard;

const CardBox = styled.li`
  position: relative;
  padding-left: 70px;
  margin-bottom: 30px;
  > a {
    display: flex;
    align-items: center;
    height: 150px;
  }
  &:last-child {
    margin-bottom: 0;
  }

  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 90px;
    background: no-repeat center / contain;
  }
  &:first-child:before {
    background-image: url(${Ic_1st});
  }
  &:nth-child(2):before {
    background-image: url(${Ic_2st});
  }
  &:nth-child(3):before {
    background-image: url(${Ic_3st});
  }
`;

const ImgBox = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  background: url(${EmptyImg}) no-repeat center / 70px #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  img {
    object-fit: cover;
    min-width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 166px);
  height: 100%;
  padding: 10px 0;
`;

const TxtBox = styled.div`
  max-width: 500px;
  strong {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    padding-bottom: 12px;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 24px;
    max-height: 48px;
  }
`;

const Information = styled.div`
  font-size: 14px;
  &::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(${IcPin}) no-repeat center / contain;
    vertical-align: top;
    margin-right: 6px;
  }
`;
