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
import ConfirmModalAntd from "../../components/ConfirmModalAntd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Option } from "antd/es/mentions";

const InventoryAuditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sendData, setSendData] = useState();
  const stateData = location.state;
  const maxSize = 25 * 1024 * 1024; // 25MB in bytes

  const beforeUpload = async (file) => {
    if (file.size > maxSize) {
      message.error("File size must be within 25MB!");
      return false; // Prevent file from being uploaded
    }
    // if (!file.type.match(/image\/.*/)) {
    //   message.error("Only accept image!");
    //   return false; // Prevent file from being uploaded
    // }
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
      // File upload was successful
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      // File upload failed
      message.error(`${info.file.name} file upload failed.`);
    }
    const firstFile = info.fileList[0];
    let secondFile = info.fileList[1];

    if (
      secondFile &&
      // secondFile.type.match(/^image\/.*/)
      (secondFile.type.match(/^image\/.*/) || secondFile.name.endsWith(".heif"))
    ) {
      setFileList([secondFile]);
    } else if (
      firstFile &&
      // firstFile.type.match(/^image\/.*/)
      (firstFile.type.match(/^image\/.*/) || firstFile.name.endsWith(".heif"))
    ) {
      setFileList([firstFile]);
      // setFileList(info.fileList);
    }
  };

  const handleRemove = (file) => {
    // Filter out the removed file from the fileList
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
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
    // setSendData({
    //   managerId: values.managerId,
    //   pitchDTO: {
    //     name: values.name,
    //     description: values.description,
    //     typeDTO: {
    //       id: values.type,
    //     },
    //     picture: values.upload.fileList[values.upload.fileList.length - 1].name,
    //     url: values.upload.fileList[values.upload.fileList.length - 1].thumbUrl,
    //   },
    // });
    // setOpenModal(true);
  };
  return (
    <div className="audit-form_container">

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
            <div className="audit_infor">
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
                  // disabledDate={(d) => !d || d.isBefore(new Date())}
                  placeholder="Select audit time"
                  onChange={(value) => { }}
                />
              </Form.Item>
              
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
                <Input placeholder="Enter audit code" />
              </Form.Item>
              <Form.Item
                className="product_id"
                label="Audit staff"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the audit staff's name",
                  },
                ]}
              >
                <Input placeholder="Enter the audit staff's name" />
              </Form.Item>
            </div>
            <div className="audit_description">
              <Form.Item
                className="picture"
                label="Signature of audit clerk"
                name={"upload"}
                rules={[
                  {
                    required: true,
                    message: "Please select signature confirmation",
                  },
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (value.fileList.length === 0) {
                          return Promise.reject(
                            "Please select signature confirmation"
                          );
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
                  onRemove={handleRemove} // Handle file removal
                  onChange={handleUploadChange} // Handle file addition to fileList
                >
                  <Button icon={<CloudUploadOutlined />}>
                    Upload image{" "}
                    <span className="img_allowText">{`Format file .jpg, .jpeg, .png, .heif capacity <= 25MB`}</span>
                  </Button>
                </Upload>
              </Form.Item>
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
                        if (value.trim().length < 10) {
                          return Promise.reject(
                            "Please enter a minimum of 10 characters"
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
                <Input
                  rows={3}
                  placeholder="Enter note"
                />
              </Form.Item>
            </div>
          </div>

          <div className="audit_item_check">
            <Form.List
              name="auditItem"
              initialValue={[{ methodCourse: undefined, feeCourse: undefined }]}
            >
              {(fields, { add, remove }) => {
                if (fields.length == 0) {
                  add();
                }
                return (
                  <>
                    {fields?.length > 0 &&
                      fields.map((field, index) => (
                        <Space
                          className="audit_item_container"
                          key={field.key}
                          style={{
                            display: "flex",
                            // marginBottom: 17,
                            gap: "15px",
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            {...field}
                            className="item"
                            label="Sản phẩm"
                            name={[field.name, "item"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn sản phẩm",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Select a person"
                              optionFilterProp="children"
                              onChange={onChange}
                              onSearch={onSearch}
                              filterOption={filterOption}
                              options={[
                                {
                                  value: 'jack',
                                  label: 'Jack',
                                },
                                {
                                  value: 'lucy',
                                  label: 'Lucy',
                                },
                                {
                                  value: 'tom',
                                  label: 'Tom',
                                },
                              ]}
                            />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            className="quantity"
                            label="Số lượng"
                            name={[field.name, "quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số lượng",
                              },

                              {
                                validator: (_, value) => {
                                  if (value != undefined && value != null) {
                                    if (value == 0) {
                                      return Promise.reject(
                                        "Vui lòng nhập số lượng"
                                      );
                                    }
                                  } else {
                                    return Promise.resolve(); // Resolve if the value is valid
                                  }
                                  return Promise.resolve(); // Resolve if the value is valid
                                },
                              },
                            ]}
                          >
                            <InputNumber
                              min={1}
                              onKeyDown={(event) => {
                                if (
                                  !(
                                    /[0-9]/.test(event.key) ||
                                    event.key === "Backspace" ||
                                    event.key === "Delete" ||
                                    event.key.startsWith("Arrow")
                                  )
                                ) {
                                  event.preventDefault();
                                }
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            // className="course_item method"
                            label="Tình trạng"
                            name={[field.name, "currentStatus"]}
                            className="status"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn trình trạng mặt hàng",
                              },
                            ]}
                          >
                            <Select allowClear options={null}></Select>
                          </Form.Item>
                          {index >= 0 && (
                            <DeleteOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          )}
                        </Space>
                      ))}
                    <Form.Item
                      style={{
                        margin: "50px auto",
                        width: "180px",
                      }}
                    >
                      <Button
                        type="dashed"
                        onClick={() => add()} // Make sure 'add' is a valid function
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm hàng
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
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
            <Button
              type="button"
              onClick={() => navigate(`/inventory-audit-info`)}
            >
              Huỷ
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
  );
};

export default InventoryAuditForm;
