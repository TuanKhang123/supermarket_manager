import "./styles.scss";
import Input from "./components/Input";
// import Uploader from "./components/Uploader";
import InputArea from "./components/InputArea";
import Button from "./components/Button";

export default function Import() {
    return (
        <div className="import__wrapper">
            <div className="import__card">
                <h2 className="import__title">
                    Biểu mẫu nhập hàng
                </h2>
            </div>
            <div style={{width: "70%"}} className="import__card">
                <div className="import__display_grid">
                    <Input name="time" id="time" label="Thời gian nhập sản phẩm" placeholder="dd/mm/yyyy" />
                    <Input name="providerid" id="providerid" label="Mã nhà cung cấp" placeholder="Nhập mã nhà cung cấp" />
                    <Input name="time" id="time3" label="Mã sản phẩm" placeholder="Nhập mã sản phẩm" />
                    <Input name="time" id="time4" label="Mã lô sản xuất" placeholder="Nhập mã lô sản phẩm" />
                    <Input name="time" id="time4" label="Số lượng" placeholder="Nhập số lượng sản phẩm" />
                    <Input name="time" id="time4" label="Khối lượng" placeholder="Nhập khối lượng sản phẩm" />
                    <Input name="time" id="time4" label="Đơn giá" placeholder="Nhập đơn giá" />
                    <Input name="time" id="time4" label="Ngày sản xuất" placeholder="Chọn ngày sản xuất" />
                    <Input name="time" id="time4" label="Hạn sử dụng" placeholder="Nhập hạn sử dụng" />
                    <Input name="time" id="time4" label="Kệ số" placeholder="Chọn kệ có sẵn" />
                    <Input name="time" id="time4" label="Tầng số" placeholder="Chọn tầng" />
                    <Input name="time" id="time4" label="Ngăn số" placeholder="Chọn ngăn" />
                    <Input name="time" id="time4" label="Tên nhân viên giao hàng" placeholder="Nhập tên nhân viên giao hàng" />
                    {/* <Uploader
                        name="deliver"
                        id="deliver"
                        label="Chữ ký nhân viên giao hàng"
                        description="Dạng file .jpg, .jpeg, .png, .heif dung lượng <= 20MB"
                        className="import__span-2"
                    />
                    <Input name="time" id="time4" label="Tên nhân viên giao hàng" placeholder="Nhập tên nhân viên nhận hàng" />
                    <Uploader
                        name="staff"
                        id="staff"
                        label="Chữ ký nhân viên nhận hàng"
                        description="Dạng file .jpg, .jpeg, .png, .heif dung lượng <= 20MB"
                        className="import__span-2"
                    />   */}
                    <InputArea
                        name="text"
                        id="note"
                        label="Ghi chú"
                        placeholder="Nhập thông tin ghi chú"
                        className="import__span-3"
                    />
                </div>
                <div className="import__controllers">
                    <Button className="import__button--solid">
                        Nhập thêm
                    </Button>
                    <Button className="import__button--outlined1">
                        Nhập thêm
                    </Button>
                    <Button className="import__button--outlined2">
                        Hủy
                    </Button>
                </div>
            </div>
    </div>
    );
}