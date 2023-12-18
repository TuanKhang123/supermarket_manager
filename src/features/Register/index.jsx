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

const Login = () => (
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
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        className='right__form-phonenumber'
                        label="Phone number"
                        name="phonenumber"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder='Enter phone number'
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

                    <div className="right__form-row3">

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ offset: 0, span: 24 }}
                            className='right__form-saveLogin'
                        >
                            <Checkbox>Save login session</Checkbox>
                        </Form.Item>

                        <p className='right__form-forgot' href="" onClick={() => handleForgot()}>Forgot Password ?</p>
                    </div>

                    <Form.Item
                        className='right__form-submit'
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    </div>



)

export default Login

