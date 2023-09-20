import styled from "styled-components";
import Modal from "./Modal";
import logoWhite from "../../assets/images/logo_w.png";
import githubWhite from "../../assets/images/github-w.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { teamModalState } from "../../atoms/atoms";
import sumin from "../../assets/images/team/sumin.png";
import minyong from "../../assets/images/team/minyong.png";
import jungwoo from "../../assets/images/team/jungwoo.jpg";
import jiseon from "../../assets/images/team/jiseon.png";
import maruhan from "../../assets/images/team/maruhan.png";
import jaeyeon from "../../assets/images/team/jaeyeon.png";
import github from "../../assets/images/github.png";

const Footer = () => {
  const setTeamModal = useSetRecoilState(teamModalState);
  const teamModal = useRecoilValue(teamModalState);

  const modalChildren: JSX.Element = (
    <div className="footer-con">
      <div className="footer-h1">TEAM PATHFINDER</div>
      <div className="footer-intro">
        <div className="footer-h2">BE</div>
        <div className="footer-team-con">
          <div className="footer-team">
            <img src={sumin} alt="팀원 사진" className="footer-teammate" />
            <span>김수민 (팀장)</span>
            <a href="https://github.com/qt5860" target="_blank">
              <img src={github} alt="깃허브 아이콘" className="footer-github" />
            </a>
          </div>
          <div className="footer-team">
            <img src={minyong} alt="팀원 사진" className="footer-teammate" />
            <span>박민용</span>
            <a href="https://github.com/minyongP" target="_blank">
              <img src={github} alt="깃허브 아이콘" className="footer-github" />
            </a>
          </div>
          <div className="footer-team">
            <img src={jungwoo} alt="팀원 사진" className="footer-teammate" />
            <span>박정우</span>
            <a href="https://github.com/mhyjw98" target="_blank">
              <img src={github} alt="깃허브 아이콘" className="footer-github" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-intro">
        <div className="footer-h2">FE</div>
        <div className="footer-team-con">
          <div className="footer-team">
            <img src={jiseon} alt="팀원 사진" className="footer-teammate" />
            <span>노지선 (부팀장)</span>
            <a href="https://github.com/nohjiseon" target="_blank">
              <img src={github} alt="깃허브 아이콘" className="footer-github" />
            </a>
          </div>
          <div className="footer-team">
            <img src={maruhan} alt="팀원 사진" className="footer-teammate" />
            <span>이마루한</span>
            <a href="https://github.com/ddussi" target="_blank">
              <img src={github} alt="깃허브 아이콘" className="footer-github" />
            </a>
          </div>
          <div className="footer-team">
            <img src={jaeyeon} alt="팀원 사진" className="footer-teammate" />
            <span>한재연</span>
            <a href="https://github.com/Jess-Apr" target="_blank">
              <img src={github} alt="깃허브 아이콘" className="footer-github" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <FooterCon>
      {teamModal ? <Modal children={modalChildren} /> : null}
      <img src={logoWhite} />
      <FooterMid onClick={() => setTeamModal(true)}>
        <span>Team</span>
        <img src={githubWhite} />
      </FooterMid>
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

const FooterMid = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 20px;

  &:hover {
    background-color: #252629;
    cursor: pointer;
  }

  > span {
    font-weight: 200;
  }
  > img {
    width: 20px;
    height: 20px;
  }
`;
