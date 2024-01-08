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
    const navigate = useNavigate();

    const columns = [
        {
            title: "No.",
            key: "no",
            dataIndex: "no",
            render: (t, r, i) => ('0' + i).slice(-2)
        },
        {
            title: "Product Name",
            key: "categoryName",
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
        const searchStr = `api/products/all?search=${input}`;
        const reps = await internshipTransport.get(searchStr);
        console.log(reps);
        setData(_ => reps.data);
    }, [input, range]);

    useEffect(() => {
        search();
    }, [input, range]);

    const myFilter = (product, start, end) => {
        if (!start) return true;
        let date = dayjs(product.receivingTime);
        let st = start.set("hour", 0);
        st = st.set("minute", 0);
        st = st.set("second", 0);

        let ed = end.set("hour", 23);
        ed = ed.set("minute", 59);
        ed = ed.set("second", 59);
        return date.isBefore(ed) && date.isAfter(start);
    }

    return (
        <div className="inventory__wrapper">
            <div className="inventory__card">
                <div className="inventory__panel">
                    <Input onChange={e => setInput(e.target.value)} value={input} prefix={<SearchOutlined style={{ color: "#1677ff" }} />} style={{ width: "50%" }} placeholder="Search follow the supplier code" />
                    <DatePicker.RangePicker picker="date" format="DD/MM/YYYY" defaultValue={dayjs()} onChange={(v) => setRange(_ => v)} />
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
                        dataSource={range ? data.filter((v, i) => myFilter(v, range[0], range[1])) :  data}
                        bordered
                    />
                </ConfigProvider>

            </div>
        </div>
    );
}

export default Inventory;