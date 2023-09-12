import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Wave from "../components/common/Wave";
import ImgSun from "../assets/images/img_sun.png";
import ImgCharacter from "../assets/images/character.png";
import loading from "../assets/images/loading.gif";

const SignUp = (): JSX.Element => {
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [isHidePasswordCheck, setIsHidePasswordCheck] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
    setIsLoading(true);
    axios
      .post(
        `http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/auth/signup`,
        {
          name: data.nickname,
          email: data.email,
          password: data.password,
        },
        { headers: { "Content-Type": "application/json" } },
      )
      .then(() => {
        window.alert("회원가입이 완료되었습니다. 로그인 해주세요.");
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.data.message === "Email already exists") {
          alert("이미 존재하는 이메일입니다.");
        } else if (err.response.data.message === "Name already exists") {
          alert("닉네임이 중복되었습니다. 다른 닉네임을 사용해주세요.");
        }
        setIsLoading(false);
      });
  }

  return (
    <MainCon>
      <Wave />
      <Sun>
        <img src={ImgSun} alt="" />
      </Sun>
      <Character>
        <img src={ImgCharacter} alt="" />
      </Character>
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
  margin-left: 55%;
  box-shadow: 0 4px 20px rgba(163, 163, 163, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-top: 60px;
`;
