import "./styles.scss";

import { Breadcrumb } from "antd";

const TierList = () => {
    return (
        <div className="tier__wrapper">
            <div className="tier__card">
                <h2 className="tier__title">
                    Shelf arrangement
                </h2>
            </div>
            <div className="tier__card">
                <Breadcrumb
                    separator={<h3 className="tier__node">{`>`}</h3>}
                    items={[
                        {
                            title: "Shelf A1",
                            href: "/shelf",
                        },
                        {
                            title: "Tier 1",
                        },
                    ]}
                    itemRender={
                        (route, params, routes, paths) => {
                            if (route.href) {
                                return <a href={route.href} className="tier__node">{route.title}</a>
                            }
                            return <h3 className="tier__leaf">{route.title}</h3>
                        }
                    }
                />
            </div>
        </div>
    );
}

export default TierList;