import React, { useState } from 'react'
import './style.scss'
import logo from '../../images/Login.png'
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { getUserThunk } from '../../redux/aciton/user';



const Login = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log(values);
        if (values) {
            dispatch(getUserThunk({ email: values?.email, password: values?.password }))
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log(err))
        }


    };

    const onFinishModal = (values) => {
        console.log(values);
        setIsModalOpen(false);

    }

    const handleForgot = () => {

    }
    return (
        <div className='login'>

            <div className="login__left">
                <img src={logo} alt="" />
                <div className='left__text-img'>
                    <h1 style={{ color: 'white', marginBottom: '15px', fontSize: '36px' }}>Welcome</h1>
                    <h2>Please log in</h2>
                </div>
            </div>

            <div className="login__right">
                <h2 className='right__title'>LOGIN</h2>
                <div className='right__form'>

                    <Form
                        name="basic"
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            className='right__form-email'
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                placeholder='Enter your email'
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            className='right__form-password'

                        >
                            <Input.Password
                                placeholder='Enter password'
                            />
                        </Form.Item>

                        <Form.Item
                            className='right__form-submit'
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                        <div className="right__form-row4">
                            <p className='right__form-forgot' href="" onClick={showModal}>Forgot Password ?</p>
                            <Modal
                                title="Forgot password"
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                centered={true}
                            >
                                <Form>
                                    <Form.Item
                                        className='right__form-email'
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        onFinish={onFinishModal}
                                    >
                                        <Input
                                            placeholder='Enter your email'
                                        />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </Form>





                </div>
            </div>
        </div>
    )
}

export default Login

