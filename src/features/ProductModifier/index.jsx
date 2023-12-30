import { useState } from "react";
import "./styles.scss";

import { Button, Input, InputNumber, Modal } from "antd";

const ProductModifier = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="pmodifier__wrapper">
                <div className="pmodifier__card ">
                    <h2 className="pmodifier__title">Inventory receiving form</h2>
                </div>
                <div className="pmodifier__card layout">
                    <h3 className="pmodifier__field__title span-2-col">
                        Receiving time
                    </h3>
                    <h3 className="pmodifier__field__title span-2-col">
                        Supplier code
                    </h3>
                    <h3 className="pmodifier__field__title span-2-col">
                        Provider
                    </h3>
                    <Input disabled readOnly className="span-2-col" />
                    <Input disabled readOnly className="span-2-col" />
                    <Input disabled readOnly className="span-2-col" />
                    <h3 className="pmodifier__field__title span-2-col">
                        Delivery personnel name
                    </h3>
                    <h3 className="pmodifier__field__title span-2-col">
                        Delivery personnel signature
                    </h3>
                    <h3 className="pmodifier__field__title span-2-col">
                        Note
                    </h3>
                    <Input disabled readOnly className="span-2-col" />
                    <Button className="span-2-col" onClick={_=> setIsOpen(true)}>
                        Click to view
                    </Button>
                    <Input.TextArea disabled readOnly className="span-2-col span-2-row block-resize" />
                    <h3 className="pmodifier__field__title span-2-col">
                        Receiving clerk name
                    </h3>
                    <h3 className="pmodifier__field__title span-2-col">
                        Receiving clerk signature
                    </h3>
                    <Input disabled readOnly className="span-2-col" />
                    <Button className="span-2-col" onClick={_=> setIsOpen(true)}>
                        Click to view
                    </Button>
                    <h2 className="pmodifier__subtitle">
                        Product information
                    </h2>
                    <h3 className="pmodifier__field__title">
                        Category
                    </h3>
                    <h3 className="pmodifier__field__title">
                        Product name
                    </h3>
                    <h3 className="pmodifier__field__title">
                        Product code
                    </h3>
                    <h3 className="pmodifier__field__title">
                        Batch code
                    </h3>
                    <h3 className="pmodifier__field__title">
                        Quantity
                    </h3>
                    <h3 className="pmodifier__field__title">
                        Shelf arrange quantity
                    </h3>
                    <Input disabled readOnly />
                    <Input disabled readOnly />
                    <Input disabled readOnly />
                    <Input disabled readOnly />
                    <InputNumber min={0} style={{ width: "unset" }} />
                    <InputNumber min={0} style={{ width: "unset" }} />
                    <h3 className="pmodifier__field__title span-2-col">
                        Unit price
                    </h3>
                    <h3 className="pmodifier__field__title span-2-col">
                        Manufacture date
                    </h3>
                    <h3 className="pmodifier__field__title span-2-col">
                        Expire date
                    </h3>
                    <Input disabled readOnly className="span-2-col" />
                    <Input disabled readOnly className="span-2-col" />
                    <Input disabled readOnly className="span-2-col" />
                </div>
            </div>
            <Modal centered open={isOpen} onCancel={_=> setIsOpen(false)} footer={null} closeIcon={null}>
                <img src="https://vcdn1-thethao.vnecdn.net/2018/10/28/cover-4501-1540661827.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=riWpIRR_iuYzd0GgNb3Zmw" alt="messi" width="100%" />
            </Modal>
        </>
    );
}

export default ProductModifier;