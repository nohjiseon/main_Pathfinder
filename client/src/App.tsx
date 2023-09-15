import React from "react";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import RootLayout from "./pages/Root";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import WritePage from "./pages/WritePage";
import AreaMap from "./pages/AreaMap";
import Recommend from "./pages/Recommend";
import WriteEdit from "./pages/WriteEdit";
import Oauth2 from "./pages/Oauth2";
import Error from "./pages/Error";

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
          path: "/mypage",
          element: <MyPage />,
        },
        {
          path: "/write",
          element: <WritePage />,
        },
        {
          path: "/:id",
          element: <Detail />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/areamap",
          element: <AreaMap />,
        },
        {
          path: "/recommend",
          element: <Recommend />,
        },
        {
          path: "/write-edit/:id",
          element: <WriteEdit />,
        },
        {
          path: "/oauth2/:providerId",
          element: <Oauth2 />,
        },
        { path: "*", element: <Error /> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
