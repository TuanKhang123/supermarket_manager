import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.scss";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { toast } from "react-toastify";

const AccountTableAction = ({ data, flagDelete }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleModalCancel = (cancelled) => {
    if (cancelled) {
      // Handle cancellation here or set state based on the cancellation flag
    }
    setOpenModal(false);
  };
  const handleEditClick = () => { };
  const handleOk = () => {
  };
  return (
    <div className="action_cover">
      <div className="action_item">
        <EditOutlined />
        <Link
          to={`/account-detail/${data.id}`}
          onClick={handleEditClick}
        >
          Edit detail
        </Link>
      </div>
      {/* <div className="action_item" onClick={() => handleOpenModal()}>
        <DeleteFilled />
        <a>Delete</a>
      </div> */}
      {/* {data?.statusDTO?.id === 1 && (
      )} */}
      <ConfirmModalAntd
        open={openModal}
        onCancel={handleModalCancel}
        onOk={handleOk}
        header={"Delete account information"}
        title={"Do you want to delete this account?"}
        content={""}
      ></ConfirmModalAntd>
    </div>
  );
};

export default AccountTableAction;
