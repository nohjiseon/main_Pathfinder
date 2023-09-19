import styled from "styled-components";
import Wave from "../components/common/Wave";
import ImgTree from "../assets/images/img_tree.png";

const MainCon = styled.main`
  position: relative;
  min-height: calc(100vh - 120px);
`;

const MainTxt = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  font-size: 40px;
  font-weight: bold;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
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

const Error = (): JSX.Element => {
  return (
    <MainCon>
      <Wave />
      <MainTxt>앗..! 페이지를 찾을 수 없습니다!</MainTxt>
      <Tree>
        <img src={ImgTree} alt="" />
      </Tree>
    </MainCon>
  );
};

export default Error;
