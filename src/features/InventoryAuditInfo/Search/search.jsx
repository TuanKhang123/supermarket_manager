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
const { RangePicker } = DatePicker;

const SearchInventory = ({ handleSubmit, handleChange }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState({
    date: null,
    keyWord: null,
  });
  const [debouncedSearchTerm] = useDebounce(filterData, 300);
  const dispatch = useDispatch();

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

  const onDateChange = (dates, dateStrings) => {
    setFilterData((prevData) => {
      return {
        ...prevData,
        date: dates ? [dateStrings[0], dateStrings[1]] : null,
      };
    });
  };

  const onFinish = (values) => {
    console.log(values);
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
          <div style={{ display: 'flex', width: '70%', gap: '15px' }}>
            <Form.Item name="name" className="searchForm-input">
              <Input
                prefix={<SearchOutlined className="site-form-item-icon" />}
                placeholder="Search by inventory code, product name, ..."
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
                  message: "Please choose a check-in time",
                },
              ]}
            >
              <RangePicker
                placeholder={["Import date start", "Import date end"]}
                onChange={onDateChange}
              />
            </Form.Item>
          </div>

          {/* <Form.Item className="employee-searchForm-btn">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/inventory-audit-form")}
            >
              Add Audit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default SearchInventory;
