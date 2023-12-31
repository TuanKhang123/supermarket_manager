import "./styles.scss";

import { Breadcrumb, Button, ConfigProvider, Input, Modal, Table } from "antd";
import { CloseOutlined, ArrowDownOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const CompartmentDetail = () => {

    const entries = [
        {
            name: "Product name",
            key: "name",
        },
        {
            name: "Category",
            key: "category",
        },
        {
            name: "Product code",
            key: "code",
        },
        {
            name: "Batch code",
            key: "bcode",
        },
        {
            name: "Quantity",
            key: "qty",
        },
        {
            name: "Shelf quantity",
            key: "sqty",
        },
        {
            name: "Unit price",
            key: "price",
        },
        {
            name: "Manufacture date",
            key: "pro",
        },
        {
            name: "Expire date",
            key: "exp",
        },

    ];
    return (
        <div className="compartment__dialog">
            <Breadcrumb
                separator={<h3 className="tier__node">{`>`}</h3>}
                items={[
                    {
                        title: "Shelf A1",
                        href: "/shelf",
                    },
                    {
                        title: "Tier 1",
                        href: "/shelf/tier",
                    },
                    {
                        title: "Compartment 1",
                    },
                ]}
                itemRender={
                    (route) => {
                        if (route.href) {
                            return <a href={route.href} className="tier__node">{route.title}</a>
                        }
                        return <h3 className="tier__leaf">{route.title}</h3>
                    }
                }
            />
            <table className="compartment__dialog__table" cellspacing="0" cellpadding="0">
                <tbody>
                    {
                        entries.map((value, index) => (
                            <tr key={value.key} >
                                <td>{value.name}</td>
                                <td>{value.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Button icon={<DeleteOutlined />}>Clear Compartment</Button>
        </div>
    );
}

const Compartment = () => {
    const {shelfId, tierId} = useParams();

    const columns = [
        {
            key: "no",
            title: "No.",
            dataIndex: "no",
            render: (text, record, index) => "1",
        },
        {
            key: "category",
            title: "Category",
            dataIndex: "category",
        },
        {
            key: "name",
            title: "Product name",
            dataIndex: "name",
        },
        {
            key: "code",
            title: "Product code",
            dataIndex: "code",
        },
        {
            key: "qty",
            title: "Quantity",
            dataIndex: "qty",
        },
        {
            key: "sqty",
            title: "Shelf arrange quantity",
            dataIndex: "sqty",
        },
        {
            key: "exp",
            title: "Expire day",
            dataIndex: "exp",
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
        },
    ];

    return (
        <>
            <div className="compartment__warpper">
                <div className="compartment__card">
                    <h2 className="compartment__title">
                        Shelf arrangement
                    </h2>
                </div>
                <div className="compartment__card">
                    <Breadcrumb
                        separator={<h3 className="tier__node">{`>`}</h3>}
                        items={[
                            {
                                title: "Shelf",
                                href: "/shelf",
                            },
                            {
                                title: `Shelf (${shelfId})`,
                                href: `/shelf/${shelfId}}`,
                            },
                            {
                                title: `Tier (${tierId})`,
                            },
                        ]}
                        itemRender={
                            (route) => {
                                if (route.href) {
                                    return <a href={route.href} className="tier__node">{route.title}</a>
                                }
                                return <h3 className="tier__leaf">{route.title}</h3>
                            }
                        }
                    />
                    <div className="compartment__list">
                        <div className="compartment__item">
                            <h3 className="compartment__item__name">
                                Shelf 2
                            </h3>
                            <p className="compartment__item__capacity">
                                In use: 100%
                            </p>
                            <CloseOutlined className="compartment__item__delete" />
                            <ArrowDownOutlined className="compartment__item__nav" rotate={-45} />
                        </div>
                    </div>
                </div>
                <div className="compartment__card">
                    <Input prefix={<SearchOutlined style={{ color: "#1677FF" }} />} />
                    <ConfigProvider>
                        <Table
                            theme={{
                                components: {
                                    Table: {
                                        headerBg: "#1677ff4d",
                                    },
                                },
                            }}
                            columns={columns}
                        />
                    </ConfigProvider>
                </div>
            </div>
            <Modal open={true} footer={null} closeIcon={<CloseOutlined style={{color: "red"}}/>}>
                <CompartmentDetail />   
            </Modal>
        </>
    );
}

export default Compartment;