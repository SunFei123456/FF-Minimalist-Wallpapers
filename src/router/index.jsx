// 导入创建路由的函数
import Layout from "@/layout";
import Home from "@/pages/Home";
import Wallpaper from "@/pages/Wallpaper";
import Detail from "@/pages/Detail";

import { createBrowserRouter } from "react-router-dom";
import UploadWallpaper from "@/pages/Upload";

import Self from "@/pages/Self";
import Plaza from "@/pages/Plaza/index.jsx";
import Archive from "@/pages/Archive";
import About from "@/pages/About";
import NotFound from "@/components/Error/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      { index: true, element: <Home /> },
      { path: "/wallpaper", element: <Wallpaper /> },
      // 壁纸详细页面, 动态路由, 接收路由跳转时传过来的id
      { path: "/detail/:id", element: <Detail /> },
      // 上传壁纸页面
      { path: "/upload", element: <UploadWallpaper /> },
      // 上传成功之后的页面
      // { path: "/upload/success", element: <uploadSuccess /> },
      { path: "/user/:id", element: <Self /> },

      // 广场
      { path: "/plaza", element: <Plaza /> },

      // 归档
      { path: "/archive", element: <Archive /> },

      // 关于
      { path: "/about", element: <About /> },

      // 404
      { path: "*", element: <NotFound/> },
    ],
  },
]);

export default router;
