import "./styles.scss";
import { UploadOutlined, DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import { Input, Select, Upload, Button, Table, Popconfirm, DatePicker, ConfigProvider } from "antd";
import { EditableRow, EditableCell } from "./components/Edittable";
import { useState } from "react";
import dayjs from "dayjs";


export default function Import() {
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(0);

    const _acceptedFormat = "image/png, image/gif, image/jpeg";

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const handleAdd = () => {
        const newData = {
            key: count,
            pcode: `code ${count}`,
            bcode: `Edward King ${count}`,
            name: `Name ${count}`,
            qty: "32",
            shelfqty: "32",
            price: "32",
            category: "Jack",
            pro: dayjs(),
            exp: dayjs(),
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const defColumns = [
        {
            title: <h3 className="import__table__heading required">Product code</h3>,
            dataIndex: "pcode",
            type: "text",
        },
        {
            title: <h3 className="import__table__heading required">Batch code</h3>,
            dataIndex: "bcode",
            type: "text",
        },
        {
            title: <h3 className="import__table__heading required">Product name</h3>,
            dataIndex: "name",
            type: "text",
        },
        {
            title: <h3 className="import__table__heading required">Category</h3>,
            dataIndex: "category",
            type: "select",
        },
        {
            title: <h3 className="import__table__heading required">Quantity</h3>,
            dataIndex: "qty",
            type: "num",
        },
        {
            title: <h3 className="import__table__heading">Shelf Qty</h3>,
            dataIndex: "shelfqty",
            required: false,
            type: "num",
        },
        {
            title: <h3 className="import__table__heading required">Unit Price</h3>,
            dataIndex: "price",
            type: "num",
        },
        {
            title: <h3 className="import__table__heading required">Manufacture date</h3>,
            dataIndex: "pro",
            type: "date",
            render: (text, record, index) => record["pro"].format("DD-MM-YYYY"),
        },
        {
            title: <h3 className="import__table__heading required">Expire date</h3>,
            dataIndex: "exp",
            type: "date",
            render: (text, record, index) => record["exp"].format("DD-MM-YYYY"),
        },
        {
            title: <h3 className="import__table__heading">Action</h3>,
            dataIndex: "delete",
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a><DeleteOutlined /></a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const cols = defColumns.map((col, index) => {
        if (index === defColumns.length - 1) {
            return col;
        }
        return ({
            ...col,
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: col.dataIndex,
                title: col.title,
                type: col.type,
                handleSave,
            }),
        });
    });
    return (
        <div className="import__wrapper">
            <div className="import__card">
                <h2 className="import__title">
                    Inventory receiving detail
                </h2>
            </div>
            <div className="import__card import__common">
                <h4 className="import__field__title required">Receiving time</h4>
                <h4 className="import__field__title required">Supplier code</h4>
                <h4 className="import__field__title required">Provider</h4>
                <DatePicker placeholder="dd/mm/yyyy" format="DD/MM/YYYY" suffixIcon={<CalendarOutlined style={{ color: "red" }} />} />
                <Input />
                <Select
                    defaultValue="lucy"
                    options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                        { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                />
                <h4 className="import__field__title required">Delivery personnel name</h4>
                <h4 className="import__field__title required">Delivery personnel signature</h4>
                <h4 className="import__field__title">Note</h4>
                <Input />
                <Upload accept={_acceptedFormat} maxCount={1}  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <Input.TextArea style={{ gridRow: "4 / 7", gridColumn: "3", textAlign: "start", resize: "none" }} />
                <h4 className="import__field__title required">Receiving clerk name  </h4>
                <h4 className="import__field__title required">Receiving clerk signature</h4>
                <Input />
                <Upload accept={_acceptedFormat} maxCount={1} >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div>
            <div className="import__card">
                <Button style={{ marginBottom: "10px" }} type="primary" onClick={handleAdd}>Add Item</Button>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: "#1677ff4d",
                            },

                        },
                    }}
                >
                    <Table
                        title={() => <h3>Products List</h3>}
                        columns={cols} style={{ width: "100%" }}
                        rowClassName={() => "editable-row"}
                        components={components}
                        dataSource={dataSource}
                        pagination={{
                            pageSize: 5,
                        }}
                    />
                </ConfigProvider>

            </div>
            <div className="import__card import__buttons_group">
                <Button type="primary">Complete</Button>
                <Button type="default">New form</Button>
                <Button type="primary">Cancel</Button>
            </div>
        </div>
    );
}