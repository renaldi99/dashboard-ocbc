import React from "react";
import { Spin, Typography } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const PageLoading = () => {
  return (
    <div
      style={{
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        background: "rgba(0,0,0,.4)",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Spin
          indicator={
            <Loading3QuartersOutlined
              style={{ fontSize: 60, marginBottom: "20px", color: "#fff" }}
              spin
            />
          }
        />
        <Typography.Text style={{ color: "#fff" }}>
          Please Wait ...
        </Typography.Text>
      </div>
    </div>
  );
};

export default PageLoading;
