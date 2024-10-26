import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";
import LayoutStyle from "./index.module.css";
import { useState } from "react";

function Layout() {
  return (
    <>
      <Nav></Nav>
      <div className={LayoutStyle.content}>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Layout;
