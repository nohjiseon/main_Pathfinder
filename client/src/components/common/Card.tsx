import { styled } from "styled-components";

const CardBox = styled.li`
  .cardContent {
    display: flex;
    flex-direction: row;
    width: 550px;
    height: 125px;
    background-color: rgba(255, 255, 255, 0.7);
    border: 0.5008px solid rgba(243, 243, 243, 1);
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

const Card = (): JSX.Element => {
  return (
    <CardBox>
      <li>
        <div className="cardContent">
          <img className="image" src="" alt="" />
          <div className="content">
            <h2>제목</h2>
            <div>
              내용내용내용 <br />
              내용내용
            </div>
            <div className="information">
              <div>닉네임</div>
              <div>추천, 조회수</div>
              <div>날짜</div>
            </div>
          </div>
        </div>
      </li>
    </CardBox>
  );
};

export default Card;
