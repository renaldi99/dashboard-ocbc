import { Button, Modal, Tooltip } from "antd";
import FormBuilder from "antd-form-builder";
import React from "react";
import { useState } from "react";

const ModalView = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, meta, initialValues, icon } = props;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title={title}>
        <Button
          size="small"
          onClick={showModal}
          style={{ borderRadius: 5 }}
          className="d-flex align-items-center"
        >
          {icon}
        </Button>
      </Tooltip>
      <Modal
        title="View Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormBuilder meta={meta} initialValues={initialValues} viewMode />
      </Modal>
    </>
  );
};

export default ModalView;
