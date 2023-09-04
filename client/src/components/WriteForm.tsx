import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const WriteCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .writeBox {
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 2px 4px 6px rgba(167, 167, 167, 0.15);
    border-radius: 4px;
    width: 1200px;
    height: 750px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 모든 내용 가운데 정렬 */
    justify-content: center;
    .editor-container {
      width: 1100px; // 에디터 컨테이너 가로 폭 설정
    }
    .title_tag {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between; /* 좌우 균형 정렬 */
      width: 1100px;
      font-size: 24px;

      select {
        margin-left: 10px;
        border: 1px solid rgba(190, 190, 190, 1);
        background-color: rgba(255, 255, 255, 1);
        width: 200px;
        height: 30px;
        border-radius: 4px;
      }
    }
    .content {
      width: 1100px;
      font-size: 24px;
    }
    .titleInput,
    .contentInput {
      margin-top: 10px;
      border: 1px solid rgba(190, 190, 190, 1);
      background-color: rgba(255, 255, 255, 1);
      width: 1100px;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 30px;
    }

    .contentInput {
      height: 440px;
    }

    .button {
      margin-top: 20px;

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
  const editorRef = useRef<Editor | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  interface CityOptions {
    [region: string]: string[];
  }

  const options: CityOptions = {
    경기도: ["수원", "성남", "용인"],
    강원도: ["춘천", "원주", "강릉"],
    // 다른 지역도 추가할 수 있음
  };

  const [selectedRegion, setSelectedRegion] = useState<string>(""); // 선택된 지역
  const [selectedCity, setSelectedCity] = useState<string>(""); // 선택된 도시

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
      <form
        action=""
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          const content = editorRef.current?.getInstance().getHTML();
          data.content = content; // 에디터의 내용을 폼 데이터에 추가
          data.area1 = selectedRegion; // 선택된 지역을 폼 데이터에 추가
          data.area2 = selectedCity; // 선택된 도시를 폼 데이터에 추가
          alert(JSON.stringify(data));
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
              initialValue="hello react editor world!"
              previewStyle="vertical"
              height="440px"
              initialEditType="markdown"
              useCommandShortcut={true}
              usageStatistics={false}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  //   console.log(blob); // File {name: '카레유.png', ... }

                  // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
                  // const imgUrl = await .... 서버 전송 / 경로 수신 코드 ...
                  const formData = new FormData();
                  formData.append("image", blob, "image.png"); // 이미지 파일 이름은 임의로 지정할 수 있습니다.
                  console.log(formData);

                  // try {
                  //   const response = await axios.post("/upload", formData, {
                  //     headers: {
                  //       "Content-Type": "multipart/form-data",
                  //     },
                  //   });

                  //   if (response.status === 200) {
                  //     const imageUrl = response.data.imageUrl;

                  //     // 업로드된 이미지를 에디터에 표시합니다.
                  //     callback(imageUrl, "이미지 설명"); // 이미지 설명은 원하는대로 지정합니다.
                  //   } else {
                  //     console.error("이미지 업로드 실패");
                  //   }
                  // } catch (error) {
                  //   console.error("이미지 업로드 중 오류 발생:", error);
                  // }
                  // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
                  callback("http://localhost:3000/img/카레유.png", "카레유");
                },
              }}
            />
          </div>
          <div className="button">
            <button type="submit" disabled={isSubmitting}>
              등록
            </button>
            <button onClick={() => navigate(-1)}>취소</button>
          </div>
        </div>
      </form>
    </WriteCon>
  );
};

export default WriteForm;
