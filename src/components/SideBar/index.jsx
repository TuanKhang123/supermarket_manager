import React from 'react';
import '../SideBar/style.scss'
import {
    PieChartOutlined,
    HomeOutlined,

} from '@ant-design/icons';

import { MdOutlineInventory } from "react-icons/md";
import { MdShelves } from "react-icons/md";
import { Menu } from 'antd';
import { AiOutlineAudit } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Home Page', '1', <HomeOutlined />),
    getItem('Accounts Management', '2', <MdAccountCircle />),
    getItem('Inventory Management', '3', <MdOutlineInventory />),
    getItem('Shelf Management', '4', <MdShelves />),
    getItem('Inventory Audit', '5', <AiOutlineAudit />),
    getItem('Category Management', '6', <PieChartOutlined />),
    getItem('Supplier Management ', '7', <MdManageAccounts />),
];
const SideBar = () => {

    const navigate = useNavigate()

    const onClick = (e) => {
        console.log('click ', e);
        switch (e?.key) {
            case '1':
                navigate('/')
                break;
            case '2':
                navigate('/account')
                break;
            case '3':
                navigate('/inventory')
                break;
            case '4':
                navigate('/shelf')
                break;
            case '5':
                navigate('/inventory-audit-info')
                break;
            case '6':
                navigate()
                break;
            case '7':
                navigate('/provider')
                break;

            default:
                break;
        }
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            className='sidebar'
        />
    );
};
export default SideBar;