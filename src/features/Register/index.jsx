import React from 'react'
import './style.scss'
import logo from '../../images/Login.png'
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const handleForgot = () => {

}

const Register = () => (
    <div className='login'>

        <div className="login__left">
            <img src={logo} alt="" />
            <div className='left__text-img'>
                <h1 style={{ color: 'white', marginBottom: '15px', fontSize: '36px' }}>Welcome</h1>
                <h2>Reset your password</h2>
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
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

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
                        label="New password"
                        name="new_password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        className='right__form-password'
                    >
                        <Input.Password
                            placeholder='Enter new password'
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

                    <Form.Item
                        className='right__form-submit'
                    >
                        <Button type="primary">
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    </div>



)

export default Register

