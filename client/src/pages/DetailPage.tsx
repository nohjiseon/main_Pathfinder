import styled from "styled-components";
import waveBg1 from "../assets/images/wave-bg1.png";

const DetailPage = (): JSX.Element => {
  return (
    <DetailBg>
      <DetailBgImg src={waveBg1} />
      <DetailContentContainer></DetailContentContainer>
    </DetailBg>
  );
};

export default DetailPage;

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
  min-height: 400px;
  background-color: #ffffff;
  opacity: 70%;
`;
