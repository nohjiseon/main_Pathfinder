import { useState, useEffect } from "react";
// import Card from "../components/common/Card";
import Pagination from "../components/common/Pagenation";
import { usePagination } from "../hooks/usePagination";
import styled from "styled-components";
import questionMark from "../assets/images/character/question-mark.png";
import chrOn1 from "../assets/images/character/chr1-on.png";
import chrOn2 from "../assets/images/character/chr2-on.png";
import chrOn3 from "../assets/images/character/chr3-on.png";
import chrOn4 from "../assets/images/character/chr4-on.png";
import chrOn5 from "../assets/images/character/chr5-on.png";
import chrOn6 from "../assets/images/character/chr6-on.png";
import chrOn7 from "../assets/images/character/chr7-on.png";
import chrOn8 from "../assets/images/character/chr8-on.png";
import chrOn9 from "../assets/images/character/chr9-on.png";
import chrOn10 from "../assets/images/character/chr10-on.png";
import chrOff1 from "../assets/images/character/chr1-off.png";
import chrOff2 from "../assets/images/character/chr2-off.png";
import chrOff3 from "../assets/images/character/chr3-off.png";
import chrOff4 from "../assets/images/character/chr4-off.png";
import chrOff5 from "../assets/images/character/chr5-off.png";
import chrOff6 from "../assets/images/character/chr6-off.png";
import chrOff7 from "../assets/images/character/chr7-off.png";
import chrOff8 from "../assets/images/character/chr8-off.png";
import chrOff9 from "../assets/images/character/chr9-off.png";
import chrOff10 from "../assets/images/character/chr10-off.png";
import changeIcon from "../assets/images/change-icon.png";
import editWhite from "../assets/images/edit-white.png";
import lock from "../assets/images/lock.png";

