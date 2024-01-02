import {
  Select,
  Input,
  Form,
  DatePicker,
  Dropdown,
  Space,
  Button,
  Rate,
  Modal,
  InputNumber,
} from "antd";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  SearchOutlined,
  FilterOutlined,
  HddFilled,
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
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
import { createCategoryThunk, getAllCategoryThunk } from "../../../redux/aciton/category";

const SearchAuditForm = ({ handleSubmit, handleChange }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [addCategoryForm] = Form.useForm();
  const [modalAddCate, setModalAddCate] = useState(false);
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

  const handleOkCate = () => {
    addCategoryForm.submit();
  }

  const handleCancel = () => {
    setModalAddCate(!modalAddCate)
    addCategoryForm.resetFields()
    addCategoryForm.setFieldsValue({ cateItem: [{}] });
  }

  const handleAddCate = () => {
    setModalAddCate(!modalAddCate)
    addCategoryForm.setFieldsValue({ cateItem: [{}] });

  }

  const onFinishModal = async (values) => {
    if (values?.cateItem) {

      const promises = values?.cateItem.map(e =>
        dispatch(createCategoryThunk({ name: e?.categoryName }))
          .then((res) => {
            if (res?.payload?.statusCode === "CREATED") {
              toast.success("Create category successfully", {
                position: 'top-right',
                autoClose: 3000,
                style: { color: '#32a852', backgroundColor: '#D7F1FD' },
              });
            }
            else {
              toast.error('Create category fail', {
                position: 'top-right',
                autoClose: 3000,
                style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
              });
            }
          })
      );
      Promise.all(promises)
        .then(() => {
          dispatch(getAllCategoryThunk())
          setModalAddCate(!modalAddCate);
        })
    }


  }

  const onFinish = (values) => {
    handleSubmit({
      keyWord: values?.name?.trim().length > 0 ? values.name : null,
      position: values.position ? values.position : null,
      status: values.status ? values.status : null,
    });
  };
  return (
    <div className="filter-category">
      <Form
        name="normal_search"
        className="searchForm"
        onFinish={onFinish}
        form={form}
      >
        <div className="search-container">
          <div style={{ gap: '15px', width: '30%' }}>
            <Form.Item name="name" className="searchForm-input">
              <Input
                prefix={<SearchOutlined className="site-form-item-icon" />}
                placeholder="Search Product by name, category,..."
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
          </div>

        </div>
      </Form>

      <Modal
        title="Add category"
        className="modal-addcate"
        style={{ fontSize: '30px' }}
        open={modalAddCate}
        onOk={handleOkCate}
        onCancel={() => handleCancel()}
        centered={true}
        okText="Add"
      >
        <hr style={{ borderTop: '2px solid blue', width: '100%', position: 'absolute', left: '0' }} />
        <Form
          form={addCategoryForm}
          onFinish={onFinishModal}
        >
          <Form.List
            name="cateItem"
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
                        style={{ display: "flex", gap: "15px", alignItems: 'center' }}
                        align="baseline"
                      >
                        <Form.Item
                          {...field}
                          label="Name category"
                          name={[field.name, "categoryName"]}
                          className="name_cate"
                          rules={[
                            {
                              required: true,
                              message: "Please enter name category",
                            },
                          ]}
                        >
                          <Input
                            placeholder='Enter name category'
                          />
                        </Form.Item>
                        {index >= 0 && (
                          <DeleteOutlined
                            className="detele-addcate"
                            onClick={() => { remove(field.name); }}
                          />
                        )}
                      </Space>
                    ))}
                  <Form.Item style={{ width: "150px" }}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add more cate
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>

        </Form>
      </Modal>
    </div>
  );
};

export default SearchAuditForm;
