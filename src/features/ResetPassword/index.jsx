import React from 'react'
import './style.scss'
import logo from '../../images/Login.png'
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import accountApi from '../../redux/api/account'
import { toast } from "react-toastify";



const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {token} = useParams();
    
    const onFinish = async (values) => {   
        const newPassword = values.new_password;
        const repeatPassword = values.repeat_password;
        if(newPassword !== repeatPassword){
            toast.error('Password not match!', {
                position: 'top-right',
                autoClose: 3000,
                style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
            });
            return;
        }

        //* call api reset pass
        const result = await accountApi.resetPasswordService(token, newPassword);
        if(result.status === 200){
            toast.success('Reset password success!', {
                position: 'top-right',
                autoClose: 3000,
                style: { color: '#32a852', backgroundColor: '#D7F1FD' },
            });
            navigate('/')
        }else{
            toast.error('Reset password failure!', {
                position: 'top-right',
                autoClose: 3000,
                style: { color: '#bf0d0d', backgroundColor: '#D7F1FD' },
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        // return;
        console.log(errorInfo)
    };

    const handleCancel = () => { 
        navigate('/')
    }

    return (
        <div className='resetpassword'>

            <div className="resetpassword__left">
                <img src={logo} alt="" />
                <div className='left__text-img'>
                    <h1 style={{ color: 'white', marginBottom: '15px', fontSize: '36px' }}>Welcome</h1>
                    <h2>Reset your Password</h2>
                </div>
            </div>

            <div className="resetpassword__right">
                <h2 className='right__title'>Reset Password</h2>
                <div className='right__form'>
                    <Form
                        name="basic"
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="New password"
                            name="new_password"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                            className='right__form-password'

                        >
                            <Input.Password
                                placeholder='Enter new password'
                            />
                        </Form.Item>

                        <Form.Item
                            label="Repeat password"
                            name="repeat_password"
                            rules={[{ required: true, message: 'Please input again new password!' }]}
                            className='right__form-password'

                        >
                            <Input.Password
                                placeholder='Enter new password'
                            />
                        </Form.Item>

                        <Form.Item
                            className='right__form-submit'
                        >
                            <Button type="primary" htmlType="submit">
                                Complete
                            </Button>
                        </Form.Item>

                        <Form.Item
                            className='right__form-cancel'
                        >
                            <Button onClick={() => handleCancel()}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default ResetPassword

