import "./styles.scss";
import { Button, ConfigProvider, Form, Input, Table, Upload } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { internshipTransport } from "../../../config/http/transport";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

const ProviderHome = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [form] = useForm();
    const [fl, setFL] = useState([]);

    const columns = [
        {
            key: "num",
            title: "Num",
            dataIndex: "num",
            render: (t, d, i) => i,
        },
        {
            key: "name",
            title: "Supplier Name",
            dataIndex: "name",
        },
        {
            key: "phoneContact",
            title: "Phone number",
            dataIndex: "phoneContact",
        },
        {
            key: "emailContact",
            title: "Email address",
            dataIndex: "emailContact",
        },
    ];


    useEffect(() => {
        internshipTransport.get("api/provides/all")
            .then(resp => {
                setData(_ => resp.data)
            });
    }, []);


    const onRowClick = (record) => {

        form.setFieldsValue({
            ...record,

        });
        setFL(_ => [
            {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: record.safetyInspection,
            },
        ]);

    }

    const onSubmit = (values) => {
        if (values.id) {
            const proId = values.id;
            const body = { 
                ...values,
            };

            if (typeof (body.safetyInspection) !== "string") {
                const base64 = body.safetyInspection.file.thumbUrl;
                body.safetyInspection = base64.substring(base64.indexOf(",") + 1);
            } else {
                delete body.safetyInspection;
            }

            internshipTransport.put(`api/provides/update/${proId}`, body)
            .then((resp) => {
                if (resp.statusCode === "OK") {
                    toast.success("Successfully!");
                    setData((prev) => prev.map((v, i) => v.id !== proId ? v : resp.data));
                } else {
                    console.log(resp);
                    toast.error("Error!");

                }
            });
        }
    }

    const onDelete = () => {
        const proId = form.getFieldValue("id");
        if (proId) {
            internshipTransport.put(`api/provides/delete/${proId}`)
                .then((resp) => {
                    console.log(resp);
                    if (resp.statusCode === "OK") {
                        toast.success("Delete provider successfully!");
                        setData(prev => prev.filter((v) => v.id !== proId));
                        form.resetFields();
                    } else {
                        toast.success(resp.data.message);
                    }
                });
        }
    }


    return (

        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#1677ff4d",
                    },
                    Form: {
                        itemMarginBottom: 0,
                    }

                },
            }}
        >
            <div className="provider__wrapper">
                <div className="provider__card" style={{ marginBottom: "30px" }}>
                    <h2 className="provider__title">Supplier Management</h2>
                </div>
                <div className="provider__splitter">
                    <div className="provider__card">
                        <div className="provider__section__heading">
                            <h2 className="provider__title">Supplier list</h2>
                            <div className="provider__actions">
                                <Input
                                    prefix={<SearchOutlined style={{ color: "#1677FF" }} />}
                                    placeholder="Provider name"
                                    value={input}
                                    onChange={e => setInput(_ => e.target.value)}
                                />
                                <Button type="primary" onClick={_ => navigate("/provider/add")}>
                                    Add supplier
                                </Button>
                            </div>
                        </div>
                        <div className="provider__main">

                            <Table
                                style={{ width: "100%" }}
                                columns={columns}
                                dataSource={data.filter((v, i) => {
                                    const nameMatched = v.name.toLowerCase().includes(input.toLowerCase());
                                    const phoneMatched = v.phoneContact.includes(input.toLowerCase());
                                    const emailMatched = v.emailContact.includes(input.toLowerCase());
                                    return nameMatched || phoneMatched || emailMatched;
                                })}
                                onRow={(record, index) => ({
                                    onClick: _ => onRowClick(record),
                                })}
                            />
                        </div>
                    </div>
                    <div className="provider__card" style={{ height: "fit-content" }}>
                        <div className="provider__section__heading">
                            <h2 className="provider__title">Supplier detail</h2>
                        </div>
                        <Form form={form} onFinish={onSubmit}>
                            <div className="provider__detail">
                                <h2 className="provider__field__title required">
                                    Supplier Name
                                </h2>
                                <h2 className="provider__field__title required">
                                    Phone number
                                </h2>
                                <Form.Item
                                    style={{ display: "none" }}
                                    name="id"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Input placeholder="Enter supplier name" />
                                </Form.Item>
                                <Form.Item
                                    name="phoneContact"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Input placeholder="Enter the provider's phone number" />
                                </Form.Item>
                                <h2 className="provider__field__title required">
                                    Address
                                </h2>
                                <h2 className="provider__field__title required">
                                    Email address
                                </h2>
                                <Form.Item
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Input placeholder="Enter the supplier's address" />
                                </Form.Item>
                                <Form.Item
                                    name="emailContact"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Input placeholder="Enter supplier email address" />
                                </Form.Item>
                                <h2 className="provider__field__title">
                                    Note
                                </h2>
                                <h2 className="provider__field__title required">
                                    Safety Inspection
                                </h2>
                                <Form.Item
                                    name="note"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Input.TextArea placeholder="Enter note information" style={{ resize: "none" }} />
                                </Form.Item>
                                <Form.Item
                                    name="safetyInspection"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required",
                                        }
                                    ]}
                                >
                                    <Upload fileList={fl} multiple={false} maxCount={1} listType="picture-card" onChange={(e) => setFL(_ => [e.file])}>
                                        <button
                                            style={{
                                                border: 0,
                                                background: "none",
                                            }}
                                            type="button"
                                        >
                                            <PlusOutlined />
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                }}
                                            >
                                                Upload
                                            </div>
                                        </button>
                                    </Upload>
                                </Form.Item>
                                <div className="provider__home__control">
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Change info
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="default" onClick={onDelete} >
                                            Delete
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default ProviderHome;