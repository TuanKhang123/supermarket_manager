import "./styles.scss";
import { Button, Form, Input, Upload, } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { internshipTransport } from "../../../config/http/transport";
import { toast } from "react-toastify";

const AddProvider = () => {

    useEffect(() => {

    }, []);

    const onFinish = async (values) => {
        try {
            const base64 = values.safetyInspection.file.thumbUrl;
            const body = {
                ...values,
                safetyInspection: base64.substring(base64.indexOf(",") + 1),
                contactPerson: "Hanna",
            };
            const resp = await internshipTransport.post("/api/provides/create", body);
            console.log(resp);
            if (resp.statusCode === "CREATED") {
                toast.success("Successfully!");
            }
        } catch (error) {
            toast.error(error.toString());
        }
    };

    return (
        <div className="aprovider__wrapper">
            <div className="aprovider__card">
                <h2 className="aprovider__title">
                    Provider Form
                </h2>
            </div>
            <div className="aprovider__card">
                <Form onFinish={onFinish}>
                    <div className="aprovider__form">
                        <h3 className="aprovider__field__title required">
                            Provider's name
                        </h3>
                        <h3 className="aprovider__field__title required">
                            Provider's phone number
                        </h3>
                        <h3 className="aprovider__field__title required">
                            Email
                        </h3>
                        <Form.Item name="name" rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}>
                            <Input placeholder="The name of provider" />
                        </Form.Item>
                        <Form.Item name="phoneContact" rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}>
                            <Input placeholder="The phone number of provider" patttern="[0-9]{3}-[0-9]{3}-[0-9]{4}" type="tel" />
                        </Form.Item>
                        <Form.Item name="emailContact" rules={[
                            {
                                required: true,
                                type: "email",
                                message: "This field is required",
                            },
                            {
                                type: "email",
                                message: "Wrong email format",
                            }
                        ]}>
                            <Input placeholder="The email address number of provider" />
                        </Form.Item>
                        <h3 className="aprovider__field__title required" style={{ gridColumn: "1 / 2" }}>
                            Address
                        </h3>
                        <h3 className="aprovider__field__title required" style={{ gridColumn: "3" }}>
                            Safety Inspection
                        </h3>
                        <Form.Item name="address" rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]} style={{ gridColumn: "1 / 3" }} >
                            <Input placeholder="The address number of provider" />
                        </Form.Item>
                        <Form.Item name="safetyInspection" rules={[
                            {
                                required: true,
                                message: "This field is required",
                            }
                        ]}>
                            <Upload multiple={false} maxCount={1} listType="picture-card">
                                <button
                                    style={{
                                        border: 0,
                                        background: "none",
                                    }}
                                    type="button"
                                >
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <h3 className="aprovider__field__title" style={{ gridColumn: "1 / 2" }}>
                            Note
                        </h3>
                        <Form.Item style={{ gridColumn: "1 / 4", resize: "none" }} name="note" rules={[
                            {
                                required: false,
                                message: "This field is required",
                            }
                        ]}>
                            <Input.TextArea placeholder="take note" />
                        </Form.Item>
                    </div>
                    <div className="aprovider__buttons">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                        <Button type="default" htmlType="submit">Save and add more</Button>
                        <Button danger type="default">Cancel</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddProvider;