import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { styled } from "styled-components";
import Wave from "../components/common/Wave";

const Oauth2 = (): JSX.Element => {
  const code = new URL(document.location.toString()).searchParams.get("code");
  const { providerId } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  let provider = "";

  useEffect(() => {
    if (providerId === "kakao") {
      provider = "KAKAO";
    } else if (providerId === "github") {
      provider = "GITHUB";
    }
    axios
      .get(`http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/auth/oauth`, {
        params: {
          provider: provider,
          code: code,
        },
      })
      .then((res) => {
        const accessToken = res.headers.authorization;
        cookies.set("is_login", `${accessToken}`);
        localStorage.setItem("memberId", res.data.memberId);
        navigate("/");
      });
  }, []);

  return (
    <OauthCon>
      <Wave />
      <OauthContent>
        <div>로그인 중입니다. 잠시만 기다려주세요.</div>
      </OauthContent>
    </OauthCon>
  );
};

export default Oauth2;

const OauthCon = styled.div`
  position: relative;
  min-height: calc(100vh - 120px);
`;

const OauthContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
`;
