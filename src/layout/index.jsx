import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Nav></Nav>
      <div style={{marginTop:'50px'}}>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Layout;
