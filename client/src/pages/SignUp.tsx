import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Wave from "../components/common/Wave";
import Modal from "../components/common/Modal";
import ImgSun from "../assets/images/img_sun.png";
import ImgCharacter from "../assets/images/character.png";
import loading from "../assets/images/loading.gif";
import Uncheck from "../assets/images/un-check.png";
import Check from "../assets/images/check.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { consentModalState } from "../atoms/atoms";

const SignUp = (): JSX.Element => {
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [isHidePasswordCheck, setIsHidePasswordCheck] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const setConsentModal = useSetRecoilState(consentModalState);
  const consentModal = useRecoilValue(consentModalState);

  interface Form {
    email: string;
    nickname: string;
    password: string;
    passwordCheck: string;
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Form>();

  function SignUpSubmit(data: Form): void {
    if (isChecked === false) {
      alert("약관에 동의하셔야 사이트 회원가입이 가능합니다.");
    } else {
      setIsLoading(true);
      axios
        .post(
          `http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/auth/signup`,
          {
            name: data.nickname,
            email: data.email,
            password: data.password,
            agreeToTerms: isChecked,
          },
          { headers: { "Content-Type": "application/json" } },
        )
        .then(() => {
          window.alert("회원가입이 완료되었습니다. 로그인 해주세요.");
          setIsLoading(false);
          navigate("/login");
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert("이미 존재하는 이메일입니다.");
          }
          setIsLoading(false);
        });
    }
  }

  const modalChildren: JSX.Element = (
    <div className="consent-con">
      <strong>약관동의</strong>
      <div className="txt-conbox">
        <div className="consent-intro">
          * 해당 약관은 코드스테이츠의 45기 교육 과정 중 메인 프로젝트를 진행하는 과정에서 약관 동의
          기능을 구현하는 연습을 하기 위해 예시로 작성된 샘플을 가져온 것으로, 법적으로 아무런
          효력이 없음을 알려드립니다.
        </div>
        <div className="consent-intro">
          약관 예시 출처:{" "}
          <a href="https://www.bver.co.kr/bbs/new/22163" className="consent-link" target="_blank">
            https://www.bver.co.kr/bbs/new/22163
          </a>
        </div>
        <div className="consent-h1">제 1 장 총 칙</div>
        <div className="consent-h2">제 1 조 (목적)</div>
        <div className="consent-h3">
          이 약관은 Pathfinder(이하 "사이트"라 합니다)에서 제공하는 인터넷서비스(이하 "서비스"라
          합니다)의 이용 조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.
        </div>
        <div className="consent-h2">제 2 조 (약관의 효력 및 변경)</div>
        <div className="consent-h3">
          <ul>
            <li>
              ① 이 약관은 서비스 화면이나 기타의 방법으로 이용고객에게 공지함으로써 효력을
              발생합니다.
            </li>
            <li>
              ② 사이트는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지
              또는 통지함으로써 효력을 발생합니다.
            </li>
          </ul>
        </div>
        <div className="consent-h2">제 3 조 (용어의 정의)</div>
        <div className="consent-h3">
          <ul>
            <li>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</li>
            <li>
              ① 회원 : 사이트와 서비스 이용계약을 체결하거나 이용자 아이디(ID)를 부여받은 개인 또는
              단체를 말합니다.
            </li>
            <li>② 신청자 : 회원가입을 신청하는 개인 또는 단체를 말합니다.</li>
            <li>
              ③ 아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이 정하고 사이트가 승인하는
              문자와 숫자의 조합을 말합니다.
            </li>
            <li>
              ④ 비밀번호 : 회원이 부여 받은 아이디(ID)와 일치된 회원임을 확인하고, 회원 자신의
              비밀을 보호하기 위하여 회원이 정한 문자와 숫자의 조합을 말합니다.
            </li>
            <li>⑤ 해지 : 사이트 또는 회원이 서비스 이용계약을 취소하는 것을 말합니다.</li>
          </ul>
        </div>
        <div className="consent-h1">제 2 장 서비스 이용계약</div>
        <div className="consent-h2">제 4 조 (이용계약의 성립)</div>
        <div className="consent-h3">
          <ul>
            <li>① 이용약관 하단의 동의 버튼을 누르면 이 약관에 동의하는 것으로 간주됩니다.</li>
            <li>
              ② 이용계약은 서비스 이용희망자의 이용약관 동의 후 이용 신청에 대하여 사이트가
              승낙함으로써 성립합니다.
            </li>
          </ul>
        </div>
        <div className="consent-h2">제 5 조 (이용신청)</div>
        <div className="consent-h3">
          <ul>
            <li>
              ① 신청자가 본 서비스를 이용하기 위해서는 사이트 소정의 가입신청 양식에서 요구하는
              이용자 정보를 기록하여 제출해야 합니다.
            </li>
            <li>
              ② 가입신청 양식에 기재하는 모든 이용자 정보는 모두 실제 데이터인 것으로 간주됩니다.
              실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를 받을 수 없으며, 서비스의
              제한을 받을 수 있습니다.
            </li>
          </ul>
        </div>
        <div className="consent-h2">제 6 조 (이용신청의 승낙)</div>
        <div className="consent-h3">
          <ul>
            <li>
              ① 사이트는 신청자에 대하여 제2항, 제3항의 경우를 예외로 하여 서비스 이용신청을
              승낙합니다.
            </li>
            <li>
              ② 사이트는 다음에 해당하는 경우에 그 신청에 대한 승낙 제한사유가 해소될 때까지 승낙을
              유보할 수 있습니다.
            </li>
            <li className="consent-indent">가. 서비스 관련 설비에 여유가 없는 경우</li>
            <li className="consent-indent">나. 기술상 지장이 있는 경우</li>
            <li className="consent-indent">다. 기타 사이트가 필요하다고 인정되는 경우</li>
            <li>③ 사이트는 신청자가 다음에 해당하는 경우에는 승낙을 거부할 수 있습니다.</li>
            <li className="consent-indent">가. 다른 개인(사이트)의 명의를 사용하여 신청한 경우</li>
            <li className="consent-indent">나. 이용자 정보를 허위로 기재하여 신청한 경우</li>
            <li className="consent-indent">
              다. 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우
            </li>
            <li className="consent-indent">
              라. 기타 사이트 소정의 이용신청요건을 충족하지 못하는 경우
            </li>
          </ul>
        </div>
        <div className="consent-h2">제 7 조 (이용자정보의 변경)</div>
        <div className="consent-h3">
          회원은 이용 신청시에 기재했던 회원정보가 변경되었을 경우에는, 온라인으로 수정하여야 하며
          변경하지 않음으로 인하여 발생되는 모든 문제의 책임은 회원에게 있습니다.
        </div>
        <div>...</div>
      </div>
    </div>
  );

  return (
    <MainCon>
      <Wave />
      <Sun>
        <img src={ImgSun} alt="" />
      </Sun>
      <Character>
        <img src={ImgCharacter} alt="" />
      </Character>
      {consentModal ? <Modal children={modalChildren} /> : null}
      <SignUpCon onSubmit={handleSubmit(SignUpSubmit)}>
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpInputCon>
          <span>이메일</span>
          <input
            type="text"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: { value: /\S+@\S+\.\S+/, message: "올바른 이메일 주소를 입력해주세요." },
            })}
          />
          {errors?.email ? <SignUpWarning>{errors.email.message}</SignUpWarning> : null}
        </SignUpInputCon>
        <SignUpInputCon>
          <span>닉네임</span>
          <input type="text" {...register("nickname", { required: "닉네임을 입력해주세요." })} />
          {errors?.nickname ? <SignUpWarning>{errors.nickname.message}</SignUpWarning> : null}
        </SignUpInputCon>
        <SignUpInputCon>
          <span>비밀번호</span>
          <SignUpInputPasswordCon>
            <input
              type={isHidePassword ? "password" : "text"}
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: { value: 8, message: "8자리 이상의 비밀번호를 사용해주세요." },
              })}
            ></input>
            {isHidePassword ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="passwordShow"
                onClick={() => setIsHidePassword(false)}
              >
                <path
                  d="M12 5C15.679 5 20.162 7.417 21.73 10.901C21.876 11.229 22 11.611 22 12C22 12.388 21.877 12.771 21.73 13.099C20.161 16.583 15.678 19 12 19C8.321 19 3.838 16.583 2.27 13.099C2.124 12.77 2 12.389 2 12C2 11.612 2.123 11.229 2.27 10.901C3.839 7.417 8.322 5 12 5ZM12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="passwordHide"
                onClick={() => setIsHidePassword(true)}
              >
                <path
                  d="M6.99951 6.362C8.51195 5.46328 10.2402 4.99251 11.9995 5C18.3065 5 21.3665 10.683 21.9095 11.808C21.9695 11.931 21.9695 12.069 21.9095 12.193C21.5575 12.921 20.1535 15.555 17.4995 17.324M13.9995 18.8C13.3413 18.9341 12.6712 19.0012 11.9995 19C5.69251 19 2.63251 13.317 2.08951 12.192C2.06017 12.1319 2.04492 12.0659 2.04492 11.999C2.04492 11.9321 2.06017 11.8661 2.08951 11.806C2.30851 11.354 2.92951 10.174 3.99951 8.921M9.99951 9.764C10.571 9.2531 11.3165 8.98037 12.0828 9.00182C12.8491 9.02326 13.5781 9.33725 14.1202 9.87932C14.6623 10.4214 14.9762 11.1504 14.9977 11.9167C15.0191 12.683 14.7464 13.4285 14.2355 14M2.99951 3L20.9995 21"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </SignUpInputPasswordCon>
          {errors?.password ? <SignUpWarning>{errors.password.message}</SignUpWarning> : null}
        </SignUpInputCon>
        <SignUpInputCon>
          <span>비밀번호 확인</span>
          <SignUpInputPasswordCon>
            <input
              type={isHidePasswordCheck ? "password" : "text"}
              {...register("passwordCheck", {
                required: "비밀번호를 확인해주세요.",
                validate: {
                  check: (val) => {
                    if (getValues("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            ></input>
            {isHidePasswordCheck ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="passwordShow"
                onClick={() => setIsHidePasswordCheck(false)}
              >
                <path
                  d="M12 5C15.679 5 20.162 7.417 21.73 10.901C21.876 11.229 22 11.611 22 12C22 12.388 21.877 12.771 21.73 13.099C20.161 16.583 15.678 19 12 19C8.321 19 3.838 16.583 2.27 13.099C2.124 12.77 2 12.389 2 12C2 11.612 2.123 11.229 2.27 10.901C3.839 7.417 8.322 5 12 5ZM12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="passwordHide"
                onClick={() => setIsHidePasswordCheck(true)}
              >
                <path
                  d="M6.99951 6.362C8.51195 5.46328 10.2402 4.99251 11.9995 5C18.3065 5 21.3665 10.683 21.9095 11.808C21.9695 11.931 21.9695 12.069 21.9095 12.193C21.5575 12.921 20.1535 15.555 17.4995 17.324M13.9995 18.8C13.3413 18.9341 12.6712 19.0012 11.9995 19C5.69251 19 2.63251 13.317 2.08951 12.192C2.06017 12.1319 2.04492 12.0659 2.04492 11.999C2.04492 11.9321 2.06017 11.8661 2.08951 11.806C2.30851 11.354 2.92951 10.174 3.99951 8.921M9.99951 9.764C10.571 9.2531 11.3165 8.98037 12.0828 9.00182C12.8491 9.02326 13.5781 9.33725 14.1202 9.87932C14.6623 10.4214 14.9762 11.1504 14.9977 11.9167C15.0191 12.683 14.7464 13.4285 14.2355 14M2.99951 3L20.9995 21"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </SignUpInputPasswordCon>
          {errors?.passwordCheck ? (
            <SignUpWarning>{errors.passwordCheck.message}</SignUpWarning>
          ) : null}
        </SignUpInputCon>
        <SignUpConsent>
          <input type="checkbox" id="check" onClick={() => setIsChecked(!isChecked)} />
          <label htmlFor="check"></label>
          <span onClick={() => setConsentModal(true)}>사이트 약관에 동의합니다.</span>
        </SignUpConsent>
        {isLoading ? <LoadingImg src={loading} /> : <SignUpBtn>회원가입</SignUpBtn>}
      </SignUpCon>
    </MainCon>
  );
};

export default SignUp;

const MainCon = styled.main`
  position: relative;
  min-height: calc(100vh - 120px);
`;

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

const Bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-30px);}
	60% {transform: translateY(-15px);}
`;

const Character = styled.div`
  position: absolute;
  top: 45%;
  left: 15%;
  z-index: -1;
  animation: ${Bounce} 2s infinite;
  > img {
    width: 15vw;
    min-width: 100px;
    max-width: 170px;
  }
`;

const SignUpCon = styled.form`
  min-height: calc(100vh - 120px);
  width: 550px;
  background-color: rgba(255, 255, 255, 0.8);
  margin-left: auto;
  margin-right: 227px;
  box-shadow: 0 4px 20px rgba(163, 163, 163, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  @media screen and (max-width: 1200px) {
    margin-right: 20px;
  }
`;

const SignUpTitle = styled.span`
  font-size: 30px;
  display: block;
  margin-bottom: 10px;
`;

const SignUpInputCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  gap: 10px;

  input {
    width: 400px;
    height: 39px;
    padding: 10px 13px;
    box-shadow: 0 0 0 1px #bebebe inset;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const SignUpWarning = styled.p`
  font-size: 12px;
  color: #e23636;
`;

const SignUpInputPasswordCon = styled.div`
  width: 400px;
  height: 39px;
  position: relative;

  input {
    width: 400px;
    padding: 10px 13px;
    box-shadow: 0 0 0 1px #bebebe inset;
    border-radius: 4px;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 12px;
  }

  .passwordShow {
    width: 24px;
    height: 24px;
    transform: translate(0%, -50%);
  }

  .passwordHide {
    width: 22px;
    height: 21px;
    transform: translate(-4%, -50%);
  }
`;

const SignUpConsent = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 3px;

  input {
    overflow: hidden;
    display: block;
    position: absolute;
    border: 0;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
  }

  label {
    width: 24px;
    height: 24px;
    text-decoration: underline;
    cursor: pointer;
    background: url(${Uncheck}) no-repeat left center / 20px;
  }

  input:checked + label {
    background-image: url(${Check});
  }

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LoadingImg = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 60px;
`;

const SignUpBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: #416dc9;
  border-radius: 4px;
  font-size: 20px;
  margin-top: 50px;
`;
