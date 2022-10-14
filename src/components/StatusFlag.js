import { Tag } from "antd";
import React from "react";

const StatusFlag = (props) => {
  const { flag } = props;
  return flag === "I" ? (
    <Tag color="green">Clock In</Tag>
  ) : (
    <Tag color="volcano">Clock Out</Tag>
  );
};

export default StatusFlag;
