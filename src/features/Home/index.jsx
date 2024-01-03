import React, { useEffect, useState } from 'react'
import './style.scss'
import { Button, ConfigProvider, Select, Table } from 'antd';
import SideBar from '../../components/SideBar';
import { useSelector } from 'react-redux';
import { HiUserGroup } from "react-icons/hi2";
import { IoDocumentText } from "react-icons/io5";
import { BsBuildingFillAdd } from "react-icons/bs";
import { Column, Pie } from '@ant-design/plots';
import { internshipTransport } from '../../config/http/transport';
const Home = () => {

    const { accessToken } = useSelector(state => state.user)
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 4;
    const [listMonth, setListMonth] = useState([])
    const [listYear, setListYear] = useState([])
    const [chooseMonth, setChooseMonth] = useState()
    const [chooseYear, setChooseYear] = useState()

    console.log(chooseMonth);
    console.log(chooseYear);

    const handlePageChange = (page) => {
        if (page != currentPage)
            setCurrentPage(page?.current);
    };

    const configIncome = {
        data: [
            { month: '1', money: 27 },
            { month: '2', money: 50 },
            { month: '3', money: 86 },
            { month: '4', money: 10 },
            { month: '5', money: 20 },
            { month: '6', money: 44 },
            { month: '7', money: 23 },
            { month: '8', money: 14 },
            { month: '9', money: 21 },
            { month: '10', money: 93 },
            { month: '11', money: 22 },
            { month: '12', money: 9 },
        ],
        xField: 'month',
        yField: 'money',
        scrollbar: {
            x: {
                ratio: 1,
            },
        },
    };

    const configStatistics = {
        data: [
            { type: 'in shelf', value: 41.667 },
            { type: 'on stock   ', value: 50 },
            { type: 'Sold', value: 8.333 },
        ],
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        innerRadius: 0.6,
        label: {
            text: ({ type, value }) => {
                return `${parseInt(value)}%`;
            },
            fill: '#fff',
            fontSize: 15,
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },

        // legend: {
        //     position: 'right',
        //     itemHeight: 20,
        //     flipPage: false,
        //     text: {
        //         style: {
        //             fontSize: '14px',
        //         },
        //     },
        // },
    };

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

    const dataSupplier = [
        {
            companyName: 'abc',
            total: '4000'
        },
        {
            companyName: 'R4S',
            total: '123'
        },
        {
            companyName: 'Mam Tom',
            total: '200'
        },
        {
            companyName: 'Ahihi',
            total: '213'
        },
        {
            companyName: 'Ahihi',
            total: '213'
        },
        {
            companyName: 'Ahihi',
            total: '213'
        },
        {
            companyName: 'Ahihi',
            total: '213'
        },
    ]

    const columnsSupplier = [
        {
            title: "Num",
            key: "number",
            width: "10%",
            align: "center",
            render: (_, __, index) => ((currentPage - 1) * limit) + index + 1,
        },
        {
            title: "Company name",
            key: "companyName",
            width: "10%",
            align: "center",
            render: (text) => text.companyName,
        },
        {
            title: "Total inward",
            key: "total",
            width: "10%",
            align: "center",
            ellipsis: true,
            render: (text) => text.total,
        }
    ];

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

                <div className="row-three">
                    <div className="income-title">
                        <div className="revenuestatistic__head">
                            <div className="head-title">
                                Income management
                            </div>
                        </div>

                        <div className="revenuestatistic-graph">
                            <Column {...configIncome} />
                        </div>
                    </div>
                </div>

                <div className="row-two">
                    <div className="invent-statistics">

                        <div className="common_title">
                            <p className='statistics-text'>Inventory statistics</p>
                        </div>

                        <div className='common-quantity'>
                            <div className="container-total">
                                <div className="total-quantity">
                                    <p className='total-quantity-number'>1,000</p>
                                    <p className='total-quantity-name'>Sold</p>
                                </div>
                            </div>

                            <div className="container-total">
                                <div className="total-quantity">
                                    <p className='total-quantity-number'>5,000</p>
                                    <p className='total-quantity-name'>In shelf</p>
                                </div>
                            </div>

                            <div className="container-total">
                                <div className="total-quantity">
                                    <p className='total-quantity-number'>6,000</p>
                                    <p className='total-quantity-name'>On stock</p>
                                </div>
                            </div>
                        </div>

                        <div className="statistics-pie">
                            {
                                configStatistics ? <Pie {...configStatistics} /> : null
                            }
                        </div>
                    </div>

                    <div className="suppliers-list">
                        <div className="common_title">
                            Suppliers list
                        </div>

                        <div className="supplier-list">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Table: {
                                            headerBg: "#1677ff4d",
                                            borderColor: "#cccccc"
                                        },
                                    },
                                }}
                            >
                                <Table
                                    columns={columnsSupplier}
                                    // dataSource={listData}
                                    dataSource={dataSupplier}
                                    bordered
                                    className="table_content"
                                    onChange={handlePageChange}
                                    pagination={{
                                        pageSize: limit,
                                    }}
                                ></Table>
                            </ConfigProvider>
                            {/* {
                                topBestSelling?.length >= 1
                                    ? */}

                            {/* :
                                    <div className='list-item-empty'>
                                        <Empty />
                                    </div>
                            } */}
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Home