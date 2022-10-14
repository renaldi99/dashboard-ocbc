import React, { useEffect } from "react";
import { FooterApp, NavbarApp, SidebarApp } from "../components/main";
import AppRouter from "../routes/AppRouter";

const DefaultLayout = () => {
  return (
    <div className="body_field">
      <SidebarApp />
      <div className="container-fluid px-0">
        <div className="main-wrapper">
          <NavbarApp />
          <div className="main-content">
            <AppRouter />
          </div>
          <FooterApp />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
