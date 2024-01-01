import "./styles.scss";

import { Breadcrumb, Button, ConfigProvider, Input, Modal, Table } from "antd";
import { CloseOutlined, UnorderedListOutlined, SearchOutlined, DeleteOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { internshipTransport } from "../../../config/http/transport";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const CompartmentDetail = ({data, shelfId, tierId, onClear}) => {

    const entries = [
        {
            name: "Product name",
            key: "name",
        },
        {
            name: "Category",
            key: "categoryName",
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
                                <td>{data[value.key] || "Undefined"}</td>
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
    const [data, setData]= useState(null);

    const addProduct = (productId, compartments) => {
        internshipTransport.post("api/products/add-to-shelf", {
            compartmentIds: compartments,
            tierId: tierId,
            productId: productId,
        })
        .then(resp => {
            if (resp.statusCode === "OK") {
                toast.success("Successfully");
            } else {
                toast.error("Failed!");
            }
        });
    }

    const onClearCompartment = (compartmentId) => {
        if (compartmentId) {
            internshipTransport.put(`api/compartments/clear/${compartmentId}`)
            .then(resp => {
                if (resp.statusCode === "OK") {
                    toast.success("Successfully");
                } else {
                    toast.error("Failed!");
                }
            });
        }
    }

    const columns = [
        {
            key: "no",
            title: "No.",
            dataIndex: "no",
            render: (text, record, index) => 1,
        },
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
        },
        {
            key: "sqty",
            title: "Shelf arrange quantity",
            dataIndex: "sqty",
        },
        {
            key: "receivingTime",
            title: "Expire day",
            dataIndex: "receivingTime",
            render: (text, record, index) => dayjs(Date.parse(record["receivingTime"]))
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "action",
            render: (text, record, index) => <Button type="text" icon={<FolderAddOutlined style={{color: "#1677ff"}} />} onClick={_=> addProduct(record["productId"], selected)}>Add</Button>
        },
    ];

    useState(_ => {
        Promise.all([
            internshipTransport.get(`api/compartments/${tierId}`),
            internshipTransport.get(`http://localhost:8080/api/products/all?search=&page-number=1&limit=1&from=11-11-2023&to=${dayjs().format("DD-MM-YYYY")}`)
        ])
            .then((resp) => {
                if (resp[0].statusCode === "OK") {
                    setCompartment(_ => resp[0].data);
                }
                if (resp[1].statusCode === "OK") {
                    setProducts(_ => resp[1].data);
                }
            });
    }, []);

    const onSelected = (item) => {
        if (selected.includes(item)) {
            setSelected(prev => prev.filter((v, i) => v.compartmentId !== item.compartmentId));

        } else {
            if (selected.length === 0 || selected[0].productId === item.productId) {
                setSelected(prev => [...prev, item]);
            } else {
                toast.info("Products must be the same!");
            }
        }
    }

    const onViewDetail = (item, e) => {
        e.stopPropagation();
        setData(_=> item);
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
                                    <p className="compartment__item__capacity">
                                        {
                                            `${v.productName || "Unknown"}: ${v.currentQuantity}`
                                        }
                                    </p>
                                    <UnorderedListOutlined className="compartment__item__nav" onClick={e => onViewDetail(v, e)} />
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
                                <Input prefix={<SearchOutlined style={{ color: "#1677FF" }} />} value={input} onChange={e => setInput(_=> e.target.value)} placeholder="Search Product name" />
                            </div>
                            <Table
                                dataSource={products.filter((v) => onFilter(v, input))}
                                columns={columns}
                            />
                        </>
                    </ConfigProvider>
                </div>
            </div>
            <Modal open={data != null} footer={null} closeIcon={<CloseOutlined style={{ color: "red" }} onClick={() => setData(_=> null)} />}>
                <CompartmentDetail data={data} shelfId={shelfId} tierId={tierId} onClear={_=> onClearCompartment(data.compartmentId)} />
            </Modal>
        </>
    );
}

export default Compartment;