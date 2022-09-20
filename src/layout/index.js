import React, { useEffect } from "react";
import { FooterApp, NavbarApp, SidebarApp } from "../components/main";
import AppRouter from "../routes/AppRouter";

const Layout = () => {
  useEffect(() => {
    const btnSidebar = document.getElementById("sidebar-toggle");
    btnSidebar.addEventListener("click", function (e) {
      const sidebarElement = document.getElementsByClassName();
    });
  }, []);

  return (
    <div className="body_field">
      <SidebarApp />
      <div className="container-fluid px-0">
        <div className="main-wrapper">
          <NavbarApp />
          <AppRouter />
          <FooterApp />
        </div>
      </div>
    </div>
  );
};

export default Layout;
