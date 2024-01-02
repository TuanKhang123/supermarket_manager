import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.scss";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { toast } from "react-toastify";

const AuditTableAction = ({ data, flagDelete }) => {
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
  const handleEditClick = (data) => {
    // console.log(data?.inventoryId);

  };
  const handleOk = () => {

  };
  return (
    <div className="action_cover">
      <div className="action_item">
        <EditOutlined />
        <Link
          to={`/inventory-audit-detail/${data.inventoryId}`}
          onClick={handleEditClick}
        >
          Edit detail
        </Link>
      </div>
      <div className="action_item" onClick={() => handleOpenModal()}>
        <DeleteFilled />
        <a>Delete</a>
      </div>
      {/* {data?.statusDTO?.id === 1 && (
      )} */}
      <ConfirmModalAntd
        open={openModal}
        onCancel={handleModalCancel}
        onOk={handleOk}
        header={"Delete audit information"}
        title={"Do you want to delete this information?"}
        content={""}
      ></ConfirmModalAntd>
    </div>
  );
};

export default AuditTableAction;
