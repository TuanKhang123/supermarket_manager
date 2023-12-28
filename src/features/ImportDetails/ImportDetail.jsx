import "./style.scss";
import { Button, Input, Table } from "antd";
import ImportTable from "./component/ImportTable";

const ImportDetail = () => {

    return (
        <div className="idetail__wrapper">
            <div className="idetail__card">
                <h2 className="idetail__title">Inventory receiving details</h2>
            </div>
            <div className="idetail__card layout">
                <Button type="default" style={{ width: "fit-content", gridColumn: 1, gridRow: 1 }} className="idetail__button">
                    <h2>
                        Inventory receiving table
                    </h2>
                </Button>
                <h3 className="idetail__field__title" style={{ gridRow: 2, gridColumn: 1 }}>
                    Detail information
                </h3>
                <h3 className="idetail__field__title" style={{ gridRow: 2 }}>
                    Note
                </h3>
                <Input.TextArea readOnly style={{ gridRow: 3, gridColumn: 2, width: "50%", resize: "none" }} />
                <ImportTable />
                <h3 className="idetail__field__title" style={{ gridRow: 4 }}>
                    Delivery personnel name
                </h3>
                <div className="idetail__border__view" style={{ gridRow: 5 }}>
                    <p>Nguyễn Văn A</p>
                    <a>Signature picture</a>
                </div>
                <h3 className="idetail__field__title" style={{ gridRow: 6 }}>
                    Receiving clerk name
                </h3>
                <div className="idetail__border__view" style={{ gridRow: 7 }}>
                    <p>Nguyễn Văn B</p>
                    <a>Signature picture</a>
                </div>
            </div>
        </div>
    );
}

export default ImportDetail;