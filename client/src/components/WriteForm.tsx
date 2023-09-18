import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { getAccessToken, getUserId } from "../util/auth";
import { diaryDetailState } from "../atoms/atoms";
import SubWave from "./common/SubWave";
import Arrow from "../assets/images/select_arrow.png";

const WriteCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > form {
    display: block;
    max-width: 1200px;
    width: 100%;
  }

  .writeBox {
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid #eaeaea;
    box-shadow: 2px 4px 6px rgba(185, 185, 185, 0.25);
    border-radius: 4px;
    padding: 40px;
    margin-top: 40px;

    .editor-container {
      width: 100%; // 에디터 컨테이너 가로 폭 설정
      .ProseMirror {
        font-size: 16px;
      }
      .toastui-editor-contents p {
        font-size: 16px;
      }
    }
    .title_tag {
      display: flex;
      align-items: center;
      justify-content: space-between; /* 좌우 균형 정렬 */
      font-size: 24px;

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url(${Arrow}) no-repeat right center / 30px transparent;
        width: 200px;
        height: 40px;
        border-radius: 4px;
        padding-left: 16px;
        margin-left: 10px;
        cursor: pointer;
        border: 1px solid #dadde6;
      }
      select::-ms-expand {
        display: none;
      }
    }
    .content {
      display: block;
      font-size: 24px;
      padding-bottom: 12px;
    }
    .titleInput,
    .contentInput {
      margin-top: 10px;
      border: 1px solid #dadde6;
      width: 100%;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 30px;
    }

    .contentInput {
      height: 440px;
    }

    .button {
      text-align: center;
      margin-top: 30px;

      button {
        width: 130px;
        font-size: 20px;
        background-color: rgba(26, 41, 142, 1);
        margin-right: 10px;
        padding: 8px 20px;
        border: 1px solid rgba(190, 190, 190, 1);
        border-radius: 4px;
        cursor: pointer;

        &:last-child {
          background-color: rgba(255, 255, 255, 1);
          color: rgba(0, 0, 0, 1);
          margin-right: 0;
        }
      }
    }
  }
