import styled, { keyframes } from "styled-components";
import ImgSun from "../assets/images/img_sun.png";

const Clear = () => {
  return (
    <Sun>
      <img src={ImgSun} alt="" />
    </Sun>
  );
};
export default Clear;

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
