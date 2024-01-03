import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.scss";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "../../../components/ConfirmModalAntd";
import { toast } from "react-toastify";
import { Form, Input, Modal } from "antd";
import { deleteCategoryThunk, getAllCategoryThunk, updateCategoryThunk } from "../../../redux/aciton/category";

const CategoryTableAction = ({ data, flagDelete }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalUpdateCate, setModalUpdateCate] = useState(false);
  const [updateCategoryForm] = Form.useForm();

  const handleOpenModal = () => {

    if (data?.productQnt > 0)
      toast.warn("Cann't delete category", {
        position: 'top-right',
        autoClose: 3000,
        style: { backgroundColor: '#D7F1FD' },
      });
    else {
      setOpenModal(!openModal);
    }
  };
  const handleModalCancel = (cancelled) => {
    setOpenModal(false);
  };
  const handleEditClick = () => {
    console.log(data);
    updateCategoryForm.setFieldsValue({
      category: data.name, // Giả sử 'categoryName' là trường dữ liệu bạn muốn hiển thị
    });
    setModalUpdateCate(!modalUpdateCate)
  };


  const handleOk = () => {
    console.log(data);

    dispatch(deleteCategoryThunk({ id: data?.categoryId }))
      .then((res) => {
        if (res?.payload?.statusCode === "OK") {
          toast.success("Delete category successfully", {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#32a852', backgroundColor: '#D7F1FD' },
          });
          dispatch(getAllCategoryThunk())
          flagDelete()
        } else {
          toast.error('Delete category fail', {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
          });
        }
      })
  };

  const handleOkCate = () => {
    updateCategoryForm.submit();
  }

  const handleCancel = () => {
    setModalUpdateCate(false)
    updateCategoryForm.resetFields()
  }

  const onFinishModalUpdate = (values) => {
    dispatch(updateCategoryThunk({ id: data?.categoryId, name: values?.category }))
      .then(res => {
        if (res?.payload?.statusCode === "OK") {
          toast.success("Update category successfully", {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#32a852', backgroundColor: '#D7F1FD' },
          });
        } else {
          toast.error('Update category fail', {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
          });
        }
        dispatch(getAllCategoryThunk())
        setModalUpdateCate(!modalUpdateCate)
      })

    // console.log(values);
    // setIsModalOpen(false);

  }

  return (
    <div className="action_cover">
      <div className="action_item">
        <EditOutlined />
        <a
          onClick={handleEditClick}
        >
          Edit detail
        </a>
      </div>
      <div className="action_item" onClick={() => handleOpenModal()}>
        <DeleteFilled />
        <a>Delete</a>
      </div>

      <Modal
        title="Update category"
        className="modal-addcate"
        style={{ fontSize: '30px' }}
        open={modalUpdateCate}
        onOk={handleOkCate}
        onCancel={() => handleCancel()}
        centered={true}
        okText="Update"
      >
        <hr style={{ borderTop: '2px solid blue', width: '100%', position: 'absolute', left: '0', marginBottom: '10px' }} />
        <Form
          form={updateCategoryForm}
          onFinish={onFinishModalUpdate}

        >
          <Form.Item
            label="Name category"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input name category!',
              },
            ]}
          >
            <Input placeholder='Enter name category' />
          </Form.Item>

        </Form>
      </Modal>

      <ConfirmModalAntd
        open={openModal}
        onCancel={handleModalCancel}
        onOk={handleOk}
        header={"Delete category information"}
        title={"Do you want to delete this category?"}
        content={""}
      ></ConfirmModalAntd>
    </div>
  );
};

export default CategoryTableAction;
