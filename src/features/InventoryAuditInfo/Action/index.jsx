import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.scss";
import { EyeOutlined, DeleteFilled } from "@ant-design/icons";
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
  const handleEditClick = () => {};
  const handleOk = () => {
    // dispatch(deleteBookingThunk(data.id)).then((res) => {
    //   console.log(res);
    //   if (res?.payload?.message === "successfully") {
    //     toast.success("Xoá lịch đặt sân thành công", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       style: { color: "$color-default", backgroundColor: "#DEF2ED" },
    //     });
    //     flagDelete(true);
    //   } else {
    //     toast.error("Xoá lịch đặt sân thất bại", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       style: { color: "$color-default", backgroundColor: "#DEF2ED" },
    //     });
    //   }
    // });
  };
  return (
    <div className="action_cover">
      <div className="action_item">
        <EyeOutlined />
        <Link
          to={`/inventory-audit-detail/${data.id}`}
          onClick={handleEditClick}
        >
          Chỉnh sửa
        </Link>
      </div>
      <div className="action_item" onClick={() => handleOpenModal()}>
        <DeleteFilled />
        <a>Xoá</a>
      </div>
      {/* {data?.statusDTO?.id === 1 && (
      )} */}
      <ConfirmModalAntd
        open={openModal}
        onCancel={handleModalCancel}
        onOk={handleOk}
        header={"Xoá thông tin kiểm kê"}
        title={"Bạn có muốn xoá thông tin này"}
        content={""}
      ></ConfirmModalAntd>
    </div>
  );
};

export default AuditTableAction;
