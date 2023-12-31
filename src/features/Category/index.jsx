import React, { useEffect, useState } from "react";
import "./style.scss";
import TableAntdCustom from "../../components/TableAntd";
import AuditTableAction from "./Action";
import moment from "moment";
import SearchCategory from "./Search/search";
import { ConfigProvider, Table } from "antd";
import { getAllCategoryThunk } from "../../redux/aciton/category";
import { useDispatch, useSelector } from "react-redux";

const Category = () => {
    const limit = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [flagDelete, setFlagDelete] = useState(false);
    const dispatch = useDispatch()
    const { categoryList } = useSelector(state => state.category)

    const handlePageChange = (page) => {
        if (page != currentPage)
            setCurrentPage(page?.current);
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
    const columnsCate = [
        {
            title: "Num",
            key: "number",
            width: "4%",
            align: "center",
            render: (_, __, index) => ((currentPage - 1) * limit) + index + 1,
        },
        {
            title: "Category",
            key: "inven_code",
            width: "10%",
            align: "center",
            render: (text) => text.name,
        },
        {
            title: "Product quantity",
            key: "product_shelf",
            width: "10%",
            align: "center",
            render: (text) => text.productQnt,
        },
        {
            title: "Action",
            width: "7%",
            align: "center",
            render: (_, record) => (
                <AuditTableAction
                    data={record}
                    flagDelete={handleDelete}
                ></AuditTableAction>
            )
        },
    ];

    useEffect(() => {
        dispatch(getAllCategoryThunk())
    }, [])
    return (
        <div className="category_infor_container">
            <SearchCategory
                handleChange={handleChangeSearch}
                handleSubmit={handleSubmitSearch}
            ></SearchCategory>

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
                    columns={columnsCate}
                    // dataSource={listData}
                    dataSource={categoryList}
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

export default Category;
