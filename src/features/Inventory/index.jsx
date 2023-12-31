import { Button, DatePicker, Input, Table, ConfigProvider } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { internshipTransport } from "../../config/http/transport";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const [range, setRange] = useState(null);
    const navigate = useNavigate();

    const onDelete = async (id) => {

    }

    const onChange = async (id) => {
        
    }

    const columns = [
        {
            title: "No.",
            key: "no",
            dataIndex: "no",
            render: (t, r, i) => ('0' + i).slice(-2)
        },
        {
            title: "Category",
            key: "categoryName",
            dataIndex: "categoryName",
        },
        {
            title: "Supplier code",
            key: "supplyCode",
            dataIndex: "supplyCode",
        },
        {
            title: "Product code",
            key: "productId",
            dataIndex: "productId",
        },
        {
            title: "Batch code",
            key: "batchCode",
            dataIndex: "batchCode",
        },
        {
            title: "Quantity",
            key: "inputQuantity",
            dataIndex: "inputQuantity",
        },
        {
            title: "Receiving time",
            key: "receivingTime",
            dataIndex: "receivingTime",
            render: (_, record) => dayjs(Date.parse(record["receivingTime"])).format("DD/MM/YYYY"),
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

    const search = useCallback(async () => {
        const start = (range ? range[0] : dayjs(new Date(1975, 1, 1))).format("DD-MM-YYYY");
        const end = (range ? range[1] : dayjs()).format("DD-MM-YYYY");
        const searchStr = `api/products/all?search=${input}&page-number=1&limit=1&from=${start}&to=${end}`;
        const reps = await internshipTransport.get(searchStr);
        setData(_ => reps.data);
    }, [input, range]);

    useEffect(() => {
        search();
    }, [input, range]);

    return (
        <div className="inventory__wrapper">
            <div className="inventory__card">
                <h2 className="inventory__title">Inventory receiving table</h2>
            </div>
            <div className="inventory__card">
                <div className="inventory__panel">
                    <Input onChange={e => setInput(e.target.value)} value={input} prefix={<SearchOutlined style={{ color: "#1677ff" }} />} style={{ width: "50%" }} placeholder="Search follow the supplier code" />
                    <DatePicker.RangePicker picker="date" format="DD/MM/YYYY" defaultValue={dayjs()} onChange={(v) => setRange(_=> v)} />
                    <Button type="primary" onClick={_ => navigate("/import")}>
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
                        dataSource={data || []}
                        bordered
                    />
                </ConfigProvider>

            </div>
        </div>
    );
}

export default Inventory;