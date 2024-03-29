import "./styles.scss";

import { Button, Input } from "antd";
import { SearchOutlined, CloseOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { internshipTransport } from "../../../config/http/transport";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ShelveMap = () => {
    const [input, setInput] = useState("");
    const [shelve, setShelve] = useState([]);
    const navigate = useNavigate();

    useEffect(_ => {
        internshipTransport.get("api/shelves")
            .then(resp => {
                if (resp.statusCode === "OK") {
                    setShelve(_ => resp.data);
                }
            });
    }, []);

    const onDelete = (id) => {
        internshipTransport.delete(`api/shelves/delete/${id}`)
        .then((resp) => {
            if (resp.statusCode === "OK") {
                toast.success("Successfully!");
                setShelve(prev => prev.filter((v, i) => v.shelfId != id));
            } else {
                toast.error("Error!");
            }
        })
    }

    const onNavigate = (id) => {
        navigate(`/shelf/${id}`);
    }

    return (
        <div className="smap__wrapper">
            <div className="smap__card">
                <Input
                    prefix={<SearchOutlined style={{ color: "#1677FF" }} />}
                    placeholder="Search follow the shelf code"
                    style={{ marginBottom: "33px" }}
                    value={input}
                    onChange={(e) => setInput(_ => e.target.value)}
                />
                <div className="smap__shelve">
                    {
                        shelve.filter((v, i) => v.shelfCode.toLowerCase().includes(input.toLowerCase())).map((v, i) => (
                            <div className="shelf__item" key={i}>
                                <h3 className="shelf__item__name">
                                    {v.shelfCode}
                                </h3>
                                <p className="shelf__item__capacity">
                                    {`In use: ${v.inUse.toFixed(0)}%`}
                                </p>
                                <CloseOutlined className="shelf__item__delete" onClick={_ => onDelete(v.shelfId)} />
                                <ArrowDownOutlined className="shelf__item__nav" rotate={-45} onClick={_=> onNavigate(v.shelfId)}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="smap__card">
                <Button type="default" style={{ paddingLeft: "100px", paddingRight: "100px", height: "40px" }} onClick={_=> navigate("/shelf/add")}>
                    <h2 className="smap__buttonadd__content">
                        + More shelf
                    </h2>
                </Button>
            </div>
        </div>
    );
}

export default ShelveMap;