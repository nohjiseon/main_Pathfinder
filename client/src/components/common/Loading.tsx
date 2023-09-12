import { styled } from "styled-components";
import LoadingImg from "../../assets/images/loading.gif";

const Loading = () => {
  return (
    <LoadingBox>
      <img src={LoadingImg} alt="" />
    </LoadingBox>
  );
};
export default Loading;

const LoadingBox = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 100px;
  }
`;
