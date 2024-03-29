import "./styles.scss";
import { Button, InputNumber, Select, Input, Space, Form, ConfigProvider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { internshipTransport } from "../../../config/http/transport";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddShelf = () => {
    const [tiers, setTiers] = useState([10]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    
    const add = () => setTiers(prev => [...prev, 1]);
    const change = (index, value) => setTiers(prev => prev.map((v, i) => i === index ? value : v));
    const del = (index) => setTiers(prev => prev.filter((v, i) => i !== index));


    useEffect(_ => {
        internshipTransport.get("/api/categories/all")
            .then(resp => {
                if (resp.statusCode === "OK") {
                    setCategories(_ => resp.data);
                }
            });
    }, []);

    const onSubmit = (values) => {
        const body = {
            shelfCode: values.shelfCode,
            categoryId: values.categoryId,
            tiers: tiers.map((v, i) => ({
                numberOfCompartment: values[`tier0${i}`],
            }))
        }

        internshipTransport.post("/api/shelves/create", body)
            .then(resp => {
                if (resp.statusCode === "CREATED") {
                    toast.success("Successfully!");
                    navigate("/shelf");
                } else {
                    toast.error("Error!");
                }
            });
    }

    return (
        <div className="ashelf__wrapper">
            <div className="ashelf__card">
                <ConfigProvider
                    theme={{
                        components: {
                            Form: {
                                itemMarginBottom: 0,
                            }
                        }
                    }}
                >
                    <Form onFinish={onSubmit}>
                        <div className="ashelf__layout">
                            <h3 className="ashelf__field__title required">
                                Shelf code
                            </h3>
                            <h3 className="ashelf__field__title required">
                                Category
                            </h3>
                            <Form.Item
                                name="shelfCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!",
                                    }
                                ]}
                            >
                                <Input placeholder="Input shelf code (Eg: A1)" />
                            </Form.Item>
                            <Form.Item
                                name="categoryId"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!",
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="Input category type"
                                    options={categories.map((v, i) => ({
                                        value: v.categoryId,
                                        label: v.name,
                                    }))}
                                />
                            </Form.Item>
                        </div>
                        <ul className="ashelf__tierlist">
                            {
                                tiers.map((value, index) => (
                                    <li key={index} className="ashelf__tieritem">
                                        <h2 className="ashelf__field__title required">
                                            {`Tier ${index + 1}`}
                                        </h2>
                                        <Space.Compact >
                                            <Form.Item
                                                name={`tier0${index}`}
                                                initialValue={10}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "This field is required!",
                                                    }
                                                ]}
                                            >
                                                <InputNumber min={0} value={value} onChange={(value) => change(index, value)} />
                                            </Form.Item>
                                            <Button icon={<DeleteOutlined style={{ color: "#1677FF" }} />} onClick={_ => del(index)} disabled={tiers.length < 2} />
                                        </Space.Compact>
                                    </li>
                                ))
                            }
                            <li className="ashelf__submit">

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Complete
                                    </Button>
                                </Form.Item>
                                <Button type="default">
                                    Cancel
                                </Button>
                                {
                                    tiers.length < 5 &&
                                    <Button type="dashed" onClick={add} >
                                        + More Tier
                                    </Button>
                                }
                            </li>
                        </ul>
                    </Form>
                </ConfigProvider>
            </div>
        </div>
    );
}

export default AddShelf;