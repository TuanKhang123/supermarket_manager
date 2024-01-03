import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditableRow, EditableCell } from "./components/Edittable";
import { Popconfirm } from "antd";

import {
    Button,
    Form,
    Input,
    Upload,
    message,
    Checkbox,
    Col,
    Row,
    Select,
    DatePicker,
    Space,
    InputNumber,
    ConfigProvider,
    Table,
} from "antd";
import {
    CloudUploadOutlined,
    DislikeOutlined,
    UploadOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import ConfirmModalAntd from "../../components/ConfirmModalAntd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";

import SearchCategory from "../Category/Search/search";
import AuditTableAction from "./Action";
import { getAllAuditThunk, getAuditByIdThunk, updateAuditThunk } from "../../redux/aciton/audit";
import moment from "moment";


const InventoryAuditDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [sendData, setSendData] = useState();
    const { userCurrent } = useSelector(state => state.user)
    const { auditById } = useSelector(state => state.audit)
    console.log(auditById);

    const stateData = location.state;
    const { id } = useParams();

    const maxSize = 25 * 1024 * 1024; // 25MB in bytes
    const { TextArea } = Input;
    const limit = 3;

    const [currentPage, setCurrentPage] = useState(1);
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(0);

    const handlePageChange = (page) => {
        if (page != currentPage)
            setCurrentPage(page?.current);
    };

    useEffect(() => {
        if (auditById) {
            form.setFieldsValue({
                date: moment(auditById.timeInventory, "DD-MM-YYYY"),
                upload: {
                    uid: '-1', // Cần có uid cho mỗi file
                    name: 'signature.png', // Tên file
                    status: 'done',
                    url: `${auditById.signatureOfClerk}`, // URL của hình ảnh
                },
                audit_code: auditById?.tnventoryCode,
                name: auditById?.nameOfClerk,
                description: auditById?.note,
                tableData: auditById?.products,
            });
            setDataSource(auditById?.products)
        }
    }, [])

    useEffect(() => {
        setFileList([form.getFieldValue('upload')]);
    }, [form]);

    useEffect(() => {
        dispatch(getAuditByIdThunk({ id: id }))
    }, [])

    const beforeUpload = async (file) => {
        if (file.size > maxSize) {
            message.error("File size must be within 25MB!");
            return false; // Prevent file from being uploaded
        }

        if (file.type != "") {
            if (!file.type.match(/image\/.*/)) {
                message.error("Only accept image!");
                return false; // Prevent file from being uploaded
            }
        }
        else {
            if (!file.name.endsWith(".heif")) {
                message.error("Only accept image!");
                return false;
            }
        }

        // setFileList([...fileList, file]);
        return false; // Allow file upload
    };

    const defColumns = [
        {
            title: <h3 style={{ textAlign: 'center' }} className="import__table__heading required">Num</h3>,
            dataIndex: "productId",
            type: "text",
            disabled: true,
        },
        {
            title: <h3 style={{ textAlign: 'center' }} className="import__table__heading required">Category</h3>,
            dataIndex: "categoryName",
            type: "text",
            disabled: true,
        },
        {
            title: <h3 style={{ textAlign: 'center' }} className="import__table__heading required">Product name</h3>,
            dataIndex: "productName",
            type: "text",
            disabled: true,
        },
        {
            title: <h3 style={{ textAlign: 'center' }} className="import__table__heading required">Product Code</h3>,
            dataIndex: "productCode",
            type: "text",
            disabled: true,
        },
        {
            title: <h3 style={{ textAlign: 'center' }} className="import__table__heading required">Check Quantity</h3>,
            dataIndex: "quantity",
            type: "num",
            editable: true,
        },
        {
            title: <h3 style={{ textAlign: 'center' }} className="import__table__heading">Status</h3>,
            dataIndex: "status",
            type: "select",
            required: false,
            editable: true,
        },
        {
            title: <h3 style={{ textAlign: 'center' }} className="import__table__heading required">Expire date</h3>,
            dataIndex: "expiredDate",
            type: "date",
            disabled: true,
        },
        {
            title: <h3 style={{ textAlign: 'center' }} className="import__table__heading">Action</h3>,
            dataIndex: "delete",
            render: (_, record) => {
                return (

                    dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.productId)}>
                            <a><DeleteOutlined /></a>
                        </Popconfirm>
                    ) : null
                )
            }
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
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                type: col.type,
                disabled: col.disabled,
                handleSave,
            }),
        });
    });
    const handleSave = (row) => {
        // const rowConfig = {...row, quantity: row?.quantity}
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.productId === item.productId);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        form.setFieldsValue({
            tableData: newData,
        });
        setDataSource(newData);
    };

    const handleDelete = (productId) => {
        const newData = dataSource.filter((item) => item.productId !== productId);
        setDataSource(newData);
        form.setFieldsValue({
            tableData: newData,
        });
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleUploadChange = async (info) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
        const firstFile = info.fileList[0];
        let secondFile = info.fileList[1];

        if (
            secondFile &&
            (secondFile.type.match(/^image\/.*/) || secondFile.name.endsWith(".heif"))
        ) {
            setFileList([secondFile]);
        } else if (
            firstFile &&
            (firstFile.type.match(/^image\/.*/) || firstFile.name.endsWith(".heif"))
        ) {
            setFileList([firstFile]);
        }
    };

    const handleRemove = (file) => {
        const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedFileList);
    };

    const handleModalCancel = (cancelled) => {
        if (cancelled) {
        }
        setOpenModal(false);
    };
    const handleOkModal = (value) => {

    };
    const onFinish = (values) => {
        console.log(values);

        let dataSend = []
        values?.tableData.map((item) => {
            const table = {
                productInventoryId: item?.productId,
                quantity: item?.quantity,
                status: item?.status,
            }
            dataSend.push(table)
        })

        console.log(dataSend);
        dispatch(updateAuditThunk({ id: id, data: dataSend }))
            .then(res => {
                if (res?.payload?.statusCode === "OK") {
                    toast.success('Update successfully', {
                        position: 'top-right',
                        autoClose: 3000,
                        style: { color: '#32a852', backgroundColor: '#D7F1FD' },
                    });
                }
                else {
                    toast.error('Update fail', {
                        position: 'top-right',
                        autoClose: 3000,
                        style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
                    });
                }
            })
    };

    const handleChangeSearch = (values) => {
        console.log(values);
    };
    const handleSubmitSearch = (values) => {
        console.log(values);
    };

    return (
        <div className="audit-form_container">

            <div className="audit-form">
                <Form
                    name="dynamic_form_nest_item"
                    form={form}
                    onFinish={onFinish}
                    style={{
                        maxWidth: "100%",
                    }}
                    autoComplete="off"
                    onFieldsChange={(changeField, allFields) => { }}
                >
                    <div className="form_content">
                        <div className="checker_infor">
                            <div className="col-1">
                                <Form.Item
                                    label={"Audit time"}
                                    className=""
                                    name={"date"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please choose a audit time",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        disabled
                                        // disabledDate={(d) => !d || d.isBefore(new Date())}
                                        placeholder="Select audit time"
                                        onChange={(value) => { }}
                                    />
                                </Form.Item>

                                <Form.Item

                                    className="picture"
                                    label="Signature of audit clerk"
                                    name={"upload"}
                                    rules={[
                                        // {
                                        //     required: true,
                                        //     message: "Please select signature confirmation",
                                        // },
                                        {
                                            validator: (_, value) => {
                                                if (value) {
                                                    if (value?.fileList?.length === 0) {
                                                        // return Promise.reject(
                                                        //     "Please select signature confirmation"
                                                        // );
                                                    } else {
                                                        return Promise.resolve();
                                                    }
                                                } else {
                                                    return Promise.reject();
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    <Upload

                                        listType="picture"
                                        beforeUpload={beforeUpload}
                                        fileList={fileList ? fileList : null}
                                        // onRemove={handleRemove} // Handle file removal
                                        onChange={handleUploadChange} // Handle file addition to fileList
                                    >
                                        <Button
                                            disabled
                                            icon={<CloudUploadOutlined />}>
                                            Upload image{" "}
                                            <span className="img_allowText">{`.jpg, .jpeg, .png, .heif capacity <= 30MB`}</span>
                                        </Button>
                                    </Upload>
                                </Form.Item>

                            </div>

                            <div className="col-2">

                                <Form.Item
                                    className="product_id"
                                    label="Audit code"
                                    name="audit_code"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter audit code",
                                        },
                                    ]}
                                >
                                    <Input disabled placeholder="Enter audit code" />
                                </Form.Item>

                                <Form.Item
                                    className="product_id"
                                    label="Name of audit clerk"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter the audit staff's name",
                                        },
                                    ]}
                                >
                                    <Input disabled placeholder="Enter the audit staff's name" />
                                </Form.Item>
                            </div>

                            <div className="col-3">
                                <Form.Item
                                    className="product_description"
                                    label="Note"
                                    name={"description"}
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                if (value && value.trim()) {
                                                    if (value.trim() == "<p><br></p>") {
                                                        return Promise.reject("Please enter note");
                                                    }
                                                    if (value.trim().length > 500) {
                                                        return Promise.reject(
                                                            "Please enter a maximum of 500 characters"
                                                        );
                                                    }
                                                    if (value.trim().length < 5) {
                                                        return Promise.reject(
                                                            "Please enter a minimum of 5 characters"
                                                        );
                                                    }
                                                    return Promise.resolve();
                                                } else {
                                                    return Promise.resolve();
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    <TextArea
                                        disabled
                                        rows={5}
                                        placeholder="Enter note"
                                        changeField={false}
                                        style={{ resize: 'none' }}
                                    />
                                </Form.Item>
                            </div>

                        </div>

                        <div className="import__card">
                            {/* <Button style={{ marginBottom: "10px" }} type="primary" onClick={handleAdd}>Add Item</Button> */}
                            <Form.Item
                                name={"tableData"}
                                initialValue={dataSource}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose product to audit",
                                    },
                                ]}
                            >
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
                                        title={() => <h3>Audit product list</h3>}
                                        columns={cols} style={{ width: "100%" }}
                                        rowClassName={() => "editable-row"}
                                        components={components}
                                        dataSource={dataSource}
                                        pagination={{
                                            pageSize: 3,
                                        }}
                                    />
                                </ConfigProvider>
                            </Form.Item>


                        </div>

                    </div>

                    <div className="buttonGroup">
                        <Form.Item className="checkBtn" name="continue">

                        </Form.Item>

                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Complete
                            </Button>
                        </Form.Item>

                        <Form.Item >
                            <Button
                                type="default"
                                onClick={() => navigate(`/inventory-audit-info`)}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                    </div>

                    <ConfirmModalAntd
                        open={openModal}
                        onCancel={handleModalCancel}
                        onOk={() => handleOkModal(sendData)}
                        header={`Hoàn thành thêm thông tin kiểm kê`}
                        title={`Bạn có muốn chốt thêm thông tin kiểm kê ?`}
                    ></ConfirmModalAntd>
                </Form>
            </div>
        </div>
    );
};

export default InventoryAuditDetail;
