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
      invenCode: 'A123',
      proName: 'CoCa 150ml',
      numberChecked: 10,
    },
    {
      id: 2,
      date: "2023-12-21",
      checkerDTO: {
        id: 1,
        fullName: "Nguyen Van A",
      },
      invenCode: 'A123',
      proName: 'CoCa 150ml',
      numberChecked: 8,
    },
    {
      id: 3,
      date: "2023-12-21",
      checkerDTO: {
        id: 1,
        fullName: "Nguyen Van A",
      },
      invenCode: 'A123',
      proName: 'CoCa 150ml',
      numberChecked: 4,
    },
    {
      id: 4,
      date: "2023-12-21",
      checkerDTO: {
        id: 1,
        fullName: "Nguyen Van A",
      },
      invenCode: 'A123',
      proName: 'CoCa 150ml',
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
      title: "Num",
      key: "number",
      width: "5%",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Inventory code",
      key: "inven_code",
      width: "10%",
      align: "center",
      render: (text) => text.invenCode,
    },
    {
      title: "Product name",
      key: "product_name",
      width: "15%",
      align: "center",
      render: (text) => text.proName,
    },
    {
      title: "Name of inventory clerk",
      key: "duration",
      width: "10%",
      align: "center",
      render: (text) => text.checkerDTO.fullName,
    },
    {
      title: "Number of inventory items",
      key: "duration",
      width: "10%",
      align: "center",
      render: (text) => text.numberChecked,
    },
    {
      title: "Inventory time",
      key: "typeId",
      width: "10%",
      align: "center",
      render: (text) =>
        moment(new Date(text.date)).format("DD-MM-YYYY"),
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
        emptyText="There is currently no inventory information"
      ></TableAntdCustom>
    </div>
  );
};

export default InventoryAuditInfo;
