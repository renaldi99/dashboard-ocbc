import React from "react";
import { Route, Routes } from "react-router-dom";
import Absensi from "../pages/absensi";
import NotFound from "../pages/exception/NotFound";
import Home from "../pages/home";
import Vpn from "../pages/vpn";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="absensi" element={<Absensi />}></Route>
      <Route path="vpn" element={<Vpn />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppRouter;
