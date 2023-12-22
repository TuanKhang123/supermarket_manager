import React, { useEffect, useState } from 'react'
import './style.scss'
import { Button, Select } from 'antd';
import SideBar from '../../components/SideBar';
import { useSelector } from 'react-redux';
import { HiUserGroup } from "react-icons/hi2";
import { IoDocumentText } from "react-icons/io5";
import { BsBuildingFillAdd } from "react-icons/bs";
const Home = () => {

    const { accessToken } = useSelector(state => state.user)

    const [listMonth, setListMonth] = useState([])
    const [listYear, setListYear] = useState([])
    const [chooseMonth, setChooseMonth] = useState()
    const [chooseYear, setChooseYear] = useState()


    const handleMonth = (value, option) => {
        setChooseMonth(option?.children);
    }

    const handleYear = (value, option) => {
        setChooseYear(option?.children);
    }
    const { Option } = Select;


    const getYear = () => {
        const temp = new Date();
        const yearcurr = temp.getFullYear();
        var tempYear = []
        for (var i = yearcurr; i >= 2000; i--) {
            tempYear.push(i);
        }
        setListYear(tempYear)
    }

    const getMonth = () => {
        var tempmonth = []
        for (var i = 1; i <= 12; i++) {
            tempmonth.push(i);
        }
        setListMonth(tempmonth)
    }

    useEffect(() => {
        const temp = new Date();
        setChooseMonth(temp.getMonth() + 1)
        setChooseYear(temp.getFullYear())
        getYear()
        getMonth()
    }, [])

    return (
        <>
            <div className='home'>
                <div className="row-one">
                    <div className="container-total">


                        <HiUserGroup className='total-icon' />

                        <div className="total-quantity">
                            <p className='total-quantity-number'>365</p>
                            <p className='total-quantity-name'>Users</p>
                        </div>
                    </div>

                    <div className="container-total">
                        <IoDocumentText className='total-icon' />

                        <div className="total-quantity">
                            <p className='total-quantity-number'>2,858</p>
                            <p className='total-quantity-name'>Inventory management</p>
                        </div>
                    </div>

                    <div className="container-total">
                        <BsBuildingFillAdd className='total-icon' />

                        <div className="total-quantity">
                            <p className='total-quantity-number'>502</p>
                            <p className='total-quantity-name'>Supplier</p>
                        </div>
                    </div>
                </div>

                <div className="row-two">
                    <div className="invent-statistics">

                        <div className="statistics-title">
                            <p className='statistics-text'>Inventory statistics</p>

                            <div className="statistic-control">
                                <Select
                                    placeholder="Month"
                                    onChange={(value, option) => handleMonth(value, option)}
                                    allowClear
                                    className='control-month'
                                    value={chooseMonth}
                                >
                                    {listMonth
                                        ? listMonth.map((item, i) => {
                                            return (
                                                <Option
                                                    key={i}
                                                >
                                                    {item}
                                                </Option>
                                            )
                                        })
                                        : null}

                                </Select>

                                <Select
                                    placeholder="Year"
                                    onChange={(value, option) => handleYear(value, option)}
                                    allowClear
                                    className='control-year'
                                    value={chooseYear}
                                >
                                    {listYear
                                        ? listYear.map((item, i) => {
                                            return (
                                                <Option
                                                    key={i}
                                                >
                                                    {item}
                                                </Option>
                                            )
                                        })
                                        : null}

                                </Select>
                            </div>
                        </div>

                        <div className="statistics-pie">
                            {/* {
                                cateRenevue?.length >= 1
                                    ? <Pie {...configCate} />
                                    : <Empty className='empty-month' />
                            } */}
                        </div>
                    </div>

                    <div className="suppliers-list">
                        <div className="supplier-list__title">
                            Suppliers list
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home