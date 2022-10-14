import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoOCBC } from "../../assets";
import { LOGIN_USER } from "../../services/CallServiceAbsensi";
import swal from "sweetalert";
import PageLoading from "../../components/PageLoading";
import { Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Login = () => {
  const [stateAuth, setStateAuth] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { username, password } = stateAuth;
  const navigation = useNavigate();
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  };

  const disabledButton = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setStateAuth({
      ...stateAuth,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username === "" || password === "") {
      setLoading(false);
      swal("Oops!", "Username dan password tidak boleh kosong", "error");
      return false;
    } else {
      try {
        setLoading(true);
        const res = await LOGIN_USER({ username, password });
        const data = res.data;
        if (data.data === null) {
          setLoading(false);
          swal(
            "Oops!",
            "You have no permission to access this website",
            "error"
          );
          return false;
        }
        const newData = {
          name: data.data.username,
          id: data.data.id,
          menu: data.data.menus,
        };
        saveToken(newData);
        navigation("/protected", { replace: true });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        swal("Oops!", "Internal Connection Error", "error");
        throw error;
      }
    }
  };

  const checklogin = () => {
    if (sessionStorage.getItem("token")) {
      navigation("/protected", { replace: true });
    }
  };

  useEffect(() => {
    checklogin();
  }, []);

  return (
    <>
      <div className="section-login">
        <div className="container-fluid p-0 m-0">
          <div className="row min-vh-100">
            <div
              className="col-lg-6 d-lg-block d-md-none left-side-login"
              id="left-side-login"
            ></div>
            <div className="col-lg-6 col-md-12 bg-white d-flex justify-content-center align-items-center right-side-login">
              <div className="card-login-form w-100">
                <div className="d-flex justify-content-center card-logo">
                  <img src={LogoOCBC} />
                </div>
                <h3>Welcome Back</h3>
                <form onSubmit={handleSubmit}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      size="large"
                      placeholder="Username"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      prefix={<UserOutlined />}
                    />
                    <Input.Password
                      placeholder="Password"
                      size="large"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      type="password"
                      name="password"
                      onChange={handleChange}
                      prefix={<LockOutlined />}
                    />
                    <button
                      type="submit"
                      className="btn w-100 btn-danger mt-2"
                      style={{ borderRadius: "2px" }}
                      id="btn-login"
                      disabled={!disabledButton()}
                    >
                      SIGN IN
                    </button>
                  </Space>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? <PageLoading /> : null}
    </>
  );
};

export default Login;
