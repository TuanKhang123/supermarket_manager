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
    getItem('Inventory Management', '2', <MdOutlineInventory />),
    getItem('Shelf Management', '3', <MdShelves />),
    getItem('Inventory Audit', '4', <AiOutlineAudit />),
    getItem('Inventory Statistics', '5', <PieChartOutlined />),
    getItem('Supplier Management ', '6', <MdManageAccounts />),
];
const SideBar = () => {
    const onClick = (e) => {
        console.log('click ', e);
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