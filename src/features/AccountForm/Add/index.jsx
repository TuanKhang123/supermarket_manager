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
import ReactQuill from "react-quill";z
import "react-quill/dist/quill.snow.css";
import { Option } from "antd/es/mentions";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import registerPic from "../../../images/register.png";

const AccountForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sendData, setSendData] = useState();
  const stateData = location.state;

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
    setOpenModal(false);
  };
  const handleOkModal = (value) => {
    // value &&
    //   dispatch(createProductThunk(value)).then((res) => {
    //     if (res?.payload?.message === "successfully") {
    //       toast.success("Thêm sân bóng thành công", {
    //         position: "top-right",
    //         autoClose: 3000,
    //         style: { color: "green", backgroundColor: "#D7F1FD" },
    //       });
    //       navigate("/manage/pitch");
    //     } else {
    //       toast.error("Thêm sân bóng thất bại", {
    //         position: "top-right",
    //         autoClose: 3000,
    //         style: { color: "red", backgroundColor: "#D7F1FD" },
    //       });
    //     }
    //   });
  };
  const onFinish = (values) => {
    setSendData({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      gender: values.gender,
      phone: values.phoneNumber,

      position: values.position,
    });
    setOpenModal(true);
  };
  return (
    <div className="account-form_container">
      <h4>Biểu mẫu tạo tài khoản</h4>

      <Form
        name="dynamic_form_nest_item"
        form={form}
        onFinish={onFinish}
        style={{
          maxWidth: "100%",
        }}
        autoComplete="off"
        onFieldsChange={(changeField, allFields) => {}}
      >
        <div className="form_content">
          <Form.Item
            className="staff_item name"
            label="Họ và tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
              },
              {
                pattern: new RegExp(
                  /^[A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+( [A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+)*$/
                ),
                message: "Họ tên không hợp lệ",
              },
              {
                validator: (_, value) => {
                  if (value) {
                    if (value.length < 2 || value.length > 64) {
                      return Promise.reject(
                        "Họ và tên phải có độ dài từ 2 đến 64 ký tự"
                      );
                    }
                    if (value.trim() == "") {
                      return Promise.reject("Vui lòng nhập họ và tên");
                    }
                    return Promise.resolve();
                  } else if (!value || value == "") {
                    return Promise.reject();
                  }
                },
              },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <div className="position_email">
            <Form.Item
              className="staff_item type"
              label="Vị trí"
              name="position"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vị trí",
                },
              ]}
            >
              <Select
                allowClear
                placeholder="Lựa chọn vị trí"
                options={[
                  {
                    value: "Intern",
                    label: "Intern",
                  },
                  {
                    value: "Fresher",
                    label: "Fresher ",
                  },
                  {
                    value: "Probation",
                    label: "Probation",
                  },
                  {
                    value: "Official",
                    label: "Official",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              className="staff_item email"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ email",
                },
                {
                  type: "email",
                  message: "Địa chỉ email không hợp lệ",
                },
                {
                  validator: (_, value) => {
                    if (value && value.length <= 256 && value.trim() != "") {
                      return Promise.resolve();
                    } else {
                      if (value && value.length > 256) {
                        return Promise.reject("Vui lòng nhập tối đa 256 ký tự");
                      }
                      if (!value || value == "") {
                        return Promise.reject();
                      }
                      if (value.trim() == "") {
                        return Promise.reject("Vui lòng nhập họ và tên");
                      }
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Nhập email nhân viên" />
            </Form.Item>
          </div>
          <div className="phone_pw">
            <Form.Item
              className="staff_item phone"
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: "Số điện thoại không hợp lệ",
                },
                {
                  validator: (_, value) => {
                    if (value) {
                      if (value.trim() == "") {
                        return Promise.reject("Vui lòng nhập họ và tên");
                      }
                      if (value.length < 9 || value.length > 10) {
                        return Promise.reject(
                          "Số điện thoại phải có độ dài từ 9 đến 10 ký tự"
                        );
                      } else {
                        return value.length == 9
                          ? value.charAt(0) == 1 ||
                            value.charAt(0) == 0 ||
                            value.charAt(0) == 2 ||
                            value.charAt(0) == 4 ||
                            value.charAt(0) == 6
                            ? Promise.reject("Đầu số điện thoại không đúng")
                            : Promise.resolve()
                          : value.charAt(0) != 0
                          ? Promise.reject("Đầu số điện thoại không đúng")
                          : value.charAt(1) == 1 ||
                            value.charAt(1) == 0 ||
                            value.charAt(1) == 2 ||
                            value.charAt(1) == 4 ||
                            value.charAt(1) == 6
                          ? Promise.reject("Đầu số điện thoại không đúng")
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
                placeholder="Số điện thoại bắt đầu với đầu số 03,05,07,09"
                addonBefore="+84"
              />
            </Form.Item>

            <Form.Item
              className="staff_item password"
              name="password"
              label={
                <>
                  <p>Mật khẩu</p>{" "}
                  <a onClick={() => handleGeneratePassword()}>Tạo mật khẩu</a>
                </>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  pattern: new RegExp(/^(?=.*[A-Z])(?=.*[0-9]).*$/),
                  message: "Vui lòng nhập ít nhất 1 chữ in hoa và 1 chữ số",
                },
                {
                  validator: (_, value) => {
                    if (value) {
                      if (value.trim() === "") {
                        return Promise.reject("Mật khẩu không được bỏ trống");
                      }
                      if (value.length < 6 || value.length > 32) {
                        return Promise.reject(
                          "Mật khẩu phải có độ dài từ 6 đến 32 ký tự"
                        );
                      }
                    }
                    return Promise.resolve(); // Resolve if the value is valid
                  },
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div className="gender_confirmpw">
            <Form.Item
              className="staff_item gender"
              label="Giới tính"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính",
                },
              ]}
            >
              <Select
                allowClear
                placeholder="Lựa chọn giới tính"
                options={[
                  {
                    value: 1,
                    label: "Nam",
                  },
                  {
                    value: 0,
                    label: "Nữ",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Nhập lại mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
        </div>

        <div className="buttonGroup">
          <Form.Item className="checkBtn" name="continue">
            <Checkbox
              onChange={(e) => form.setFieldValue("continue", e.target.checked)}
            >
              Tiếp tục thêm ?
            </Checkbox>
          </Form.Item>
          <Form.Item className="submitBtn finish">
            <Button
              type="submit"
              htmlType="submit"
              // onClick={() => !hadErrors && setOpenModal(true)}
            >
              Hoàn thành
            </Button>
          </Form.Item>

          <Form.Item className="cancelBtn">
            <Button type="button" onClick={() => navigate(`/account`)}>
              Huỷ
            </Button>
          </Form.Item>
        </div>

        <ConfirmModalAntd
          open={openModal}
          onCancel={handleModalCancel}
          onOk={() => handleOkModal(sendData)}
          header={`Hoàn thành thêm tài khoản`}
          title={`Bạn có muốn thêm tài khoản ?`}
        ></ConfirmModalAntd>
      </Form>

      <div className="picture">
        <img src={registerPic} alt="" srcset="" />
      </div>
    </div>
  );
};

export default AccountForm;
