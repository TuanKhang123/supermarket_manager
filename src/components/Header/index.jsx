import '../Header/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Popconfirm } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { logout } from '../../redux/slice/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const { userCurrent } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onConfirm = () => {
        dispatch(logout());
        navigate("/");
        toast.success('Logout successfully')
    }

    return (
        <div className='header'>
            <div className="header__username">{userCurrent?.name}</div>

            <Popconfirm
                title="Logout"
                description="Do you want to logout?"
                onConfirm={onConfirm}
                okText="Yes"
                cancelText="No">
                <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: "#87d068", border: "1px solid #999", zIndex: '2' }} />
            </Popconfirm>
        </div>
    )
}

export default Header;