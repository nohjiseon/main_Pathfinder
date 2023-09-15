import styled, { keyframes } from "styled-components";

const Wave = (): JSX.Element => {
  return (
    <WaveCon>
      <Waves
        xmlns="http://www.w3.org/2000/svg" // SVG 요소의 속성 정의
        // xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 20 180 30" // 좌표 시스템 보여질 영영 min-x min-y width height
        preserveAspectRatio="none" // viewBox 내의 영역을 어떻게 유지할지
        shapeRendering="auto" // SVG 요소의 랜더링 품질을 조절하는 속성
      >
        <defs>
          <path
            id="BlueWave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <Motion>
          {/* href 를 사용하여 path 요소 재사용 */}
          <use href="#BlueWave" x="48" y="0" fill="#416DC9" />
          <use href="#BlueWave" x="48" y="3" fill="#E2F2F7" />
          <use href="#BlueWave" x="48" y="5" fill="#badeff" />
        </Motion>
      </Waves>
    </WaveCon>
  );
};
export default Wave;

const WaveCon = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  padding-top: 250px;
  height: calc(100vh - 120px);
  background-image: linear-gradient(to bottom, transparent 519px, #badeff 520px);
  z-index: -1;
  bottom: 0;
`;

const Waves = styled.svg`
  position: relative;
  width: 1920px;
  height: 270px;
  margin-bottom: -7px; /*Fix for safari gap*/
`;

const wave = keyframes`
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
`;

const Motion = styled.g`
  > use {
    animation: ${wave} 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  > use:nth-child(1) {
    animation-duration: 9s;
  }
  > use:nth-child(2) {
    animation-delay: -2s;
    animation-duration: 12s;
  }
  > use:nth-child(3) {
    animation-delay: -5s;
  }
`;
