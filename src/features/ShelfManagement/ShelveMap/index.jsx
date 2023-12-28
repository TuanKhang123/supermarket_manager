import "./styles.scss";

import { Button, Input } from "antd";
import { SearchOutlined, CloseOutlined, ArrowDownOutlined } from "@ant-design/icons";

const ShelveMap = () => {
    return (
        <div className="smap__wrapper">
            <div className="smap__card">
                <h2 className="smap__title">
                    Shelf arrangement
                </h2>
            </div>
            <div className="smap__card">
                <Input
                    prefix={<SearchOutlined style={{ color: "#1677FF" }} />}
                    placeholder="Search follow the shelf code"
                    style={{ marginBottom: "33px" }}
                />
                <div className="smap__shelve">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(_ => (
                            <div className="shelf__item">
                                <h3 className="shelf__item__name">
                                    Shelf 2
                                </h3>
                                <p className="shelf__item__capacity">
                                    In use: 100%
                                </p>
                                <CloseOutlined className="shelf__item__delete" />
                                <ArrowDownOutlined className="shelf__item__nav" rotate={-45} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="smap__card">
                <Button type="default" style={{ paddingLeft: "100px", paddingRight: "100px", height: "40px" }}>
                    <h2 className="smap__buttonadd__content">
                        + More shelf
                    </h2>
                </Button>
            </div>
        </div>
    );
}

export default ShelveMap;