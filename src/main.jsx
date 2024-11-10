import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'animate.css';
import router from "./router";
import { RouterProvider } from "react-router-dom";
import A from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} >
    <A></A>
  </RouterProvider>
);
