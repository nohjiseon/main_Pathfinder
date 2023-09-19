import styled, { keyframes } from "styled-components";
import Wave from "../components/common/Wave";

import ImgSun from "../assets/images/img_sun.png";
import ImgTxt from "../assets/images/main_txt.png";
import ImgCharacter from "../assets/images/character.png";
import ImgTree from "../assets/images/img_tree.png";

const Main = (): JSX.Element => {
  return (
    <MainCon>
      <Wave />
      <Sun>
        <img src={ImgSun} alt="" />
      </Sun>
      <MainTxt>
        <img src={ImgTxt} alt="로그인하고 기록하면 나만의 여행일지를 만들 수 있습니다" />
        <Character>
          <img src={ImgCharacter} alt="" />
        </Character>
      </MainTxt>
      <Tree>
        <img src={ImgTree} alt="" />
      </Tree>
      <Bubbles>
        <Bubble></Bubble>
        <Bubble></Bubble>
        <Bubble></Bubble>
        <Bubble></Bubble>
        <Bubble></Bubble>
      </Bubbles>
    </MainCon>
  );
};
export default Main;

const MainCon = styled.main`
  position: relative;
  min-height: calc(100vh - 120px);
`;

const Gelatine = keyframes`
  from, to { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1.1); }
  50% { transform: scale(1.1, 0.9); }
  75% { transform: scale(0.95, 1.05); }
`;

const Sun = styled.div`
  position: absolute;
  top: 7%;
  left: 10%;
  z-index: -1;
  animation: ${Gelatine} 1s infinite;
  > img {
    width: 6.5vw;
    min-width: 80px;
    max-width: 120px;
  }
`;

const MainTxt = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
  > img {
    width: 26vw;
    min-width: 340px;
    max-width: 600px;
  }
`;

const Bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-30px);}
	60% {transform: translateY(-15px);}
`;

const Character = styled.div`
  position: absolute;
  top: -30%;
  left: calc(50% + 8vw);
  z-index: -1;
  animation: ${Bounce} 2s infinite;
  > img {
    width: 15vw;
    min-width: 120px;
    max-width: 190px;
  }
`;

const Tree = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  text-align: right;
  > img {
    width: 13vw;
    min-width: 190px;
    max-width: 278px;
  }
`;

const Bubbles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  top: 0;
  left: 0;
`;
const Flying = keyframes`
  0% {
    bottom: -100px;
    transform: translateX(0);
  }
  50% {
    transform: translateX(400px);
  }
  100% {
    bottom: 1080px;
    transform: translateX(-200px);
  }
`;

const Bubble = styled.div`
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  opacity: 0.5;
  border: 2px solid #fff;
  animation: ${Flying} 10s infinite ease-in;
  &:nth-child(1) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 8s;
  }
  &:nth-child(2) {
    width: 20px;
    height: 20px;
    left: 20%;
    animation-duration: 5s;
    animation-delay: 1s;
  }
  &:nth-child(3) {
    width: 50px;
    height: 50px;
    left: 35%;
    animation-duration: 10s;
    animation-delay: 2s;
  }
  &:nth-child(4) {
    width: 80px;
    height: 80px;
    left: 50%;
    animation-duration: 7s;
    animation-delay: 0s;
  }
  &:nth-child(5) {
    width: 35px;
    height: 35px;
    left: 55%;
    animation-duration: 6s;
    animation-delay: 1s;
  }
`;
