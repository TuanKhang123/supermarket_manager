import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.scss";
import { FolderAddOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { toast } from "react-toastify";

const AuditTableAction = ({ data, flagDelete, handleAdd }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleModalCancel = (cancelled) => {
    if (cancelled) {
      // Handle cancellation here or set state based on the cancellation flag
      // console.log("Modal was cancelled");
    }
    setOpenModal(false);
  };

  const handleOk = () => {
    
  };
  return (
    <div className="action_cover">
      <div className="action_item">
        <FolderAddOutlined />
        <a
          onClick={() => handleAdd(data)}
        >
          Add
        </a>
      </div>

      {/* {data?.statusDTO?.id === 1 && (
      )} */}
      <ConfirmModalAntd
        open={openModal}
        onCancel={handleModalCancel}
        onOk={handleOk}
        header={"Delete inventory information"}
        title={"Do you want to delete this information?"}
        content={""}
      ></ConfirmModalAntd>
    </div>
  );
};

export default AuditTableAction;
