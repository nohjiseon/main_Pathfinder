import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { DiaryData } from "../../types/types";
import { getFormattedDate } from "../../util/date";
import empty from "../../assets/images/img_empty.png";
import Thumbup from "../../assets/images/thumb-up-icon.png";
import Eye from "../../assets/images/eye-icon.png";

const CardBox = styled.li`
  width: calc(50% - 8px);

  .cardContent {
    display: flex;
    background-color: rgba(255, 255, 255, 0.9);
    border: 0.5px solid rgba(243, 243, 243, 1);
    border-radius: 4px;
    padding: 10px 14px;
    align-items: center;
    box-shadow: 2px 4px 4px rgba(185, 185, 185, 0.25);
  }
  .img-container {
    display: flex;
    width: 120px;
    height: 95px;
    overflow: hidden;
    background: url(${empty}) no-repeat center / 55px #d9d9d9;
    border-radius: 4px;
  }
  .image {
    object-fit: cover;
    min-width: 100%;
  }
  .content {
    padding-left: 20px;
    width: calc(100% - 120px);
    strong {
      display: block;
      font-size: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .txt-box {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
      margin: 8px 0 10px;
      font-size: 14px;
      min-height: 40px;
    }
  }
  .information {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 300;
    .count,
    .view {
      padding-left: 16px;
      background: no-repeat left center / 13px;
    }
    .count {
      background-image: url(${Thumbup});
    }
    .view {
      background-image: url(${Eye});
    }
    > div span ~ span {
      margin-left: 10px;
    }
  }
  @media screen and (max-width: 820px) {
    .information {
      font-size: 11px;
      > div span ~ span {
        margin-left: 5px;
      }
      .count,
      .view {
        background-size: 12px;
        padding-left: 13px;
      }
    }
  }
`;

const Card = ({ diaryData }: { diaryData: DiaryData }): JSX.Element => {
  const resultContent = diaryData.content.replace(/<img\b[^>]*>/gi, "");
  const imgRegex = /<img *?src=["'](.*?)["'].*?>/g;
  const matches = diaryData.content.match(imgRegex);
  let firstThumbnail = "";
  if (matches && matches.length > 0) {
    const firstMatch = matches[0];
    const srcMatch = firstMatch.match(/src=["'](.*?)["']/);
    if (srcMatch) {
      firstThumbnail = srcMatch[1];
    }
  }
  return (
    <CardBox>
      <Link to={`/${diaryData.diaryId}`} className="cardContent">
        <div className="img-container">
          <img className="image" src={firstThumbnail} alt="" />
        </div>
        <div className="content">
          <strong>{diaryData.title}</strong>
          <div className="txt-box" dangerouslySetInnerHTML={{ __html: resultContent }}></div>
          <div className="information">
            <span>{diaryData.name}</span>
            <div>
              <span className="count">{diaryData.recommendedCount}</span>
              <span className="view">{diaryData.views}</span>
              <span>
                {getFormattedDate(
                  diaryData.modifiedAt ? diaryData.modifiedAt : diaryData.createdAt,
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </CardBox>
  );
};

export default Card;
