import { Outlet } from "react-router";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const Root = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
