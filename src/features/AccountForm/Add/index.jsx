import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import { createAccountThunk } from "../../../redux/aciton/account";

const AccountForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const stateData = location.state;

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const color = options.find(option => option.value === value)?.color;

    return (
      <Tag color={color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  };

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
      color: 'red',
      value: 'hasStatistic',
      label: 'Statistic'
    },
    {
      color: 'yellow',
      value: 'hasCategory',
      label: 'Category'
    },
   
  ];

  const generatePassword = (length) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    // Tạo ít nhất một ký tự hoa
    const randomUppercaseIndex = Math.floor(Math.random() * 26);
    password += charset[randomUppercaseIndex];

    // Tạo ít nhất một số
    const randomNumberIndex = Math.floor(Math.random() * 10) + 52;
    password += charset[randomNumberIndex];

    // Tạo các ký tự còn lại cho mật khẩu
    for (let i = 2; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    // Trộn ngẫu nhiên chuỗi mật khẩu
    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    return password;
  };
  let fakePw = {
    password: "",
    confirm: "",
  };
  const handleGeneratePassword = () => {
    const temp = generatePassword(10);
    fakePw.password = temp;
    fakePw.confirm = temp;
    form.setFieldsValue({
      password: temp,
      confirm: temp,
    });
  };
  const handleModalCancel = (cancelled) => {
    if (cancelled) {
      // Handle cancellation here or set state based on the cancellation flag
      // console.log("Modal was cancelled");
    }
  };
  

  const onFinish = (values) => {

    const dataSend = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      gender: values.gender,
      phone: values.phoneNumber,
    };
    values?.permission.forEach(e => {
      dataSend[e] = true;
    });
    console.log(dataSend);
    dispatch(createAccountThunk(dataSend))
    .catch(err => console.log(err))  
    .then(res => {
      console.log(res);
        if (res?.payload?.statusCode === "CREATED") {
          toast.success('Register successfully', {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#32a852', backgroundColor: '#D7F1FD' },
          });
          navigate('/account')
        }
        else {
          toast.error(res?.payload?.response?.data?.message, {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
          });
        }
      })
      
  };


  return (
    <div className="account-form_container">
      <h4>Register</h4>

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
          <div className="name_permiss">
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

          <div className="position_email">

            <Form.Item
              className="staff_item email"
              label="Email address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email address",
                },
                {
                  type: "email",
                  message: "Email address is not valid",
                },
                {
                  validator: (_, value) => {
                    if (value && value.length <= 256 && value.trim() != "") {
                      return Promise.resolve();
                    } else {
                      if (value && value.length > 256) {
                        return Promise.reject("Please enter up to 256 characters");
                      }
                      if (!value || value == "") {
                        return Promise.reject();
                      }
                      if (value.trim() == "") {
                        return Promise.reject("Please enter your fullname");
                      }
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              className="staff_item password"
              name="password"
              label='Password'
              rules={[
                {
                  required: true,
                  message: "Please enter a password!",
                },
                {
                  pattern: new RegExp(/^(?=.*[A-Z])(?=.*[0-9]).*$/),
                  message: "Please enter at least 1 capital letter and 1 number",
                },
                {
                  validator: (_, value) => {
                    if (value) {
                      if (value.trim() === "") {
                        return Promise.reject("Password cannot be left blank");
                      }
                      if (value.length < 6 || value.length > 32) {
                        return Promise.reject(
                          "Password must be between 6 and 32 characters long"
                        );
                      }
                    }
                    return Promise.resolve(); // Resolve if the value is valid
                  },
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Enter password"
              />
            </Form.Item>
          </div>

          <div className="phone_pw">
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
            <Form.Item
              name="confirm"
              label="Repeat Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Enter password"
              />
            </Form.Item>

          </div>

          <div className="gender_confirmpw">

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
                placeholder="Select permission"
                // defaultValue={['red']}
                required
                options={options}
              />
            </Form.Item>
          </div>
        </div>

        <div className="buttonGroup">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '40%', fontSize: '17px' }}
            >
              Create account
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

        {/* <ConfirmModalAntd
          onCancel={handleModalCancel}
          onOk={() => handleOkModal(sendData)}
          header={`Complete adding accounts`}
          title={`Do you want to add an account?`}
        ></ConfirmModalAntd> */}
      </Form>

      <div className="picture">
        <img src={registerPic} alt="" srcset="" />
      </div>
    </div>
  );
};

export default AccountForm;
