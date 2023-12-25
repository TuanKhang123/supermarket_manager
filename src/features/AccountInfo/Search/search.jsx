import {
  Select,
  Input,
  Form,
  DatePicker,
  Dropdown,
  Space,
  Button,
  Rate,
} from "antd";
import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  FilterOutlined,
  HddFilled,
  UserOutlined,
  PlusOutlined,
  CalendarOutlined,
  DownOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useDebounce } from "use-debounce";
import { useDebouncedCallback } from "use-debounce";
import { useThrottledCallback } from "use-debounce";
const SearchAccount = ({ handleSubmit, handleChange }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState({
    status: null,
    position: null,
    keyWord: null,
  });
  const [debouncedSearchTerm] = useDebounce(filterData, 300);
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  useEffect(() => {
    let sendData = filterData;
    sendData.keyWord = form.getFieldValue("name")
      ? form.getFieldValue("name")
      : null;
    sendData.position = form.getFieldValue("position")
      ? form.getFieldValue("position")
      : null;
    sendData.status = form.getFieldValue("status")
      ? form.getFieldValue("status")
      : null;

    handleChange(sendData);
  }, [debouncedSearchTerm]);

  const onFinish = (values) => {
    handleSubmit({
      keyWord: values?.name?.trim().length > 0 ? values.name : null,
      position: values.position ? values.position : null,
      status: values.status ? values.status : null,
    });
  };
  return (
    <>
      <Form
        name="normal_search"
        className="searchForm"
        onFinish={onFinish}
        form={form}
      >
        <div className="search-container">
          <Form.Item name="name" className="searchForm-input">
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Tìm kiếm "
              allowClear
              onChange={(e) =>
                setFilterData((preData) => {
                  return {
                    ...preData,
                    keyWord: e?.target?.value?.trim(),
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            className="searchForm-select"
            // label="Sản phẩm"
            name={"status"}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              allowClear
              options={null}
              placeholder={"Lọc trạng thái"}
              onChange={(e) =>
                setFilterData((preData) => {
                  return {
                    ...preData,
                    status: e?.target?.value,
                  };
                })
              }
            ></Select>
          </Form.Item>
          <Form.Item
            className="searchForm-select"
            // label="Sản phẩm"
            name={"position"}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              allowClear
              options={null}
              placeholder={"Lọc vị trí"}
              onChange={(e) =>
                setFilterData((preData) => {
                  return {
                    ...preData,
                    position: e?.target?.value,
                  };
                })
              }
            ></Select>
          </Form.Item>
          <Form.Item className="search-btn">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
          <Form.Item className="add-btn">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/account/form")}
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default SearchAccount;
