import React, { useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../components/TableAntd";
import AuditTableAction from "./Action";
import moment from "moment";
import SearchAccount from "./Search/search";
import AccountTableAction from "./Action";

const AccountInfo = () => {
  const limit = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const [flagDelete, setFlagDelete] = useState(false);
  const [listData, setListData] = useState([
    {
      id: 1,
      name: "phucHV",
      email: "phuchv02@gmail.com",
      password: "phuchv",
      dateOfBirth: "2023-01-26T00:00:00.000+00:00",
      gender: true,
      role: "STAFF",
      status: 1,
      hasWarehouse: false,
      hasCategory: false,
      address: null,
      safetyInspectionImg: null,
      phone: "string",
      position: "string",
      hasShelf: false,
      hasSupply: true,
      hasAudit: true,
      hasStatistic: true,
    },
    {
      id: 6,
      name: "string",
      email: "duclo1111ng@gm.com",
      password: "123456",
      dateOfBirth: null,
      gender: true,
      role: "STAFF",
      status: 0,
      hasWarehouse: false,
      hasCategory: false,
      address: null,
      safetyInspectionImg: null,
      phone: "090902123",
      position: "1",
      hasShelf: false,
      hasSupply: false,
      hasAudit: false,
      hasStatistic: false,
    },
    {
      id: 5,
      name: "string",
      email: "duclon1g@gm.com",
      password: "123456",
      dateOfBirth: null,
      gender: true,
      role: "STAFF",
      status: 0,
      hasWarehouse: false,
      hasCategory: false,
      address: null,
      safetyInspectionImg: null,
      phone: "090902123",
      position: "1",
      hasShelf: false,
      hasSupply: false,
      hasAudit: false,
      hasStatistic: false,
    },
    {
      id: 4,
      name: "string",
      email: "duclong@gm.com",
      password: "123456",
      dateOfBirth: null,
      gender: true,
      role: "ADMIN",
      status: 0,
      hasWarehouse: false,
      hasCategory: false,
      address: null,
      safetyInspectionImg: null,
      phone: "090902123",
      position: "1",
      hasShelf: false,
      hasSupply: false,
      hasAudit: false,
      hasStatistic: false,
    },
    {
      id: 3,
      name: "string",
      email: "duc111long@gm.com",
      password: "123456",
      dateOfBirth: null,
      gender: true,
      role: "STAFF",
      status: 0,
      hasWarehouse: false,
      hasCategory: false,
      address: null,
      safetyInspectionImg: null,
      phone: "090902123",
      position: "1",
      hasShelf: false,
      hasSupply: false,
      hasAudit: false,
      hasStatistic: false,
    },
    {
      id: 2,
      name: "string",
      email: "string@gm.uit.edu.vn",
      password: "stringa",
      dateOfBirth: null,
      gender: true,
      role: "STAFF",
      status: 0,
      hasWarehouse: false,
      hasCategory: false,
      address: null,
      safetyInspectionImg: null,
      phone: "090902123",
      position: "1",
      hasShelf: false,
      hasSupply: false,
      hasAudit: false,
      hasStatistic: false,
    },
    {
      id: 7,
      name: "string",
      email: "duclo11122221ng@gm.com",
      password: "123456",
      dateOfBirth: null,
      gender: true,
      role: "STAFF",
      status: null,
      hasWarehouse: false,
      hasCategory: false,
      address: null,
      safetyInspectionImg: null,
      phone: "090902123",
      position: "1",
      hasShelf: false,
      hasSupply: false,
      hasAudit: false,
      hasStatistic: false,
    },
    {
      id: 8,
      name: "string",
      email: "str11ing@gm.uit.edu.vn",
      password: "stringa",
      dateOfBirth: null,
      gender: true,
      role: "STAFF",
      status: null,
      hasWarehouse: false,
      hasCategory: false,
      address: null,
      safetyInspectionImg: null,
      phone: "090902123",
      position: "1",
      hasShelf: false,
      hasSupply: false,
      hasAudit: false,
      hasStatistic: false,
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
  const columnsAccount = [
    {
      title: "Họ và tên",
      key: "name",
      width: "15%",
      align: "center",
      render: (text) => text.name,
    },
    {
      title: "Email",
      key: "email",
      width: "10%",
      align: "center",
      ellipsis: true,
      render: (text) => text.email,
    },
    {
      title: "Số điện thoại",
      key: "phoenNumber",
      width: "10%",
      align: "center",
      render: (text) => text.phone,
    },

    {
      title: "Trạng thái",
      key: "status",
      width: "10%",
      align: "center",
      render: (text) => null,
    },
    {
      title: "Vị trí",
      key: "position",
      width: "10%",
      align: "center",
      render: (text) => text?.position,
    },
    {
      title: "Hành động",
      width: "12%",
      align: "center",
      render: (_, record) => (
        
        <AccountTableAction
          data={record}
          flagDelete={handleDelete}
        ></AccountTableAction>
      ),
    },
  ];
  return (
    <div className="account_infor_container">
      Bảng quản lí tài khoản
      <SearchAccount
        handleChange={handleChangeSearch}
        handleSubmit={handleSubmitSearch}
      ></SearchAccount>

      <TableAntdCustom
        list={listData}
        totalItems={listData?.totalItems}
        totalPages={listData?.totalPages}
        onChange={handlePageChange} // Pass the callback function
        no={currentPage}
        pageSize={limit}
        columns={columnsAccount}
        className={"course"}
        emptyText="Hiện chưa có tài khoản"
      ></TableAntdCustom>
    </div>
  );
};

export default AccountInfo;
