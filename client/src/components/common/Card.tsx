import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { DiaryData } from "../../types/types";
import { getFormattedDate } from "../../util/date";

const CardBox = styled.li`
  .cardContent {
    display: flex;
    flex-direction: row;
    width: 550px;
    height: 125px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 0.5px solid rgba(243, 243, 243, 1);
    border-radius: 4px;
    margin: 0 5px;
    padding: 15px 21px 10px 21px;
    align-items: center;
    justify-content: space-between;
    box-shadow: 2px 4px 4px rgba(185, 185, 185, 0.25);
  }
  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 156px;
    height: 95px;
    overflow: hidden;
    margin: 21px 15px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 3px; /* 여백 설정 */
  }
  .information {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Card = ({ diaryData }: { diaryData: DiaryData }): JSX.Element => {
  const resultContent = diaryData.content.replace(/<img\b[^>]*>/gi, "");
  const imgRegex = /<img *?src=["'](.*?)["'].*?>/g;
  const matches = diaryData.content.match(imgRegex);
  let firstThumbnail = null;
  if (matches && matches.length > 0) {
    const firstMatch = matches[0];
    const srcMatch = firstMatch.match(/src=["'](.*?)["']/);
    if (srcMatch) {
      firstThumbnail = srcMatch[1];
    }
  }
  return (
    <CardBox>
      <li>
        <Link to={`/${diaryData.diaryId}`}>
          <div className="cardContent">
            <div className="img-container">
              <img className="image" src={firstThumbnail ? firstThumbnail : ""} alt="" />
            </div>
            <div className="content">
              <h2>{diaryData.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: resultContent }}></div>
              <div className="information">
                <div>{diaryData.name}</div>
                <div>{diaryData.recommendedCount}</div>
                <div>{diaryData.views}</div>
                <div>{getFormattedDate(diaryData.modifiedAt)}</div>
              </div>
            </div>
          </div>
        </Link>
      </li>
    </CardBox>
  );
};

export default Card;
