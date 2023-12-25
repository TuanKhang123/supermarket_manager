import React, { useState } from "react";
import "./style.scss";
import SearchInventory from "./Search/search";
import TableAntdCustom from "../../components/TableAntd";
import AuditTableAction from "./Action";
import moment from "moment";

const InventoryAuditInfo = () => {
  const limit = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const [flagDelete, setFlagDelete] = useState(false);
  const [listData, setListData] = useState([
    {
      id: 1,
      date: "2023-12-21",
      checkerDTO: {
        id: 1,
        fullName: "Nguyen Van A",
      },
      numberChecked: 10,
    },
    {
      id: 2,
      date: "2023-12-21",
      checkerDTO: {
        id: 1,
        fullName: "Nguyen Van A",
      },
      numberChecked: 8,
    },
    {
      id: 3,
      date: "2023-12-21",
      checkerDTO: {
        id: 1,
        fullName: "Nguyen Van A",
      },
      numberChecked: 4,
    },
    {
      id: 4,
      date: "2023-12-21",
      checkerDTO: {
        id: 1,
        fullName: "Nguyen Van A",
      },
      numberChecked: 2,
    },
  ]);
  const [sendData, setSendData] = useState({
    date: null,
    keyWord: null,
    pageNumber: currentPage - 1,
    pageSize: limit,
  });

  const handlePageChange = (page) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
  };
  const handleChangeSearch = (values) => {
    console.log(values);
  };
  const handleSubmitSearch = (values) => {
    console.log(values);
  };
  const handleDelete = (value) => {
    // value && setFlagDelete(true);
  };
  const columnsAudit = [
    {
      title: "Thông tin kiểm kê",
      key: "typeId",
      width: "10%",
      align: "center",
      render: (text) =>
        "#" +
        text.id +
        " - Ngày: " +
        moment(new Date(text.date)).format("DD-MM-YYYY"),
    },
    {
      title: "Tên nhân viên kiểm kê",
      key: "duration",
      width: "10%",
      align: "center",
      render: (text) => text.checkerDTO.fullName,
    },
    {
      title: "Số loại mặt hàng kiểm kê",
      key: "duration",
      width: "10%",
      align: "center",
      render: (text) => text.numberChecked,
    },

    {
      title: "Hành động",
      width: "12%",
      align: "center",
      render: (_, record) => (
        <AuditTableAction
          data={record}
          flagDelete={handleDelete}
        ></AuditTableAction>
      ),
    },
  ];
  return (
    <div className="audit_infor_container">
      Bảng quản lí kiểm kê hàng hóa
      <SearchInventory
        handleChange={handleChangeSearch}
        handleSubmit={handleSubmitSearch}
      ></SearchInventory>
      <TableAntdCustom
        list={listData}
        totalItems={listData?.totalItems}
        totalPages={listData?.totalPages}
        onChange={handlePageChange} // Pass the callback function
        no={currentPage}
        pageSize={limit}
        columns={columnsAudit}
        // className={"course"}
        emptyText="Hiện chưa có thông tin kiểm kê"
      ></TableAntdCustom>
    </div>
  );
};

export default InventoryAuditInfo;
