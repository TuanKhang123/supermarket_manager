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
import "./style.scss";

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
  const options = [
    {
      value: 1,
      label: 'Block',
    },
    {
      value: 2,
      label: 'Active',
    }
    
  ]
  useEffect(() => { }, []);
  useEffect(() => {
    let sendData = filterData;
    sendData.keyWord = form.getFieldValue("name")
      ? form.getFieldValue("name")
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
          <div style={{ display: 'flex', gap: '15px', width: '50%' }}>
            <Form.Item name="name" className="searchForm-input">
              <Input
                prefix={<SearchOutlined className="site-form-item-icon" />}
                placeholder="Search by username"
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
                options={options}
                placeholder={"Filter status"}
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
          </div>

          <Form.Item className="add-btn">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/account/form")}
            >
              Create account
            </Button>
          </Form.Item>

        </div>
      </Form>
    </>
  );
};

export default SearchAccount;
