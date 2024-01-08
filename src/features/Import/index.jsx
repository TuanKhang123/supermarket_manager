import "./styles.scss";
import { UploadOutlined, DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import { Input, Select, Upload, Button, Table, Popconfirm, DatePicker, ConfigProvider, Form, Spin } from "antd";
import { EditableRow, EditableCell } from "./components/Edittable";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { internshipTransport } from "../../config/http/transport";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ToBase64 from "../../utils/ToBase64";


export default function Import() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const { userCurrent } = useSelector(state => state.user);

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
            productCode: `Product code`,
            batchCode: `Batch code`,
            productName: `Product name`,
            inputQuantity: 10,
            shelfArrangeQnt: 10,
            inputPrice: 10000,
            categoryId: categories[0].id,
            manufactureDate: dayjs(),
            expiredDate: dayjs(),
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const defColumns = [
        {
            title: <h3 className="import__table__heading required">Product code</h3>,
            dataIndex: "productCode",
            type: "text",
        },
        {
            title: <h3 className="import__table__heading required">Batch code</h3>,
            dataIndex: "batchCode",
            type: "text",   
        },
        {
            title: <h3 className="import__table__heading required">Product name</h3>,
            dataIndex: "productName",
            type: "text",
        },
        {
            title: <h3 className="import__table__heading required">Category</h3>,
            dataIndex: "categoryId",
            type: "select",
            render: (text, record, index) => categories.filter((v) => v.id == record["categoryId"])[0].name,
        },
        {
            title: <h3 className="import__table__heading required">Quantity</h3>,
            dataIndex: "inputQuantity",
            type: "num",
        },
        {
            title: <h3 className="import__table__heading">Shelf Qty</h3>,
            dataIndex: "shelfArrangeQnt",
            required: false,
            type: "num",
        },
        {
            title: <h3 className="import__table__heading required">Unit Price</h3>,
            dataIndex: "inputPrice",
            type: "num",
        },
        {
            title: <h3 className="import__table__heading required">Manufacture date</h3>,
            dataIndex: "manufactureDate",
            type: "date",
            render: (text, record, index) => record["manufactureDate"].format("DD-MM-YYYY"),
        },
        {
            title: <h3 className="import__table__heading required">Expire date</h3>,
            dataIndex: "expiredDate",
            type: "date",
            render: (text, record, index) => record["expiredDate"].format("DD-MM-YYYY"),
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
            row: ({ index, ...props }) => EditableRow({ index, form, categories, ...props }),
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

    useEffect(_ => {
        Promise.all([
            internshipTransport.get("/api/provides/all"),
            internshipTransport.get("/api/categories/all")
        ]).then(resps => {
            setProviders(_ => resps[0].data);
            setCategories(_ => resps[1].data.map((v, i) => ({
                name: v.name,
                id: v.categoryId,
            })));
            setLoading(_ => false);
        });
    }, []);

    const onSubmit = (values) => {
        if (dataSource.length > 0) {
            Promise.all([
                ToBase64(values["deliverySignature"].file.originFileObj),
                ToBase64(values["receivingSignature"].file.originFileObj),
            ]).then((b64Images) => {
                const data = {
                    ...values,
                    staffId: userCurrent.id,
                    deliverySignature: b64Images[0],
                    receivingSignature: b64Images[1],
                    receivingTime: values.receivingTime.toDate(),
                    listProducts: dataSource.map((v) => ({
                        ...v,
                        manufactureDate: v.manufactureDate.toDate(),
                        expiredDate: v.expiredDate.toDate(),
                    }))
                };
                console.log(data);
                setLoading(_=> true);
                internshipTransport.post("/api/stocks-invoice/create", data)
                .then((res) => {
                    if (res.data.statusCode === "CREATED") {
                        toast.success(
                            "Successfully!",
                        );
                    } else {
                        toast.error(
                            "Failed",
                        );
                    }

                    setLoading(_=> false);
                });

            });
            

        } else {
            toast.error(
                "Products List cannot be empty!",
                {
                    autoClose: 3000,
                }
            );
        }
    }

    return (
        <div className="import__wrapper">
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: "#1677ff4d",
                        },
                        Form: {
                            itemMarginBottom: 0,
                        },
                    },
                }}
            >
                <Form form={form} onFinish={onSubmit}>
                    <div className="import__card import__common">
                        <h4 className="import__field__title required">Receiving time</h4>
                        <h4 className="import__field__title required">Supplier code</h4>
                        <h4 className="import__field__title required">Provider</h4>
                        <Form.Item
                            name="receivingTime"
                            initialValue={dayjs()}
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                },
                            ]}
                        >
                            <DatePicker disabled placeholder="dd/mm/yyyy" format="DD/MM/YYYY" suffixIcon={<CalendarOutlined style={{ color: "red" }} />} />
                        </Form.Item>
                        <Form.Item
                            name="supplyCode"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item required name="providerId"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                },
                            ]}
                        >
                            <Select
                                defaultValue={providers[0] || null}
                                options={providers.map((v) => ({
                                    value: v.id,
                                    label: v.name,
                                }))}
                            />
                        </Form.Item>
                        <h4 className="import__field__title required">Delivery personnel name</h4>
                        <h4 className="import__field__title required">Delivery personnel signature</h4>
                        <h4 className="import__field__title">Note</h4>
                        <Form.Item required name="deliveryPersonName"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item required name="deliverySignature"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                },
                            ]}
                        >
                            <Upload accept={_acceptedFormat} maxCount={1}  >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            style={{ gridRow: "4 / 8", gridColumn: "3" }}
                            name="note"
                            initialValue=""
                        >
                            <Input.TextArea style={{ textAlign: "start", resize: "none" }} />
                        </Form.Item>
                        <h4 className="import__field__title required">Receiving clerk name  </h4>
                        <h4 className="import__field__title required">Receiving clerk signature</h4>
                        <Form.Item
                            required
                            name="receivingClerkName"
                            initialValue={userCurrent.name}
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                },
                            ]}
                        >
                            <Input disabled readOnly />
                        </Form.Item>
                        <Form.Item
                            required
                            name="receivingSignature"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required",
                                },
                            ]}
                        >
                            <Upload accept={_acceptedFormat} maxCount={1} >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                    </div>
                    {
                        loading
                            ? <Spin fullscreen />
                            : <div className="import__card">
                                <Button style={{ marginBottom: "10px" }} type="primary" onClick={handleAdd}>Add Item</Button>
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

                            </div>
                    }
                    <div className="import__card import__buttons_group">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Complete</Button>
                        </Form.Item>
                        <Button type="default">New form</Button>
                        <Button type="primary">Cancel</Button>
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    );
}