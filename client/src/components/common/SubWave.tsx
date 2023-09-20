import styled, { keyframes } from "styled-components";

const SubWave = (): JSX.Element => {
  return (
    <WaveCon>
      <Waves
        xmlns="http://www.w3.org/2000/svg" // SVG 요소의 속성 정의
        // xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 20 150 30" // 좌표 시스템 보여질 영영 min-x min-y width height
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
          <use href="#BlueWave" x="48" y="0" fill="#F3FAFD" />
          <use href="#BlueWave" x="48" y="3" fill="#E2F2F7" />
        </Motion>
      </Waves>
    </WaveCon>
  );
};
export default SubWave;

const WaveCon = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  padding-top: 250px;
  min-height: calc(100vh - 120px);
  background-image: linear-gradient(to bottom, transparent 519px, #e2f2f7 520px);
  z-index: -1;
`;

const Waves = styled.svg`
  position: relative;
  max-width: 1920px;
  width: 100%;
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
    animation: ${wave} 25s cubic-bezier(0.7, 0.7, 0.45, 0.5) infinite;
  }
  > use:nth-child(1) {
    animation-duration: 12s;
  }
  > use:nth-child(2) {
    animation-delay: -2s;
    animation-duration: 20s;
  }
`;
