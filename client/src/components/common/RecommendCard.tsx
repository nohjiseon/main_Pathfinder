import { styled } from "styled-components";

import Ic_1st from "../../assets/images/ic_1st.png";
import Ic_2st from "../../assets/images/ic_2st.png";
import Ic_3st from "../../assets/images/ic_3st.png";
import IcPin from "../../assets/images/ic_pin.png";
import EmptyImg from "../../assets/images/img_empty.png";

const RecommentCard = (): JSX.Element => {
  return (
    <CardBox>
      <ImgBox>
        <img src="img2.jpeg" alt="" />
      </ImgBox>
      <Content>
        <TxtBox>
          <strong>
            나는 긴 제목이야 말줄임처리를 한줄에서 할거야
            제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
          </strong>
          <p>
            나는 긴 내용이야 두줄에서 말줄임 처리를 할거야
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </p>
        </TxtBox>
        <Information>여행 장소: 부산</Information>
      </Content>
    </CardBox>
  );
};

export default RecommentCard;

const CardBox = styled.li`
  position: relative;
  padding-left: 70px;
  display: flex;
  align-items: center;
  height: 150px;
  margin-bottom: 30px;
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
  &:last-child:before {
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
