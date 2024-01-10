import React, { useEffect, useState } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk } from '../../redux/aciton/user';

const SideBar = () => {
    const { userCurrent } = useSelector(state => state.user)
    const location = useLocation();
    const pathName = location.pathname;
    const dispatch = useDispatch()
    const [defaultKey, setdDefaultKey] = useState('1')

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }



    useEffect(() => {
        if (pathName) {
            switch (pathName) {
                case '/':
                    setdDefaultKey('1')
                    break;
                case '/account':
                    setdDefaultKey('2')
                    break;
                case '/inventory':
                    setdDefaultKey('3')
                    break;
                case '/shelf':
                    setdDefaultKey('4')
                    break;
                case '/inventory-audit-info':
                    setdDefaultKey('5')
                    break;
                case '/category':
                    setdDefaultKey('6')
                    break;
                case '/provider':
                    setdDefaultKey('7')
                    break;
                default:
                    break;
            }
        }
    }, [pathName])
    const items = [
        userCurrent?.hasStatistic && getItem('Home Page', '1', <HomeOutlined />),
        userCurrent?.role === "ADMIN" && getItem('Accounts Management', '2', <MdAccountCircle />),
        userCurrent?.hasWarehouse && getItem('Warehouse Management', '3', <MdOutlineInventory />),
        userCurrent?.hasShelf && getItem('Shelf Management', '4', <MdShelves />),
        userCurrent?.hasAudit && getItem('Inventory Audit', '5', <AiOutlineAudit />),
        userCurrent?.hasCategory && getItem('Category Management', '6', <PieChartOutlined />),
        userCurrent?.hasSupply && getItem('Supplier Management ', '7', <MdManageAccounts />),
    ];

    const navigate = useNavigate()

    const onClick = (e) => {
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
                navigate('/category')
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
            defaultSelectedKeys={[defaultKey]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            className='sidebar'
        />
    );
};
export default SideBar;