`;

const WriteForm = () => {
  const { id } = useParams();
  let oldData = useRecoilValue(diaryDetailState);
  const editorRef = useRef<Editor | null>(null);
  if (!id) {
    oldData = {
      data: {
        diaryId: 0,
        createdAt: "",
        modifiedAt: "",
        email: "",
        area1: "",
        area2: "",
        name: "",
        title: "",
        content: "",
        recommendedCount: 0,
        views: 0,
        scrap: false,
        scrapCount: 0,
        recommend: false,
      },
    };
  } else {
  }
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: oldData.data.title,
      content: oldData.data.content,
      area1: oldData.data.area1,
      area2: oldData.data.area2,
      memberId: 0,
    },
  });
  interface CityOptions {
    [region: string]: string[];
  }
  type Headers = Record<string, string>;
  const headers: Headers = {};
  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const options: CityOptions = {
    경기도: [
      "서울",
      "인천",
      "고양",
      "수원",
      "용인",
      "과천",
      "광명",
      "광주",
      "구리",
      "군포",
      "김포",
      "남양주",
      "동두천",
      "부천",
      "성남",
      "시흥",
      "안산",
      "안성",
      "안양",
      "양주",
      "여주",
      "오산",
      "의왕",
      "의정부",
      "이천",
      "파주",
      "평택",
      "포천",
      "하남",
      "화성",
      "가평",
      "양평",
      "연천",
    ].sort(),
    강원도: [
      "강릉",
      "동해",
      "삼척",
      "속초",
      "원주",
      "춘천",
      "태백",
      "고성",
      "양구",
      "양양",
      "영월",
      "인제",
      "정선",
      "철원",
      "평창",
      "홍천",
      "화천",
      "횡성",
    ].sort(),
    충청도: [
      "대전",
      "세종",
      "제철",
      "청주",
      "충주",
      "괴산",
      "단양",
      "보은",
      "영동",
      "옥천",
      "음성",
      "증평",
      "진천",
      "계룡",
      "공주",
      "논산",
      "당진",
      "보령",
      "서산",
      "아산",
      "천안",
      "금산",
      "부여",
      "서천",
      "예산",
      "청양",
      "태안",
      "홍성",
    ].sort(),
    경상도: [
      "부산",
      "대구",
      "울산",
      "경산",
      "경주",
      "구미",
      "김천",
      "문경",
      "상주",
      "안동",
      "영주",
      "영천",
      "포항",
      "고령",
      "봉화",
      "성주",
      "영덕",
      "영양",
      "예천",
      "울릉",
      "울진",
      "의성",
      "청도",
      "청송",
      "칠곡",
      "창원",
      "거제",
      "김해",
      "밀양",
      "사천",
      "양산",
      "진주",
      "통영",
      "거창",
      "고성",
      "남해",
      "산청",
      "의령",
      "창녕",
      "하동",
      "함안",
      "함양",
      "합천",
    ].sort(),
    전라도: [
      "광주",
      "군산",
      "김제",
      "남원",
      "익산",
      "전주",
      "정읍",
      "고창",
      "무주",
      "부안",
      "순창",
      "완주",
      "임실",
      "장수",
      "진안",
      "목포",
      "여수",
      "순천",
      "나주",
      "광양",
      "담양",
      "곡성",
      "구례",
      "고흥",
      "보성",
      "화순",
      "장흥",
      "강진",
      "해남",
      "영암",
      "무안",
      "함평",
      "영광",
      "장성",
      "완도",
      "진도",
      "신안",
    ].sort(),
    제주도: ["제주", "서귀포"].sort(),
  };

  const [selectedRegion, setSelectedRegion] = useState<string>(oldData.data.area1); // 선택된 지역
  const [selectedCity, setSelectedCity] = useState<string>(oldData.data.area2); // 선택된 도시

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = event.target.value;
    setSelectedRegion(newRegion);
    setSelectedCity(""); // 새로운 지역 선택 시 도시 선택 초기화
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <WriteCon>
      <SubWave />
      <form
        action=""
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          const content = editorRef.current?.getInstance().getHTML();
          data.content = content || ""; // 에디터의 내용을 폼 데이터에 추가
          data.area1 = selectedRegion; // 선택된 지역을 폼 데이터에 추가
          data.area2 = selectedCity; // 선택된 도시를 폼 데이터에 추가
          data.memberId = getUserId() || 0;
          try {
            if (data.title === "") {
              return alert("제목을 입력해주세요");
            }
            const clean_text = content?.replace(/<.*?>/g, "");
            if (clean_text === "") {
              return alert("내용을 입력해주세요");
            }
            if (selectedRegion === "" || selectedCity === "") {
              return alert("지역,도시 선택은 필수입니다!");
            }
            const response = !!id
              ? await axios.patch(`/diary/edit/${id}`, data, { headers })
              : await axios.post("/diary/registration", data);

            if (response.status === 201 || 200) {
            } else {
              console.error(`${response.status} 실패`);
            }
            navigate(-1);
          } catch (error) {
            alert("권한이 없습니다!");
          }
        })}
      >
        <div className="writeBox">
          <div className="title_tag">
            <label htmlFor="title" className="title">
              제목
            </label>{" "}
            <div>
              <select value={selectedRegion} onChange={handleRegionChange}>
                <option value="">지역 선택</option>
                {Object.keys(options).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {
                <select value={selectedCity} onChange={handleCityChange}>
                  <option value="">도시 선택</option>
                  {options[selectedRegion] &&
                    options[selectedRegion].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              }
            </div>
          </div>
          <input id="title" type="text" className="titleInput" {...register("title")} />
          <label className="content">본문</label>
          <div className="editor-container">
            <Editor
              ref={editorRef}
              initialValue={id ? oldData.data.content : "내용을 입력해주세요"}
              previewStyle="vertical"
              height="440px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              usageStatistics={false}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const formData = new FormData();
                  formData.append("image", blob, "image.png"); // 이미지 파일 이름은 임의로 지정할 수 있습니다.

                  try {
                    const response = await axios.post("/image", formData);
                    if (response.status === 200) {
                      const imageUrl = response.data;

                      // 업로드된 이미지를 에디터에 표시합니다.
                      callback(imageUrl, "이미지 설명"); // 이미지 설명은 원하는대로 지정합니다.
                    } else {
                      console.error("이미지 업로드 실패");
                    }
                  } catch (error) {
                    console.error("이미지 업로드 중 오류 발생:", error);
                  }
                },
              }}
            />
          </div>
          <div className="button">
            <button type="submit" disabled={isSubmitting}>
              {!id ? "등록" : "수정"}
            </button>
            <button type="button" onClick={() => navigate(-1)}>
              취소
            </button>
          </div>
        </div>
      </form>
    </WriteCon>
  );
};

export default WriteForm;
