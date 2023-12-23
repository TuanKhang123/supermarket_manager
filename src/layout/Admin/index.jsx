import SideBar from "../../components/SideBar"
import Title from "antd/es/skeleton/Title"
import { Route, Router, Routes } from "react-router-dom"
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";


const AdminLayout = () => {
    const pathName = window.location.pathname // để chèn chữ vào trong title

    return (
        <div>
            <Header></Header>
            <div className="app-body" style={{ display: 'flex' }}>

                <div className="body-left">
                    <SideBar />
                </div>

                <div className="body-right-access">
                    <div className="right-title">
                        < Title />
                    </div>

                    <div className="right-wrapper">
                        {/* <Router >
                            <div className="App">
                                <Routes>

                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />}></Route>
                                    <Route path="/resetpassword" element={<ResetPassword />}></Route>

                                    <Route path="/inventory-audit-form" element={<InventoryAuditForm />}></Route>
                                    <Route path="/inventory-audit-detail/:id" element={<InventoryAuditDetail />}></Route>
                                    <Route path="/inventory-audit-info" element={<InventoryAuditInfo />}></Route>
                                    <Route path="/dashboard" element={<DashBoard />}></Route>

                                </Routes>
                            </div>
                        </Router> */}
                        <Outlet />
                    </div>
                </div>

            </div >
        </div>
    )
}

export default AdminLayout