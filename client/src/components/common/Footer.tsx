import styled from "styled-components";
import logoWhite from "../../assets/images/logo_w.png";

const Footer = () => {
  return (
    <FooterCon>
      <img src={logoWhite} />
      <span>by. Pathfinder</span>
    </FooterCon>
  );
};
export default Footer;

const FooterCon = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 40px;
  background-color: #303237;
  max-width: 1920px;
  margin: 0 auto;
  color: #fff;
  > img {
    width: 16px;
  }
  > span {
    font-weight: 200;
  }
`;
