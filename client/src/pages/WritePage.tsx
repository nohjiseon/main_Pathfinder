import styled from "styled-components";
import WriteForm from "../components/WriteForm";
const WritePage = () => {
  return (
    <WriteCon>
      <WriteForm></WriteForm>
    </WriteCon>
  );
};
export default WritePage;

const WriteCon = styled.main`
  min-height: calc(100vh - 120px);
  padding: 10px 20px; // 그림자 때문에 위 아래 padding 값 10px 줌
`;
