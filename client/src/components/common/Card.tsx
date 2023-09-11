import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { DiaryData } from "../../types/types";

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
  img {
    width: 156px;
    height: 95px;
    margin: 21px 15px;
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
  return (
    <CardBox>
      <li>
        <Link to={`/${diaryData.diaryId}`}>
          <div className="cardContent">
            <img className="image" src="" alt="" />
            <div className="content">
              <h2>{diaryData.title}</h2>
              <div>{diaryData.content}</div>
              <div className="information">
                <div>{diaryData.name}</div>
                <div>{diaryData.recommendedCount}</div>
                <div>{diaryData.views}</div>
                <div>{diaryData.modifiedAt}</div>
              </div>
            </div>
          </div>
        </Link>
      </li>
    </CardBox>
  );
};

export default Card;
