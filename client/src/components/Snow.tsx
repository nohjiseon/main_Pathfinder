import styled, { keyframes } from "styled-components";
import ImgFlake from "../assets/images/flack.png";

const Snow = () => {
  return (
    <SnowBox>
      <Flake></Flake>
      <Flake></Flake>
      <Flake></Flake>
      <Flake></Flake>
      <Flake></Flake>
      <Flake></Flake>
      <Flake></Flake>
      <Flake></Flake>
      <Flake></Flake>
      <Flake></Flake>
    </SnowBox>
  );
};
export default Snow;

const SnowBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  top: 0;
  left: 0;
`;
const Flying = keyframes`
  0% {
    top: -100px;
    transform: translateX(-200px);
  }
  50% {
    transform: translateX(400px);
  }
  100% {
    top: 1080px;
    transform: translateX(0);
  }
`;

const Flake = styled.div`
  position: absolute;
  top: 0;
  opacity: 0.5;
  background: url(${ImgFlake}) no-repeat center / contain;
  animation: ${Flying} 10s infinite ease-in;
  &:nth-child(1) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 8s;
  }
  &:nth-child(2) {
    width: 30px;
    height: 30px;
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
  &:nth-child(6) {
    width: 40px;
    height: 40px;
    right: 10%;
    animation-duration: 6s;
  }
  &:nth-child(7) {
    width: 30px;
    height: 30px;
    right: 20%;
    animation-duration: 7s;
    animation-delay: 2s;
  }
  &:nth-child(8) {
    width: 50px;
    height: 50px;
    right: 35%;
    animation-duration: 12s;
    animation-delay: 1s;
  }
  &:nth-child(9) {
    width: 80px;
    height: 80px;
    right: 50%;
    animation-duration: 5s;
    animation-delay: 0s;
  }
  &:nth-child(10) {
    width: 35px;
    height: 35px;
    right: 55%;
    animation-duration: 8s;
    animation-delay: 0s;
  }
`;
