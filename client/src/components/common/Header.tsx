import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import IcMenu from "../../assets/images/menu.png";
import IcMenuOpen from "../../assets/images/menu_open.png";
import logo from "../../assets/images/logo.png";
import logoTxt from "../../assets/images/logo_txt.png";

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const getCookie = cookies.get("is_login");
  const memberId = localStorage.getItem("memberId");

  const MenuHandeler = (): void => {
    setIsOpen(!isOpen);
  };

  const LogoutMenuHandeler = (): boolean => {
    alert("로그인 후 이용할 수 있는 서비스입니다.");
    return false;
  };

  useEffect(() => {
    if (getCookie) {
      axios
        .get(
          `http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/member/mypage/${memberId}`,
          {
            headers: {
              "Content-Type": `application/json`,
            },
          },
        )
        .then((res) => {
          setNickname(res.data.data.name);
          setProfilePhoto(res.data.data.profileImageUrl);
          setIsLogin(true);
        })
        .catch(() => {
          console.log("데이터 로딩에 실패하였습니다.");
        });
    } else {
      setIsLogin(false);
    }
  }, [getCookie]);

  const handleLogoutClick = () => {
    MenuHandeler();
    cookies.remove("is_login");
    localStorage.removeItem("token");
    localStorage.removeItem("memberId");
    setIsLogin(false);
    navigate("/");
    alert("성공적으로 로그아웃 되었습니다.");
  };

  return (
    <HeaderCon>
      <Logo to="/">
        <img src={logo} />
        <img src={logoTxt} />
      </Logo>
      {isLogin ? (
        <BtnBox>
          <ProfileInfo>반갑습니다! {nickname}님</ProfileInfo>
          <Link to="/mypage">
            <ProfileImg>
              <img src={profilePhoto} />
            </ProfileImg>
          </Link>
          <MenuBtn className={isOpen ? "active" : ""} onClick={MenuHandeler}></MenuBtn>

          <Menu className={isOpen ? "active" : ""}>
            <Link to="/areamap" onClick={MenuHandeler}>
              여행기록 모아보기
            </Link>
            <Link to="/mypage" onClick={MenuHandeler}>
              마이페이지
            </Link>
            <Link to="/write" onClick={MenuHandeler}>
              글 작성하기
            </Link>
            <Link to="/recommend" onClick={MenuHandeler}>
              여행지 추천
            </Link>
            <Link to="/" onClick={handleLogoutClick}>
              로그아웃
            </Link>
          </Menu>
        </BtnBox>
      ) : (
        <BtnBox>
          <Link to="/login">
            <Button>로그인</Button>
          </Link>
          <Link to="/signup">
            <Button $signup>회원가입</Button>
          </Link>
          <MenuBtn className={isOpen ? "active" : ""} onClick={MenuHandeler}></MenuBtn>

          <Menu className={isOpen ? "active" : ""}>
            <Link to="/areamap" onClick={MenuHandeler}>
              여행기록 모아보기
            </Link>
            <div onClick={LogoutMenuHandeler}>마이페이지</div>
            <div onClick={LogoutMenuHandeler}>글 작성하기</div>
            <Link to="/recommend" onClick={MenuHandeler}>
              여행지 추천
            </Link>
          </Menu>
        </BtnBox>
      )}
    </HeaderCon>
  );
};

export default Header;

const HeaderCon = styled.header`
  position: fixed;
  left: 20px;
  right: 20px;
  top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 3px 8px 10px #e7e7e7;
  border-radius: 8px;
  max-width: 1920px;
  margin: 0 auto;
  margin-bottom: 10px;
  z-index: 100;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  > img:first-child {
    height: 26px;
  }
  > img:last-child {
    height: 16px;
    margin-left: 14px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button<{ $signup?: boolean }>`
  width: 100px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  background-color: ${(props) => (props.$signup ? "#1A298E" : "#416DC9")};
`;

const ProfileInfo = styled.span`
  font-size: 12px;
`;

const ProfileImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  box-shadow: 2px 2px 2px rgba(175, 175, 175, 0.25);
  border: 1px solid #d9d9d9;
  > img {
    width: 25px;
  }
`;

const MenuBtn = styled.button`
  width: 32px;
  height: 32px;
  background: url(${IcMenu}) no-repeat center / 32px;
  transition: 0.3s;
  &.active {
    background-image: url(${IcMenuOpen});
  }
`;

const Menu = styled.div`
  position: fixed;
  right: 20px;
  top: 82px;
  width: 231px;
  background-color: #fff;
  box-shadow: 3px 8px 10px #e7e7e7;
  border-radius: 8px;
  padding: 10px 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  &.active {
    opacity: 1;
    visibility: visible;
  }
  > a,
  div {
    display: block;
    height: 42px;
    line-height: 42px;
    padding: 0 12px;
    border-radius: 4px;
    font-size: 14px;
    transition: 0.3s;
    &:last-child {
      color: #f36c68;
    }
    &:hover {
      background-color: #dde8ff;
      color: #416dc9;
    }
  }
`;
