import { Spin } from "antd";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/main/ProtectedRoute";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./pages/login";
import useIsMobile from "./utils/useIsMobile";

function App() {
  if (useIsMobile()) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin
            style={{ color: "#e74c3c" }}
            tip="Please use your dekstop device"
          />
        </div>
      </>
    );
  }
  return (
    <Routes>
      <Route index element={<Login />}></Route>
      <Route
        path="/protected/*"
        element={
          <ProtectedRoute redirectTo={"/"}>
            <DefaultLayout />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
