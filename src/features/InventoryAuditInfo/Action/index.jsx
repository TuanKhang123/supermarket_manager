import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.scss";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { toast } from "react-toastify";
import { deleteAuditThunk, getAllAuditThunk } from "../../../redux/aciton/audit";

const AuditTableAction = ({ data, flagDelete }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleModalCancel = (cancelled) => {
    if (cancelled) {
    }
    setOpenModal(false);
  };
  const handleEditClick = (data) => {

  };
  const handleOk = (data) => {

    dispatch(deleteAuditThunk({ id: data?.inventoryId }))
      .then((res) => {
        if (res?.payload?.statusCode === "OK") {
          toast.success('Delete successfully', {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#32a852', backgroundColor: '#D7F1FD' },
          });
          dispatch(getAllAuditThunk())
        }
        else {
          toast.error('Delete fail', {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
          });
        }
      })

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
        onOk={() => handleOk(data)}
        header={"Delete audit information"}
        title={"Do you want to delete this information?"}
        content={""}
      ></ConfirmModalAntd>
    </div>
  );
};

export default AuditTableAction;
