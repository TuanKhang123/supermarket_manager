import "./styles.scss";
import { Button, DatePicker, Input, Table, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { internshipTransport } from "../../config/http/transport";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const [range, setRange] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const navigate = useNavigate();
    const handlePageChange = (page) => {
        if (page != currentPage)
          setCurrentPage(page?.current);
      };
    const onDelete = async (id) => {

    }

    const onChange = async (id) => {
        
    }

    const columns = [
        {
            title: "No.",
            key: "no",
            dataIndex: "no",
            render: (_, __, index) => ((currentPage - 1) * limit) + index + 1,
        },
        {
            title: "Product name",
            key: "productName",
            dataIndex: "productName",
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
    ];

    const search = useCallback(async () => {
        const start = (range ? range[0] : dayjs(new Date(1975, 1, 1))).format("DD-MM-YYYY");
        const end = (range ? range[1] : dayjs()).format("DD-MM-YYYY");
        const searchStr = `api/products/all?${input ? `search=${input}`: ""}${range ? `&from=${start}&to=${end}` : ""}`;
        console.log(searchStr);
        const reps = await internshipTransport.get(searchStr);
        setData(_ => reps.data);
    }, [input, range]);

    useEffect(() => {
        search();
    }, [input, range]);

    return (
        <div className="inventory__wrapper">
            <div className="inventory__card">
                <div className="inventory__panel">
                    <Input onChange={e => setInput(e.target.value)} value={input} prefix={<SearchOutlined style={{ color: "#1677ff" }} />} style={{ width: "50%" }} placeholder="Search follow the supplier code, product name" />
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
                        onChange={handlePageChange}
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