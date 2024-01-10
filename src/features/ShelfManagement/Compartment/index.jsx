import "./styles.scss";

import { Breadcrumb, Button, ConfigProvider, Input, Modal, Table } from "antd";
import { CloseOutlined, UnorderedListOutlined, SearchOutlined, DeleteOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { internshipTransport } from "../../../config/http/transport";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const CompartmentDetail = ({ data, shelfId, tierId, onClear }) => {

    const entries = [
        {
            name: "Product name",
            key: "productName",
        },
        {
            name: "Category",
            key: "categoryName",
        },
        {
            name: "Product code",
            key: "productId",
        },
        {
            name: "Batch code",
            key: "batchCode",
        },
        {
            name: "Quantity",
            key: "currentQuantity",
        },
        {
            name: "Shelf quantity",
            key: "shelfQnt",
        },
        {
            name: "Unit price",
            key: "price",
        },
        {
            name: "Manufacture date",
            key: "manufactureDate",
        },
        {
            name: "Expire date",
            key: "expiredDate",
        },

    ];
    return (
        <div className="compartment__dialog">
            <Breadcrumb
                separator={<h3 className="tier__node">{`>`}</h3>}
                items={[
                    {
                        title: `Shelf (${shelfId})`,
                    },
                    {
                        title: `Tier (${tierId})`,
                    },
                    {
                        title: data.compartmentCode,
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
                                <td>{data[value.key]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Button onClick={onClear} icon={<DeleteOutlined />}>Clear Compartment</Button>
        </div>
    );
}

const Compartment = () => {
    const { shelfId, tierId } = useParams();
    const [compartment, setCompartment] = useState([]);
    const [selected, setSelected] = useState([]);
    const [products, setProducts] = useState([]);
    const [input, setInput] = useState("");
    const [data, setData] = useState(null);

    const addProduct = (productId, compartments) => {
        if (compartments.length == 0) {
            toast.error("Please select at least 1 compartment!");
            return;
        }
        const body = {
            compartmentIds: compartments.map((v) => v.compartmentId),
            tierId: Number.parseInt(tierId),
            productId: productId,
        };
        internshipTransport.post("api/shelves/add-products", body)
            .then(resp => {
                if (resp.statusCode === "OK") {
                    toast.success("Successfully");
                    Promise.all([
                        internshipTransport.get(`api/compartments/${tierId}`),
                        internshipTransport.get(`api/products/all?search=&page-number=1&limit=1&from=11-11-2023&to=${dayjs().format("DD-MM-YYYY")}`)
                    ])
                        .then((resp) => {
                            if (resp[0].statusCode === "OK") {
                                setCompartment(_ => resp[0].data);
                                console.log(resp[0].data);
                            }
                            if (resp[1].statusCode === "OK") {
                                setProducts(_ => resp[1].data.filter((v, i) => !v.isDisable));
                            }
                        });
                    setSelected([]);
                } else {

                    toast.error(resp.response.data.data);
                    toast.error(resp.response.data.message);
                }
            });
    }

    const onClearCompartment = (compartmentId) => {
        if (compartmentId) {
            internshipTransport.put(`api/compartments/clear/${compartmentId}`)
                .then(resp => {
                    if (resp.statusCode === "OK") {
                        toast.success("Successfully");
                        setData(_ => null);
                        Promise.all([
                            internshipTransport.get(`api/compartments/${tierId}`),
                            internshipTransport.get(`api/products/all?search=&page-number=1&limit=1&from=11-11-2023&to=${dayjs().format("DD-MM-YYYY")}`)
                        ])
                            .then((resp) => {
                                if (resp[0].statusCode === "OK") {
                                    setCompartment(_ => resp[0].data);
                                    console.log(resp[0].data);
                                }
                                if (resp[1].statusCode === "OK") {
                                    setProducts(_ => resp[1].data.filter((v, i) => !v.isDisable));
                                }
                            });
                        setSelected([]);
                    } else {

                        toast.error("Failed!");
                    }
                });
        }
    }

    const columns = [
        {
            key: "categoryName",
            title: "Category",
            dataIndex: "categoryName",
        },
        {
            key: "productName",
            title: "Product name",
            dataIndex: "productName",
        },
        {
            key: "productCode",
            title: "Product code",
            dataIndex: "productCode",
        },
        {
            key: "inputQuantity",
            title: "Quantity",
            dataIndex: "inputQuantity",
            render: (text, record, index) => record["inputQuantity"] - record["soldQuantity"] - record["shelfQnt"]
        },
        {
            key: "shelfArrangeQnt",
            title: "Shelf arrange quantity",
            dataIndex: "shelfArrangeQnt",
        },
        {
            key: "receivingTime",
            title: "Expire day",
            dataIndex: "receivingTime",
            render: (text, record, index) => dayjs(Date.parse(record["receivingTime"])).format("DD-MM-YYYY")
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record, index) => <Button type="text" icon={<FolderAddOutlined style={{ color: "#1677ff" }} />} onClick={_ => addProduct(record["productId"], selected)}>Add</Button>
        },
    ];

    useState(_ => {
        Promise.all([
            internshipTransport.get(`api/compartments/${tierId}`),
            internshipTransport.get(`api/products/all?search=&page-number=1&limit=1&from=11-11-2023&to=${dayjs().format("DD-MM-YYYY")}`)
        ])
            .then((resp) => {
                if (resp[0].statusCode === "OK") {
                    setCompartment(_ => resp[0].data);
                }
                if (resp[1].statusCode === "OK") {
                    setProducts(_ => resp[1].data.filter((v, i) => !v.isDisable));
                }
            });
    }, []);

    const onSelected = (item) => {
        if (selected.includes(item)) {
            setSelected(prev => prev.filter((v, i) => v.compartmentId !== item.compartmentId));

        } else {
            if (selected.length === 0 || selected.every((v) => v.productId === item.productId || !v.productId) || !item.productId) {
                setSelected(prev => [...prev, item]);
            } else {
                toast.info("Products must be the same!");
            }
        }
    }

    const onViewDetail = (item, e) => {
        e.stopPropagation();
        setData(_ => item);
    }

    const onFilter = (product, input) => {
        const idMatched = product.productId == input;
        const cateMatched = product.categoryName ? product.categoryName.includes(input) : false;
        const nameMatched = product.productName ? product.productName.includes(input) : false;
        return idMatched || cateMatched || nameMatched;
    }

    return (
        <>
            <div className="compartment__warpper">
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
                                href: `/shelf/${shelfId}`,
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
                        {
                            compartment.map((v, i) =>

                                <div className={`compartment__item${selected.includes(v) ? " selected" : ""}`} onClick={e => onSelected(v)}>
                                    <h3 className="compartment__item__name">
                                        {
                                            v.compartmentCode
                                        }
                                    </h3>
                                    {
                                        v.productId ?
                                            <>
                                                <p className="compartment__item__capacity">
                                                    {
                                                        `${v.productName || "Null"}: ${v.currentQuantity}`
                                                    }
                                                </p>
                                                <UnorderedListOutlined className="compartment__item__nav" onClick={e => onViewDetail(v, e)} />
                                            </>
                                            :
                                            <p>
                                                Empty
                                            </p>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="compartment__card">

                    <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                    headerBg: "#1677ff4d",
                                },
                            },
                        }}
                    >
                        <>
                            <div style={{ width: "50%", marginBottom: "16px" }}>
                                <Input prefix={<SearchOutlined style={{ color: "#1677FF" }} />} value={input} onChange={e => setInput(_ => e.target.value)} placeholder="Search Product name" />
                            </div>
                            <Table
                                dataSource={products.filter((v) => onFilter(v, input))}
                                columns={columns}
                            />
                        </>
                    </ConfigProvider>
                </div>
            </div>
            <Modal open={data != null} footer={null} closeIcon={<CloseOutlined style={{ color: "red" }} onClick={() => setData(_ => null)} />}>
                <CompartmentDetail data={data} shelfId={shelfId} tierId={tierId} onClear={_ => onClearCompartment(data.compartmentId)} />
            </Modal>
        </>
    );
}

export default Compartment;