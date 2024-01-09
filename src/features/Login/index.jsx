import React, { useState } from 'react'
import './style.scss'
import logo from '../../images/Login.png'
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/aciton/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import accountApi from '../../redux/api/account'

const Login = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };
    
    const onFinishModal = async (values) => {
        const email = values.email;
        const result = await accountApi.forgotPasswordService(email);
        if(result.status === 200){
            toast.success('Reset password send to mail!', {
                position: 'top-right',
                autoClose: 3000,
                style: { color: '#32a852', backgroundColor: '#D7F1FD' },
            });
            setIsModalOpen(false);
        }else{
            toast.error('Reset password failure!', {
                position: 'top-right',
                autoClose: 3000,
                style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
            });
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        if (values) {
            dispatch(loginThunk({ email: values?.email, password: values?.password }))
                .then((res) => {
                    if (res?.payload?.data) {
                        localStorage.setItem('accessToken', res?.payload?.accessToken);
                        toast.success('Login successfully', {
                            position: 'top-right',
                            autoClose: 3000,
                            style: { color: '#32a852', backgroundColor: '#D7F1FD' },
                        });
                        navigate('/')
                    }
                    else {
                        toast.error('Login fail', {
                            position: 'top-right',
                            autoClose: 3000,
                            style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
                        });
                    }
                })
                .catch(err => console.log(err))
        }


    };

    return (
        <div className="wrapper-login">
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
                                rules={[
                                    { required: true, message: 'Please input your username!' },
                                    { type: 'email', message: 'The input is not a valid email!' }
                                ]}
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
                                    <Form
                                        onFinish={onFinishModal}
                                        form={form}
                                    >
                                        <Form.Item
                                            className='right__form-email'
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
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
        </div>
    )
}

export default Login

