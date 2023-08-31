import styled from "styled-components";
import List from "../components/List";
const AllList = () => {
  return (
    <AllListCon>
      <List></List>
    </AllListCon>
  );
};
export default AllList;

const AllListCon = styled.main`
  min-height: calc(100vh - 120px);
  padding: 0 20px;
`;
