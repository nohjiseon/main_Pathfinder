import React from "react";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import RootLayout from "./pages/Root";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import AllList from "./pages/AllList";
import WritePage from "./pages/WritePage";

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
          element: <AllList />,
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
