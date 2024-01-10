import React, { useEffect, useState } from 'react'
import './style.scss'
import { Button, ConfigProvider, Select, Table } from 'antd';
import SideBar from '../../components/SideBar';
import { useSelector } from 'react-redux';
import { HiUserGroup } from "react-icons/hi2";
import { IoDocumentText } from "react-icons/io5";
import { BsBuildingFillAdd } from "react-icons/bs";
import { Column, Pie } from '@ant-design/plots';
import statisticApi from '../../redux/api/statistic'
const Home = () => {

    const { accessToken } = useSelector(state => state.user)
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 4;
    const [listMonth, setListMonth] = useState([])
    const [listYear, setListYear] = useState([])
    const [chooseMonth, setChooseMonth] = useState(new Date().getMonth() + 1)
    const [chooseYear, setChooseYear] = useState(new Date().getFullYear())
    const [income, setIncome] = useState([]);
    const [statistic, setStatistic] = useState([]);
    const [dataSupplier, setDataSupplier] = useState([]);
    const [statisticQnt, setStatisticQnt] = useState({sold: 0, inShelf: 0, onStock: 0});
    const [countQnt, setCountQnt] = useState({countAccount: 0, countInventory: 0, countSupplier: 0})
    console.log();
    //* Get data statistic
    useEffect(() => {
        const getStatisticData = async  () => {
            const result = await statisticApi.getStatistic(chooseMonth, chooseYear);
            console.log(result);
            if(result.statusCode === "OK"){
                //* set income value
                setIncome(result.data?.income);
                //* set statistic vaue
                if(result.data?.inventory){
                    let inventory = [...result.data?.inventory]
                    const total = inventory[0].value + inventory[1].value + inventory[2].value;
                    setStatisticQnt({sold: inventory[1].value ?? 0, inShelf: inventory[2].value ?? 0, onStock: inventory[0].value ?? 0})
                    //* set percent
                    inventory[0].value = Number(inventory[0].value* 100 / total);
                    inventory[1].value = Number(inventory[1].value* 100 / total);
                    inventory[2].value = Number(inventory[2].value* 100 / total);
                    setStatistic(inventory);
                }
                //* set supplier value
                setDataSupplier(result.data?.suppliers);
                //* set count total Account, Inventory, Supplier
                setCountQnt({countAccount: result?.data?.countAccount ?? 0, countInventory: result?.data?.countInventory ?? 0, countSupplier: result?.data?.countSupplier ?? 0})
            }
        };
        getStatisticData();
    }, [chooseMonth, chooseYear])


    const handlePageChange = (page) => {
        if (page != currentPage)
            setCurrentPage(page?.current);
    };

    const configIncome = {
        xField: 'month',
        yField: 'money',
        scrollbar: {
            x: {
                ratio: 1,
            },
        },
    };

    const configStatistics = {
        // data: [
        //     { type: 'in shelf', value: 41.667 },
        //     { type: 'on stock   ', value: 50 },
        //     { type: 'Sold', value: 8.333 },
        // ],
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

    const columnsSupplier = [
        {
            title: "Num",
            key: "number",
            width: "20%",
            align: "center",
            render: (_, __, index) => ((currentPage - 1) * limit) + index + 1,
        },
        {
            title: "Company name",
            key: "companyName",
            width: "60%",
            align: "center",
            render: (text) => text.companyName,
        },
        {
            title: "Total inward",
            key: "total",
            width: "30%",
            align: "center",
            ellipsis: true,
            render: (text) => `${Number(text.total).toLocaleString()} VND`,
        }
    ];

    return (
        <>
            <div className='home'>
                <div className="row-one">
                    <div className="container-total">
                        <HiUserGroup className='total-icon' />

                        <div className="total-quantity">
                            <p className='total-quantity-number'>{Number(countQnt.countAccount).toLocaleString()}</p>
                            <p className='total-quantity-name'>Users</p>
                        </div>
                    </div>

                    <div className="container-total">
                        <IoDocumentText className='total-icon' />

                        <div className="total-quantity">
                            <p className='total-quantity-number'>{Number(countQnt.countInventory).toLocaleString()}</p>
                            <p className='total-quantity-name'>Inventory management</p>
                        </div>
                    </div>

                    <div className="container-total">
                        <BsBuildingFillAdd className='total-icon' />

                        <div className="total-quantity">
                            <p className='total-quantity-number'>{Number(countQnt.countSupplier).toLocaleString()}</p>
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
                            <Column {...{data: income, ...configIncome }} />
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
                                    <p className='total-quantity-number'>{Number(statisticQnt.sold).toLocaleString()}</p>
                                    <p className='total-quantity-name'>Sold</p>
                                </div>
                            </div>

                            <div className="container-total">
                                <div className="total-quantity">
                                    <p className='total-quantity-number'>{Number(statisticQnt.inShelf).toLocaleString()}</p>
                                    <p className='total-quantity-name'>In shelf</p>
                                </div>
                            </div>

                            <div className="container-total">
                                <div className="total-quantity">
                                    <p className='total-quantity-number'>{Number(statisticQnt.onStock).toLocaleString()}</p>
                                    <p className='total-quantity-name'>On stock</p>
                                </div>
                            </div>
                        </div>

                        <div className="statistics-pie">
                            {
                                configStatistics ? <Pie {...{data: statistic, ...configStatistics}} /> : null
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