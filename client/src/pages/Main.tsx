import styled from "styled-components";
const Main = () => {
  return <MainCon>ㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ</MainCon>;
};
export default Main;

const MainCon = styled.main`
  min-height: calc(100vh - 120px);
  padding: 10px 20px; // 그림자 때문에 위 아래 padding 값 10px 줌
`;
