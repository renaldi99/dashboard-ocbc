import { Spin } from "antd";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/home"));
const Absensi = lazy(() => import("../pages/absensi"));
const Vpn = lazy(() => import("../pages/vpn"));
const NotFound = lazy(() => import("../pages/exception/NotFound"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin style={{ color: "#e74c3c" }} tip="Please wait ..." />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="absensi" element={<Absensi />}></Route>
        <Route path="vpn" element={<Vpn />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
