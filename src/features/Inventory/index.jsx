import { Button, DatePicker, Input, Table, ConfigProvider } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";
import dayjs from "dayjs";


const Inventory = () => {
    const columns = [
        {
            title: "No.",
            key: "no",
            dataIndex: "no",
            render: (t, r, i) => ('0' + i).slice(-2)
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "category",
        },
        {
            title: "Supplier code",
            key: "scode",
            dataIndex: "scode",
        },
        {
            title: "Product code",
            key: "pcode",
            dataIndex: "pcode",
        },
        {
            title: "Batch code",
            key: "bcode",
            dataIndex: "bcode",
        },
        {
            title: "Quantity",
            key: "qty",
            dataIndex: "qty",
        },
        {
            title: "Receiving time",
            key: "rtime",
            dataIndex: "rtime",
            render: (_, record) => record["rtime"].format("DD/MM/YYYY"),
        },
        {
            title: "Action",
            key: "act",
            dataIndex: "act",
            render: () => <div className="inventory__actionsgroup">
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: "#1677FF" }} />}
                    onClick={onclick}
                >
                    Edit detail
                </Button>
                <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined style={{ color: "#FF0000" }} />}
                    onClick={onclick}
                >
                    Delete
                </Button>

            </div>,
        },
    ];

    const data = [
        {
            category: "Lmao",
            scode: "Lmu",
            pcode: "CC",
            bcode: "Lmaooo",
            qty: 10,
            rtime: dayjs(),
        },
        {
            category: "Lmao",
            scode: "Lmu",
            pcode: "CC",
            bcode: "Lmaooo",
            qty: 10,
            rtime: dayjs(),
        },
        {
            category: "Lmao",
            scode: "Lmu",
            pcode: "CC",
            bcode: "Lmaooo",
            qty: 10,
            rtime: dayjs(),
        },
        {
            category: "Lmao",
            scode: "Lmu",
            pcode: "CC",
            bcode: "Lmaooo",
            qty: 10,
            rtime: dayjs(),
        },
        {
            category: "Lmao",
            scode: "Lmu",
            pcode: "CC",
            bcode: "Lmaooo",
            qty: 10,
            rtime: dayjs(),
        },
        {
            category: "Lmao",
            scode: "Lmu",
            pcode: "CC",
            bcode: "Lmaooo",
            qty: 10,
            rtime: dayjs(),
        },
        {
            category: "Lmao",
            scode: "Lmu",
            pcode: "CC",
            bcode: "Lmaooo",
            qty: 10,
            rtime: dayjs(),
        },
        {
            category: "Lmao",
            scode: "Lmu",
            pcode: "CC",
            bcode: "Lmaooo",
            qty: 10,
            rtime: dayjs(),
        },
    ];

    return (
        <div className="inventory__wrapper">
            <div className="inventory__card">
                <h2 className="inventory__title">Inventory receiving table</h2>
            </div>
            <div className="inventory__card">
                <div className="inventory__panel">
                    <Input prefix={<SearchOutlined style={{ color: "#1677ff" }} />} placeholder="Search follow the supplier code" />
                    <DatePicker format="DD/MM/YYYY" defaultValue={dayjs()} />
                    <Button type="primary">
                        Add products
                    </Button>
                </div>
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
                        columns={columns}
                        dataSource={data}
                        bordered
                    />
                </ConfigProvider>

            </div>
        </div>
    );
}

export default Inventory;