import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Cookies } from "react-cookie";
import Card from "../components/common/Card";
import Pagination from "../components/common/Pagenation";
import { usePagination } from "../hooks/usePagination";
import styled from "styled-components";
import loading from "../assets/images/loading.gif";
import changeIcon from "../assets/images/change-icon.png";
import editWhite from "../assets/images/edit-white.png";
import lock from "../assets/images/lock.png";
import { diaryMyListState } from "../atoms/atoms";
import { Diary, DiaryData } from "../types/types";
import { useFetch } from "../hooks/useFetch";
import Scrap from "../components/Scrap";

const MyPage = (): JSX.Element => {
  const [curMenu, setCurMenu] = useState<string>("profile");
  const [email, setEmail] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [intro, setIntro] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [photoSrc, setPhotoSrc] = useState<string>("");
  const [photoNum, setPhotoNum] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  interface Reward {
    rewardId: string;
    name: string;
    requirement: string;
    imageUrl: string;
    unlocked: boolean;
  }
  const [photoList, setPhotoList] = useState<Reward[]>([]);

  const [isPhotoEdit, setIsPhotoEdit] = useState<boolean>(false);
  const memberId = localStorage.getItem("memberId");

  const {
    currentPage,
    totalPages,
    setTotalPages,
    onPageChangeHandler,
    onPrevPageHandler,
    onNextPageHandler,
  } = usePagination();

  const url = `/diary/member/${memberId}?page=${currentPage}`;
  const { fetchData, data } = useFetch<Diary>(diaryMyListState, url);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때와 fetchData 호출
    setTotalPages(data.pageInfo.totalPages);
    fetchData();
  }, [currentPage]); // currentPage가 변경될 때 fetchData 호출

  interface Form {
    nickname: string;
    password: string;
    intro: string;
  }
  interface setForm {
    name?: string;
    password?: string;
    introduce?: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    mode: "onChange",
    defaultValues: { nickname: nickname, password: "", intro: intro },
  });

  function handleEditBtnClick(): void {
    setIsEdit(true);
  }

  function handleEditClick(data: Form): void {
    setIsLoading(true);
    const requestData: setForm = {};
    if (data.nickname) {
      requestData.name = data.nickname;
    }
    if (data.password) {
      requestData.password = data.password;
    }
    if (data.intro) {
      requestData.introduce = data.intro;
    }
    axios
      .patch(
        `http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/member/mypage/${memberId}`,
        {
          ...requestData,
        },
        { headers: { "Content-Type": "application/json" } },
      )
      .then(() => {
        setNickname(data.nickname);
        setIntro(data.intro);
        setIsEdit(false);
        reset({
          nickname: nickname,
          password: "",
          intro: intro,
        });
      });
    setIsLoading(false);
  }

  function handleCancleClick(): void {
    reset({
      nickname: nickname,
      password: "",
      intro: intro,
    });
    setIsEdit(false);
  }

  function handlePhotoChange(photoEl: Reward): void {
    setPhotoSrc(photoEl.imageUrl);
    setPhotoNum(photoEl.rewardId);
  }

  function handlePhotoEditBtn(): void {
    setPhotoSrc(photo);
    setPhotoNum("");
    setIsPhotoEdit(true);
  }

  function handlePhotoEdit(): void {
    axios
      .patch(
        `http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/member/reward/${memberId}/${photoNum}`,
      )
      .then(() => {
        setPhoto(photoSrc);
        setIsPhotoEdit(false);
        location.reload();
      })
      .catch((err) => {
        if (err.response.status) {
          alert("아직 오픈되지 않은 캐릭터입니다.");
        } else {
        }
      });
  }

  function handlePhotoCancel(): void {
    setIsPhotoEdit(false);
  }

  useEffect(() => {
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
        setEmail(res.data.data.email);
        setIntro(res.data.data.introduce);
        setPhoto(res.data.data.profileImageUrl);
        reset({
          nickname: nickname,
          password: "",
          intro: intro,
        });
      });
  }, [nickname, intro]);

  useEffect(() => {
    axios
      .get(
        `http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/member/reward/${memberId}`,
        {
          headers: {
            "Content-Type": `application/json`,
          },
        },
      )
      .then((res) => {
        setPhotoList(res.data.data);
      });
  }, []);

  function handleAccountDelete(): void {
    if (window.confirm("모든 회원 정보를 삭제 하시겠습니까?")) {
      axios
        .delete(
          `http://ec2-43-202-120-133.ap-northeast-2.compute.amazonaws.com:8080/member/mypage/${memberId}`,
        )
        .then(() => {
          cookies.remove("is_login");
          localStorage.removeItem("token");
          localStorage.removeItem("memberId");
          alert("회원 탈퇴가 완료되었습니다.");
          navigate("/");
        })
        .catch(() => {
          alert("회원 탈퇴에 실패하였습니다. 잠시 후에 다시 시도해주세요.");
        });
    }
  }

  useEffect(() => {
    if (curMenu !== "profile") {
      handleCancleClick();
    }

    if (curMenu !== "character") {
      handlePhotoCancel();
    }
  }, [curMenu]);

  return (
    <>
      {isLoading ? (
        <MyPageLoading>
          <img src={loading} />
        </MyPageLoading>
      ) : null}
      <MyPageBg>
        <MyPageContainer>
          <MyPageTop>
            <MyPageImgContainer>
              {isPhotoEdit ? <MyPageProfileImg src={photoSrc} /> : <MyPageProfileImg src={photo} />}
            </MyPageImgContainer>
            <MyPageIdContainer>
              <MyPageId>{nickname}</MyPageId>
              <MyPageEmail>{email}</MyPageEmail>
            </MyPageIdContainer>
          </MyPageTop>
          <MyPageBottom>
            <MyPageMenu>
              {curMenu === "profile" ? (
                <MyPageMenuBtnFocus>프로필</MyPageMenuBtnFocus>
              ) : (
                <MyPageMenuBtn onClick={() => setCurMenu("profile")}>프로필</MyPageMenuBtn>
              )}
              {curMenu === "character" ? (
                <MyPageMenuBtnFocus>내 캐릭터</MyPageMenuBtnFocus>
              ) : (
                <MyPageMenuBtn onClick={() => setCurMenu("character")}>내 캐릭터</MyPageMenuBtn>
              )}
              {curMenu === "blog" ? (
                <MyPageMenuBtnFocus>내가 쓴 글</MyPageMenuBtnFocus>
              ) : (
                <MyPageMenuBtn onClick={() => setCurMenu("blog")}>내가 쓴 글</MyPageMenuBtn>
              )}
              {curMenu === "scrap" ? (
                <MyPageMenuBtnFocus>스크랩</MyPageMenuBtnFocus>
              ) : (
                <MyPageMenuBtn onClick={() => setCurMenu("scrap")}>스크랩</MyPageMenuBtn>
              )}
              {curMenu === "delete" ? (
                <MyPageMenuBtnFocus>회원 탈퇴</MyPageMenuBtnFocus>
              ) : (
                <MyPageMenuBtn onClick={() => setCurMenu("delete")}>회원 탈퇴</MyPageMenuBtn>
              )}
            </MyPageMenu>
            {curMenu === "profile" ? (
              <MyPageContent>
                <MyPageContentTitleContainer>
                  <MyPageContentTitle>내 프로필</MyPageContentTitle>
                  {!isEdit ? (
                    <MyPageProfileEdit onClick={handleEditBtnClick}>
                      <img src={editWhite} />
                      <div>프로필 정보 수정하기</div>
                    </MyPageProfileEdit>
                  ) : null}
                </MyPageContentTitleContainer>
                <form onSubmit={handleSubmit(handleEditClick)}>
                  <MyPageProfileNicknameInfo>
                    <MyPageNicknameContainer>
                      <div>닉네임</div>
                      {!isEdit ? (
                        <div>{nickname}</div>
                      ) : (
                        <div>
                          <input
                            type="text"
                            {...register("nickname", { required: "닉네임을 입력해주세요." })}
                          ></input>
                        </div>
                      )}
                    </MyPageNicknameContainer>
                    {errors?.nickname ? (
                      <MyPageWarning>{errors.nickname.message}</MyPageWarning>
                    ) : null}
                  </MyPageProfileNicknameInfo>
                  <MyPageProfileInfo>
                    <div>이메일</div>
                    <div>{email}</div>
                  </MyPageProfileInfo>
                  <MyPageProfileInfo>
                    <div>비밀번호</div>
                    {!isEdit ? (
                      <img src={lock} />
                    ) : (
                      <MyPagePasswordFlexBox>
                        <MyPageInputPasswordCon>
                          <input
                            type={isHidePassword ? "password" : "text"}
                            {...register("password", {
                              minLength: {
                                value: 8,
                                message: "8자리 이상의 비밀번호를 사용해주세요.",
                              },
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
                        </MyPageInputPasswordCon>
                        {errors?.password ? (
                          <MyPageWarning>{errors.password.message}</MyPageWarning>
                        ) : null}
                      </MyPagePasswordFlexBox>
                    )}
                  </MyPageProfileInfo>
                  <MyPageProfileIntro>
                    <div>자기소개</div>
                    {!isEdit ? (
                      <div>{intro}</div>
                    ) : (
                      <textarea
                        {...register("intro", { required: "자기소개를 입력해주세요." })}
                      ></textarea>
                    )}
                    {errors?.intro ? <MyPageWarning>{errors.intro.message}</MyPageWarning> : null}
                  </MyPageProfileIntro>
                  {isEdit ? (
                    <MyPageEditBtnContainer>
                      <MyPageEditBtn>수정</MyPageEditBtn>
                      <MyPageCancelBtn onClick={handleCancleClick}>취소</MyPageCancelBtn>
                    </MyPageEditBtnContainer>
                  ) : null}
                </form>
              </MyPageContent>
            ) : curMenu === "character" ? (
              <MyPageContent>
                <MyPageContentTitleContainer>
                  <MyPageContentTitle>내 캐릭터</MyPageContentTitle>
                  {!isPhotoEdit ? (
                    <MyPageProfileEdit onClick={handlePhotoEditBtn}>
                      <img src={changeIcon} />
                      <div>캐릭터 변경하기</div>
                    </MyPageProfileEdit>
                  ) : null}
                </MyPageContentTitleContainer>
                <MyPageCharacterContainer>
                  {photoList.map((el) => {
                    return (
                      <MyPageCharacter
                        key={el.requirement}
                        className={isPhotoEdit ? "focus" : ""}
                        onClick={() => handlePhotoChange(el)}
                      >
                        <CharacterSquare src={el.imageUrl} key={el.requirement} />
                        {el.unlocked ? <div>{el.name}</div> : null}
                      </MyPageCharacter>
                    );
                  })}
                </MyPageCharacterContainer>
                {isPhotoEdit ? (
                  <MyPageEditBtnContainer>
                    <MyPageEditBtn onClick={handlePhotoEdit}>변경하기</MyPageEditBtn>
                    <MyPageCancelBtn onClick={handlePhotoCancel}>취소</MyPageCancelBtn>
                  </MyPageEditBtnContainer>
                ) : null}
              </MyPageContent>
            ) : curMenu === "blog" ? (
              <MyPageContent>
                <MyPageContentTitle>내가 쓴 글</MyPageContentTitle>
                <MyPageBlogList>
                  {data.data.length !== 0 ? (
                    data.data.map((el: DiaryData) => <Card key={el.diaryId} diaryData={el}></Card>)
                  ) : (
                    <div className="MyPageEmpty">작성한 글이 없습니다.</div>
                  )}
                </MyPageBlogList>
                <MyPagePaginationContainer>
                  <Pagination
                    currentPage={currentPage}
                    onPrevPage={onPrevPageHandler}
                    totalPages={totalPages}
                    onPageChange={onPageChangeHandler}
                    onNextPage={onNextPageHandler}
                  />
                </MyPagePaginationContainer>
              </MyPageContent>
            ) : curMenu === "scrap" ? (
              <MyPageContent>
                <MyPageContentTitle>스크랩</MyPageContentTitle>
                <Scrap></Scrap>
              </MyPageContent>
            ) : (
              <MyPageContent>
                <MyPageContentTitle>회원 탈퇴</MyPageContentTitle>
                <MyPageAccountDeleteCon>
                  <button onClick={handleAccountDelete}>회원 탈퇴하기</button>
                </MyPageAccountDeleteCon>
                <MyPageAccountDeleteWarning>
                  * 회원 탈퇴 시, 모든 회원 정보는 서버로부터 삭제됩니다. 해당 작업은 되돌릴 수
                  없으니 주의해주세요.
                </MyPageAccountDeleteWarning>
              </MyPageContent>
            )}
          </MyPageBottom>
        </MyPageContainer>
      </MyPageBg>
    </>
  );
};

export default MyPage;

const MyPageBg = styled.main`
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  background-color: #f3f3f3;
  margin-top: -70px;
  padding: 120px 20px 0;
`;

const MyPageContainer = styled.div`
  width: 1200px;
`;

const MyPageTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 50px 30px 50px;
  border-bottom: 1px solid #e7e7e7;
`;

const MyPageImgContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPageProfileImg = styled.img`
  width: 60px;
  height: 60px;
`;

const MyPageIdContainer = styled.div`
  margin-left: 20px;
`;

const MyPageId = styled.div`
  font-size: 30px;
`;

const MyPageEmail = styled.div`
  color: #646464;
  font-size: 20px;
`;

const MyPageBottom = styled.div`
  width: 100%;
  min-height: 520px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 2px 4px 6px rgba(185, 185, 185, 0.25);
  margin: 40px 0 70px 0;
`;

const MyPageMenu = styled.div`
  padding: 30px 80px 0 80px;
  margin: 0 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
`;

const MyPageMenuBtn = styled.button`
  padding-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
  color: #444;
`;

const MyPageMenuBtnFocus = styled(MyPageMenuBtn)`
  border-bottom: 3px solid #416dc9;
  cursor: pointer;
`;

const MyPageContent = styled.div`
  padding: 40px;
`;

const MyPageContentTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const MyPageContentTitle = styled.div`
  font-size: 26px;
  font-weight: 500;
`;

const MyPageProfileEdit = styled.button`
  padding: 0 12px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #ffc03f;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  img {
    width: 16px;
    height: 16px;
  }
`;

const MyPageProfileInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid #e7e7e7;

  div:first-child {
    font-size: 20px;
  }

  div:nth-child(2) {
    font-size: 16px;
  }

  input {
    width: 240px;
    border: 1px solid #bebebe;
    border-radius: 4px;
    margin: 0;
    padding: 8px;
    text-align: end;
  }
`;

const MyPageProfileNicknameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 30px;
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid #e7e7e7;
`;

const MyPageNicknameContainer = styled(MyPageProfileInfo)`
  border-bottom: none;
  padding: 0;
  margin: 0;
`;

const MyPageWarning = styled.span`
  display: block;
  color: #e23636;
  font-size: 14px;
  margin-top: 7px;
`;

const MyPagePasswordFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MyPageInputPasswordCon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  input {
    width: 240px;
    border: 1px solid #bebebe;
    border-radius: 4px;
    margin: 0;
    padding: 8px;
    text-align: end;
    box-sizing: border-box;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 12px;
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

const MyPageProfileIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  padding: 0 20px 20px 20px;

  div:first-child {
    font-size: 20px;
    margin-bottom: 20px;
  }

  div:nth-child(2) {
    font-size: 16px;
  }

  textarea {
    width: 100%;
    height: 80px;
    border: 1px solid #bebebe;
    border-radius: 4px;
    margin: 0;
    padding: 15px 20px;
    text-align: start;
    resize: vertical;
  }
`;

const MyPageEditBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  margin-top: 30px;
`;

const MyPageEditBtn = styled.button`
  font-size: 20px;
  background-color: #ffc03f;
  border-radius: 4px;
  padding: 10px 35px;
`;

const MyPageCancelBtn = styled.button`
  font-size: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 10px 35px;
  box-shadow: 0 0 0 1px #bebebe inset;
  color: #444;
`;

const MyPageCharacterContainer = styled.div`
  width: 100%;
  margin-top: -10px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;

  .focus:hover {
    background-color: #f3f3f3;
    border-radius: 4px;
  }
`;

const MyPageCharacter = styled.div`
  min-width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
`;

const CharacterSquare = styled.img`
  width: 120px;
  height: 120px;
`;

const MyPageBlogList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 30px;
  gap: 12px 16px;

  .MyPageEmpty {
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
  }
`;

const MyPagePaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const MyPageAccountDeleteCon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;

  button {
    background-color: #e23636;
    padding: 15px 25px;
    border-radius: 6px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const MyPageAccountDeleteWarning = styled.span`
  font-size: 14px;
`;

const MyPageLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }
`;
