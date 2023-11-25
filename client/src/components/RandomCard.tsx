import { styled } from "styled-components";
import { RandomData } from "../types/types";

import EmptyImg from "../assets/images/img_empty.png";

const RandomCard = ({ data }: { data: RandomData }) => {
  return (
    <RandomBox>
      <ImgBox>
        <img src={data.firstimage} alt="" />
      </ImgBox>
      <InfoBox>
        <strong>{data.title}</strong>
        <p>
          {data.addr1} {data.addr2}
        </p>
      </InfoBox>
    </RandomBox>
  );
};
export default RandomCard;

const RandomBox = styled.li`
  width: calc(33.33% - 13.33px);
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 150px;
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

const InfoBox = styled.div`
  strong {
    display: block;
    font-size: 20px;
    padding: 12px 0 8px;
  }
  p {
    padding-bottom: 4px;
  }
  span {
    display: block;
    padding-top: 12px;
    font-size: 14px;
  }
`;
