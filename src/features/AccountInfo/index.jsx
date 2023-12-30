import React, { useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../components/TableAntd";
import AuditTableAction from "./Action";
import moment from "moment";
import SearchAccount from "./Search/search";
import AccountTableAction from "./Action";
import { ConfigProvider, Table, Tag } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllAccountThunk } from "../../redux/aciton/account";

const AccountInfo = () => {

  const dispatch = useDispatch()
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [flagDelete, setFlagDelete] = useState(false);
  const { accountList } = useSelector(state => state.account)

  const handlePageChange = (page) => {
    console.log(page);
    if (page != currentPage)
      setCurrentPage(page?.current);

  };
  const handleChangeSearch = (values) => {
    console.log(values);
    dispatch(getAllAccountThunk({ status: values?.status, search: values?.keyWord }))


  };
  const handleSubmitSearch = (values) => {
    console.log(values);

  };
  const handleDelete = (value) => {
    // value && setFlagDelete(true);
  };

  useEffect(() => {
    dispatch(getAllAccountThunk())
  }, [])



  const columnsAccount = [
    {
      title: "Num",
      key: "number",
      width: "3%",
      align: "center",
      render: (_, __, index) => ((currentPage - 1) * limit) + index + 1,
    },
    {
      title: "User name",
      key: "name",
      width: "10%",
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
      title: "Phone number",
      key: "phoenNumber",
      width: "7%",
      align: "center",
      render: (text) => text.phone,
    },

    {
      title: "Status",
      key: "status",
      width: "7%",
      align: "center",
      render: (text) => (
        text?.status === 0
          ? <Tag style={{ padding: '5px 8px', fontSize: '14px' }} color="error">Block</Tag>
          : <Tag style={{ padding: '5px 8px', fontSize: '14px' }} color="success">Active</Tag>

      ),
    },
    // {
    //   title: "Position",
    //   key: "position",
    //   width: "10%",
    //   align: "center",
    //   render: (text) => text?.position,
    // },
    {
      title: "Action",
      width: "7%",
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
      <SearchAccount
        handleChange={handleChangeSearch}
        handleSubmit={handleSubmitSearch}
      ></SearchAccount>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#1677ff4d",
              borderColor: "#cccccc"
            },
          },
        }}
      >
        <Table
          columns={columnsAccount}
          // dataSource={listData}
          dataSource={accountList?.accounts}
          bordered
          className="table_content"
          onChange={handlePageChange}
          pagination={{
            pageSize: limit,
          }}
        ></Table>
      </ConfigProvider>

      {/* <TableAntdCustom
        // list={accountList?.accounts}
        list={listData}
        // totalItems={listData?.totalItems}
        // totalPages={listData?.totalPages}
        onChange={handlePageChange} // Pass the callback function
        no={currentPage}
        pageSize={limit}
        columns={columnsAccount}
        className={"course"}
        emptyText="Hiện chưa có tài khoản"
      ></TableAntdCustom> */}
    </div>
  );
};

export default AccountInfo;
