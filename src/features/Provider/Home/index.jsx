import { Button, ConfigProvider, Input, Table, Upload } from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import "./styles.scss";

const ProviderHome = () => {
    const columns = [
        {
            key: "num",
            title: "Num",
            dataIndex: "num",
            render: (t, d, i) => i,
        },
        {
            key: "name",
            title: "Supplier Name",
            dataIndex: "name",
        },
        {
            key: "phone",
            title: "Phone number",
            dataIndex: "phone",
        },
        {
            key: "email",
            title: "Email address",
            dataIndex: "email",
        },
    ];
    return (
        <div className="provider__wrapper">
            <div className="provider__card" style={{ marginBottom: "30px" }}>
                <h2 className="provider__title">Supplier Management</h2>
            </div>
            <div className="provider__splitter">
                <div className="provider__card">
                    <div className="provider__section__heading">
                        <h2 className="provider__title">Supplier list</h2>
                        <div className="provider__actions">
                            <Input
                                prefix={<SearchOutlined style={{ color: "#1677FF" }} />}
                                placeholder="Provider name"
                            />
                            <Button type="primary">
                                Add supplier
                            </Button>
                        </div>
                    </div>
                    <div className="provider__main">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Table: {
                                        headerBg: "#1677ff4d",
                                    },

                                },
                            }}
                        >
                            <Table
                                style={{ width: "100%" }}
                                columns={columns}
                                dataSource={[
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                    {
                                        name: "Hustler",
                                        phone: "0332593322",
                                        email: "h@gm.com",
                                    },
                                ]}
                            />
                        </ConfigProvider>
                    </div>
                </div>
                <div className="provider__card" style={{height: "fit-content"}}>
                    <div className="provider__section__heading">
                        <h2 className="provider__title">Supplier detail</h2>
                    </div>
                    <div className="provider__detail">
                        <h2 className="provider__field__title required">
                            Supplier Name
                        </h2>
                        <h2 className="provider__field__title required">
                            Phone number
                        </h2>
                        <Input placeholder="Enter supplier name" />
                        <Input placeholder="Enter the provider's phone number" />
                        <h2 className="provider__field__title required">
                            Address
                        </h2>
                        <h2 className="provider__field__title required">
                            Email address
                        </h2>
                        <Input placeholder="Enter the supplier's address" />
                        <Input placeholder="Enter supplier email address" />
                        <h2 className="provider__field__title">
                            Note
                        </h2>
                        <h2 className="provider__field__title required">
                            Evidence of product quality inspection
                        </h2>
                        <Input.TextArea placeholder="Enter note information" style={{ resize: "none" }} />
                        <Upload multiple={false} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                        <div className="provider__home__control">
                            <Button type="primary">
                                Change info
                            </Button>
                            <Button type="default">
                                Change info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProviderHome;