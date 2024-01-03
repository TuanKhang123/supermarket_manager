import React, { useEffect, useState } from "react";
import "./style.scss";
import SearchInventory from "./Search/search";
import TableAntdCustom from "../../components/TableAntd";
import AuditTableAction from "./Action";
import moment from "moment";
import { ConfigProvider, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuditThunk } from "../../redux/aciton/audit";

const InventoryAuditInfo = () => {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [flagDelete, setFlagDelete] = useState(false);
  const dispatch = useDispatch()
  const { auditList } = useSelector(state => state.audit)

  const handlePageChange = (page) => {
    if (page != currentPage)
      setCurrentPage(page?.current);
  };
  const handleChangeSearch = (values) => {
    dispatch(getAllAuditThunk({ search: values?.keyWord, date: values?.date }))

  };

  const handleDelete = (value) => {
    // value && setFlagDelete(true);
  };

  useEffect(() => {
    dispatch(getAllAuditThunk())
  }, [])

  const columnsAudit = [
    {
      title: "Num",
      key: "number",
      width: "5%",
      align: "center",
      render: (_, __, index) => ((currentPage - 1) * limit) + index + 1,
    },
    {
      title: "Audit code",
      key: "inven_code",
      width: "10%",
      align: "center",
      render: (text) => text.inventoryCode,
    },
    {
      title: "Name of audit clerk",
      key: "duration",
      width: "10%",
      align: "center",
      render: (text) =>
        text.staffName,
    },
    {
      title: "Audit time",
      key: "typeId",
      width: "10%",
      align: "center",
      render: (text) =>
        // text?.inventoryTime
        moment(new Date(text.inventoryTime)).format("DD-MM-YYYY")
      ,
    },
    {
      title: "Action",
      width: "10%",
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
      <SearchInventory
        handleChange={handleChangeSearch}
      ></SearchInventory>

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
          columns={columnsAudit}
          dataSource={auditList}
          bordered
          className="table_content"
          onChange={handlePageChange}
          pagination={{
            pageSize: limit,
          }}
        ></Table>
      </ConfigProvider>
    </div>
  );
};

export default InventoryAuditInfo;
