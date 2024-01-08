import "./styles.scss";

import { Breadcrumb } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { internshipTransport } from "../../../config/http/transport";

const TierList = () => {
    const { shelfId } = useParams();
    const [tiers, setTiers] = useState([]);
    const navigate = useNavigate();

    useState(_ => {
        internshipTransport.get(`api/tiers/${shelfId}`)
            .then((resp) => {
                console.log(resp);
                if (resp.statusCode === "OK") {
                    setTiers(_=> resp.data);
                } else {
                    
                }
            });
    });

    return (
        <div className="tier__wrapper">
            <div className="tier__card">
                <Breadcrumb
                    separator={<h3 className="tier__node">{`>`}</h3>}
                    items={[
                        {
                            title: "Shelf",
                            href: "/shelf",
                        },
                        {
                            title: `Shelf ${shelfId}`,
                        },
                    ]}
                    itemRender={
                        (route, params, routes, paths) => {
                            if (route.href) {
                                return <div onClick={_ => navigate(route.href)} href={route.href} className="tier__node">{route.title}</div>
                            }
                            return <h3 className="tier__leaf">{route.title}</h3>
                        }
                    }
                />
                <div className="tier__list">
                    {
                        tiers.map((v, i) =>
                            <div className="tier__item">
                                <h3 className="tier__item__name">
                                    {v.tierCode}
                                </h3>
                                <p className="tier__item__capacity">
                                    {`In use: ${isNaN(v.inUse) ? 0 : v.inUse.toFixed(0)}%`}
                                </p>
                                <UnorderedListOutlined className="tier__item__nav" onClick={_=> navigate(`/shelf/${shelfId}/${v.tierId}`)} />
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
}

export default TierList;