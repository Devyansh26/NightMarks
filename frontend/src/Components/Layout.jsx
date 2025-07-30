import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <NavBar />
      <div style={{flex:"1 0 auto"}}>
        <Outlet /> {/* Nested routed page goes here */}
      </div>
      <Footer />
    </div>
  );
}
