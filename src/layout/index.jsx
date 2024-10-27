import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
