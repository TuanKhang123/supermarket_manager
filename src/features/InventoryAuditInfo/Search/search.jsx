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
const SearchInventory = ({ handleSubmit, handleChange }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState({
    date: null,
    keyWord: null,
  });
  const [debouncedSearchTerm] = useDebounce(filterData, 300);
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  useEffect(() => {
    let sendData = filterData;
    let keyWord = form.getFieldValue("name");
    if (keyWord) {
      sendData.keyWord = keyWord;
    } else {
      sendData.keyWord = null;
    }
    handleChange(sendData);
  }, [debouncedSearchTerm]);

  const onFinish = (values) => {
    // handleSubmit({
    //   keyWord: values?.name?.trim().length > 0 ? values.name : null,
    //   position: values.position,
    // });
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
            className="searchForm-date"
            name={"date"}
            rules={[
              {
                required: false,
                message: "Vui lòng chọn thời gian kiểm hàng",
              },
            ]}
          >
            <DatePicker
              // disabledDate={(d) => !d || d.isBefore(new Date())}
              placeholder="Chọn thời gian kiểm hàng"
              onChange={(value) => {
                setFilterData((prevData) => {
                  return {
                    ...prevData,
                    date: value
                      ? moment(new Date(value)).format("YYYY-MM-DD")
                      : null,
                  };
                });
              }}
            />
          </Form.Item>
          {/* <Form.Item className="employee-searchForm-btn">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item> */}
          <Form.Item className="add-btn">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/inventory-audit-form")}
            >
              Kiểm kê thêm
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default SearchInventory;
