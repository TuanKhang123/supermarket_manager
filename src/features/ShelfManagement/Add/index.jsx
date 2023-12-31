import "./styles.scss";
import { Button, InputNumber, Select, Input, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const AddShelf = () => {
    const [tiers, setTiers] = useState([10]);

    const add = () => setTiers(prev => [...prev, 1]);
    const change = (index, value) => setTiers(prev => prev.map((v, i) => i === index ? value : v));
    const del = (index) => setTiers(prev => prev.filter((v, i) => i !== index));

    return (
        <div className="ashelf__wrapper">
            <div className="ashelf__card">
                <div className="ashelf__layout">
                    <h3 className="ashelf__field__title required">
                        Shelf code
                    </h3>
                    <h3 className="ashelf__field__title required">
                        Category
                    </h3>
                    <Input placeholder="Input shelf code (Eg: A1)" />
                    <Select placeholder="Input category type" />
                </div>
                <ul className="ashelf__tierlist">
                    {
                        tiers.map((value, index) => (
                            <li key={index} className="ashelf__tieritem">
                                <h2 className="ashelf__field__title required">
                                    {`Tier ${index + 1}`}
                                </h2>
                                <Space.Compact >
                                    <InputNumber min={0} value={value} onChange={(value) => change(index, value)} />
                                    <Button icon={<DeleteOutlined style={{ color: "#1677FF" }} />} onClick={_ => del(index)} disabled={tiers.length < 2} />
                                </Space.Compact>
                            </li>
                        ))
                    }
                    <li className="ashelf__submit">

                        <Button type="primary" >
                            Complete
                        </Button>
                        <Button type="default">
                            Cancel
                        </Button>
                        {
                            tiers.length < 5 &&
                            <Button type="dashed" onClick={add} >
                                + More Tier
                            </Button>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AddShelf;