const MyPage = (): JSX.Element => {
  const [curMenu, setCurMenu] = useState<string>("profile");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("닉네임");
  const [validNickname, setValidNickname] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [intro, setIntro] = useState<string>("안녕하세요, [닉네임]입니다.");
  const [photo, setPhoto] = useState<string>(questionMark);
  const [photoSrc, setPhotoSrc] = useState<string>(chrOn1);
  const [isPhotoEdit, setIsPhotoEdit] = useState<boolean>(false);
  const {
    currentPage,
    totalPages,
    setTotalPages,
    onPageChangeHandler,
    onPrevPageHandler,
    onNextPageHandler,
  } = usePagination();

  const blogNum = 365;

  useEffect(() => {
    setTotalPages(10); // 총 페이지 몇개인지 임의로 정한거라 수정 필요함
  }, []);

  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function handleEditBtnClick(): void {
    setPassword("");
    setIsEdit(true);
  }

  function handleNicknameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setNickname(e.target.value);
    setValidNickname(true);
  }

  function handleEditClick(): void {
    setValidNickname(true);

    if (nickname === "") {
      setValidNickname(false);
    } else {
      setIsEdit(false);
    }
  }

  function handleCancleClick(): void {
    setValidNickname(true);
    setNickname("닉네임");
    setPassword("");
    setIntro("안녕하세요, [닉네임]입니다.");
    setIsEdit(false);
  }

  function handlePhotoEditBtn(): void {
    setPhotoSrc(photo);
    setIsPhotoEdit(true);
  }

  function handlePhotoEdit(): void {
    setPhoto(photoSrc);
    setIsPhotoEdit(false);
  }

  function handlePhotoCancel(): void {
    setIsPhotoEdit(false);
  }

  return (
    <MyPageBg>
      <MyPageContainer>
        <MyPageTop>
          <MyPageImgContainer>
            {isPhotoEdit ? <MyPageProfileImg src={photoSrc} /> : <MyPageProfileImg src={photo} />}
          </MyPageImgContainer>
          <MyPageIdContainer>
            <MyPageId>[닉네임]</MyPageId>
            <MyPageEmail>[이메일]</MyPageEmail>
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
              <div>
                <MyPageProfileNicknameInfo>
                  <MyPageNicknameContainer>
                    <div>닉네임</div>
                    {!isEdit ? (
                      <div>{nickname}</div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          value={nickname}
                          onChange={(e) => handleNicknameChange(e)}
                        ></input>
                      </div>
                    )}
                  </MyPageNicknameContainer>
                  {!validNickname ? <MyPageWarning>닉네임을 입력해주세요.</MyPageWarning> : null}
                </MyPageProfileNicknameInfo>
                <MyPageProfileInfo>
                  <div>이메일</div>
                  <div>example@gmail.com</div>
                </MyPageProfileInfo>
                <MyPageProfileInfo>
                  <div>비밀번호</div>
                  {!isEdit ? (
                    <img src={lock} />
                  ) : (
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  )}
                </MyPageProfileInfo>
                <MyPageProfileIntro>
                  <div>자기소개</div>
                  {!isEdit ? (
                    <div>{intro}</div>
                  ) : (
                    <textarea value={intro} onChange={(e) => setIntro(e.target.value)}></textarea>
                  )}
                </MyPageProfileIntro>
              </div>
              {isEdit ? (
                <MyPageEditBtnContainer>
                  <MyPageEditBtn onClick={handleEditClick}>수정</MyPageEditBtn>
                  <MyPageCancelBtn onClick={handleCancleClick}>취소</MyPageCancelBtn>
                </MyPageEditBtnContainer>
              ) : null}
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
                {blogNum >= 1 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn1)}>
                    <CharacterSquare src={chrOn1} />
                    <div>그냥 꽁치</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff1} />
                  </MyPageCharacter>
                )}
                {blogNum >= 3 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn2)}>
                    <CharacterSquare src={chrOn2} />
                    <div>횟집사장 참치</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff2} />
                  </MyPageCharacter>
                )}
                {blogNum >= 5 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn3)}>
                    <CharacterSquare src={chrOn3} />
                    <div>디자이너 흰동가리</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff3} />
                  </MyPageCharacter>
                )}
                {blogNum >= 10 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn4)}>
                    <CharacterSquare src={chrOn4} />
                    <div>자원봉사자 개복치</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff4} />
                  </MyPageCharacter>
                )}
                {blogNum >= 20 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn5)}>
                    <CharacterSquare src={chrOn5} />
                    <div>음악가 고래</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff5} />
                  </MyPageCharacter>
                )}
                {blogNum >= 30 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn6)}>
                    <CharacterSquare src={chrOn6} />
                    <div>미용사 소라게</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff6} />
                  </MyPageCharacter>
                )}
                {blogNum >= 50 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn7)}>
                    <CharacterSquare src={chrOn7} />
                    <div>골목대장 범고래</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff7} />
                  </MyPageCharacter>
                )}
                {blogNum >= 100 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn8)}>
                    <CharacterSquare src={chrOn8} />
                    <div>탐험가 펭귄</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff8} />
                  </MyPageCharacter>
                )}
                {blogNum >= 200 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn9)}>
                    <CharacterSquare src={chrOn9} />
                    <div>백수 물범</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff9} />
                  </MyPageCharacter>
                )}
                {blogNum >= 365 ? (
                  <MyPageCharacter onClick={() => setPhotoSrc(chrOn10)}>
                    <CharacterSquare src={chrOn10} />
                    <div>수영강사 해달</div>
                  </MyPageCharacter>
                ) : (
                  <MyPageCharacter>
                    <CharacterSquare src={chrOff10} />
                  </MyPageCharacter>
                )}
              </MyPageCharacterContainer>
              {isPhotoEdit ? (
                <MyPageEditBtnContainer>
                  <MyPageEditBtn onClick={handlePhotoEdit}>변경하기</MyPageEditBtn>
                  <MyPageCancelBtn onClick={handlePhotoCancel}>취소</MyPageCancelBtn>
                </MyPageEditBtnContainer>
              ) : null}
            </MyPageContent>
          ) : (
            <MyPageContent>
              <MyPageContentTitle>내가 쓴 글</MyPageContentTitle>
              <MyPageBlogList>
                {/* {data.map(() => (
                  <Card></Card>
                ))} */}
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
          )}
        </MyPageBottom>
      </MyPageContainer>
    </MyPageBg>
  );
};

export default MyPage;

const MyPageBg = styled.main`
  min-height: calc(100vh - 120px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  margin-top: -70px;
  padding-top: 120px;
`;

const MyPageContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  min-height: 500px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin: 40px 0 70px 0;
`;

const MyPageMenu = styled.div`
  padding: 30px 80px 0 80px;
  margin: 0 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
`;

const MyPageMenuBtn = styled.div`
  padding-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
`;

const MyPageMenuBtnFocus = styled(MyPageMenuBtn)`
  border-bottom: 3px solid #416dc9;
`;

const MyPageContent = styled.div`
  margin: 40px 40px;
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

const MyPageProfileEdit = styled.div`
  padding: 5px 20px;
  border-radius: 4px;
  background-color: #ffc03f;
  color: #ffffff;
  font-size: 15px;
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
  border-bottom: 1px solid #cfcfcf;

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
  border-bottom: 1px solid #cfcfcf;
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

const MyPageProfileIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  padding: 0 20px 20px 20px;
  gap: 20px;

  div:first-child {
    font-size: 20px;
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

const MyPageCancelBtn = styled(MyPageEditBtn)`
  color: #444444;
  background-color: #ffffff;
  box-shadow: 0 0 0 1px #bebebe inset;
`;

const MyPageCharacterContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
`;

const MyPageCharacter = styled.div`
  min-width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;

  &:hover {
    background-color: #f3f3f3;
    border-radius: 4px;
  }

  div {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const CharacterSquare = styled.img`
  width: 130px;
  height: 130px;
`;

const MyPageBlogList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 30px;
  gap: 20px 0;
`;

const MyPagePaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
