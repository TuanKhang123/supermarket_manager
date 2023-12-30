import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
    Tag,
    DatePicker,
    Space,
    InputNumber,
} from "antd";
import {
    CloudUploadOutlined,
    DislikeOutlined,
    UploadOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Option } from "antd/es/mentions";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import registerPic from "../../../images/register.png";
import { getAccountByIdThunk, updateAccountThunk } from "../../../redux/aciton/account";

const AccountDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accountById } = useSelector(state => state.account)
    const { id } = useParams();
    console.log(accountById);
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [sendData, setSendData] = useState();
    const [flagBlock, setflagBlock] = useState()

    const options = [
        {
            color: 'gold',
            value: 'hasWarehouse',
            label: 'Warehouse'
        },
        {
            color: 'lime',
            value: 'hasShelf',
            label: 'Shelf'

        },
        {
            color: 'green',
            value: 'hasSupply',
            label: 'Supply'

        },
        {
            color: 'pink',
            value: 'hasAudit',
            label: 'Audit'
        },
        {
            color: 'yellow',
            value: 'hasCategory',
            label: 'Category'
        },
        {
            color: 'red',
            value: 'hasStatistic',
            label: 'Statistic'
        },
    ];

    useEffect(() => {
        dispatch(getAccountByIdThunk({ id: id }))

    }, [id])

    useEffect(() => {
        setflagBlock(accountById.status)
    }, [accountById])

    useEffect(() => {
        if (accountById) {
            // Chuyển đổi permissions
            const permissions = [];
            if (accountById.hasAudit) permissions.push('hasAudit');
            if (accountById.hasCategory) permissions.push('hasCategory');
            if (accountById.hasShelf) permissions.push('hasShelf');
            if (accountById.hasStatistic) permissions.push('hasStatistic');
            if (accountById.hasSupply) permissions.push('hasSupply');
            if (accountById.hasWarehouse) permissions.push('hasWarehouse');
            //... tiếp tục cho các permission khác

            // Cập nhật form
            form.setFieldsValue({
                name: accountById.name,
                email: accountById.email,
                gender: accountById.gender ? 1 : 0, // Ví dụ nếu gender là boolean
                permission: permissions,
                phoneNumber: accountById.phone,
                status: accountById.status
            });
        }
    }, [accountById, form]);

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const color = options.find(option => option.value === value)?.color;

        return (
            <Tag color={color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
                {label}
            </Tag>
        );
    };

    const handleModalCancel = (cancelled) => {
        if (cancelled) {
            // Handle cancellation here or set state based on the cancellation flag
            // console.log("Modal was cancelled");
        }
        setOpenModal(false);
    };

    const onFinish = (values) => {
        console.log(values);
        const dataSend = {
            status: flagBlock,
            name: values.name.trim(),
            gender: values.gender,
            phone: values.phoneNumber,
            // has_audit: accountById.hasAudit, // Gán trực tiếp từ accountById
            // has_category: accountById.hasCategory,
            // has_shelf: accountById.hasShelf,
            // has_statistic: accountById.hasStatistic,
            // has_supply: accountById.hasSupply,
            // has_warehouse: accountById.hasWarehouse
        };
        
        // dispatch(updateAccountThunk({ dataSend }))
        console.log(dataSend);
    };


    return (
        <div className="account-detail_container">
            <h4>Update account</h4>

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
                    <div className="row_one">
                        <Form.Item
                            className="staff_item name"
                            label="Full name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your fullname",
                                },
                                {
                                    pattern: new RegExp(
                                        /^[A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+( [A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+)*$/
                                    ),
                                    message: "Fullname error",
                                },
                                {
                                    validator: (_, value) => {
                                        if (value) {
                                            if (value.length < 2 || value.length > 64) {
                                                return Promise.reject(
                                                    "Full name must be between 2 and 64 characters long"
                                                );
                                            }
                                            if (value.trim() == "") {
                                                return Promise.reject("Please enter your first and last name");
                                            }
                                            return Promise.resolve();
                                        } else if (!value || value == "") {
                                            return Promise.reject();
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input placeholder="Enter full name" />
                        </Form.Item>



                        <Form.Item
                            className="staff_item gender"
                            label="Gender"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select gender",
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="Gender Selection"
                                options={[
                                    {
                                        value: 1,
                                        label: "Male",
                                    },
                                    {
                                        value: 0,
                                        label: "Female",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <div className="row_two">
                        <Form.Item
                            className="staff_item permission"
                            label="Permission"
                            name="permission"
                            rules={[{ required: true, message: 'Please select an option!' }]}
                        >
                            <Select
                                mode="multiple"
                                tagRender={tagRender}
                                style={{
                                    width: '100%',
                                }}
                                required
                                options={options}
                                placeholder='Select permission'
                            />
                        </Form.Item>



                        <Form.Item
                            className="staff_item phone"
                            label="PhoneNumber"
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the phone number",
                                },
                                {
                                    pattern: new RegExp(/^[0-9]+$/),
                                    message: "Invalid phone number",
                                },
                                {
                                    validator: (_, value) => {
                                        if (value) {
                                            if (value.trim() == "") {
                                                return Promise.reject("Please enter your fullname");
                                            }
                                            if (value.length < 9 || value.length > 10) {
                                                return Promise.reject(
                                                    "The phone number must be 9 to 10 characters long"
                                                );
                                            } else {
                                                return value.length == 9
                                                    ? value.charAt(0) == 1 ||
                                                        value.charAt(0) == 0 ||
                                                        value.charAt(0) == 2 ||
                                                        value.charAt(0) == 4 ||
                                                        value.charAt(0) == 6
                                                        ? Promise.reject("The phone number is incorrect")
                                                        : Promise.resolve()
                                                    : value.charAt(0) != 0
                                                        ? Promise.reject("The phone number is incorrect")
                                                        : value.charAt(1) == 1 ||
                                                            value.charAt(1) == 0 ||
                                                            value.charAt(1) == 2 ||
                                                            value.charAt(1) == 4 ||
                                                            value.charAt(1) == 6
                                                            ? Promise.reject("The phone number is incorrect")
                                                            : Promise.resolve();
                                            }
                                        } else if (!value || value == "") {
                                            return Promise.reject();
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input
                                placeholder="Phone numbers start with 03,05,07,09"
                                addonBefore="+84"
                            />
                        </Form.Item>
                    </div>


                </div>

                <div className="buttonGroup">

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType="submit"
                            style={{ width: '40%', fontSize: '17px' }}
                        >
                            Update account
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type={flagBlock === 1 ? "default" : "primary"}
                            onClick={() => flagBlock === 1 ? setflagBlock(0) : setflagBlock(1)}
                            style={{ width: '40%', fontSize: '17px' }}
                            className="btn-block"

                        >
                            {flagBlock === 1 ? "Block account" : "Unblock account"}
                        </Button>
                    </Form.Item>

                    <Form.Item className="cancelBtn">
                        <Button
                            style={{ width: '40%', fontSize: '17px' }}
                            type="default" onClick={() => navigate(`/account`)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </div>
            </Form>

            <div className="picture">
                <img src={registerPic} alt="" srcset="" />
            </div>
        </div>
    );
};

export default AccountDetail;
