import React from "react";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import RootLayout from "./pages/Root";
import List from "./components/List";
import MyPage from "./pages/MyPage";
<<<<<<< HEAD
=======

>>>>>>> 73b6389 (feat: 마이페이지 파일 생성 및 라우터 설정)
function App() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/alllist",
          element: <List />,
        },
        {
          path: "/mypage",
          element: <MyPage />,
        },
      ],
    },
    // {
    //   path: "/login",
    //   element: <LogIn />,
    // },
    // {
    //   path: "/sign",
    //   element: <SignUp />,
    // },
    // { path: "*", element: <Error /> },
  ];

  const router = createBrowserRouter(routes);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
