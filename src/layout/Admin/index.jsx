import SideBar from "../../components/SideBar"
import { Route, Router, Routes } from "react-router-dom"
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { useEffect, useState } from "react";


const AdminLayout = () => {
    const location = useLocation();
    const pathName = location.pathname; // để chèn chữ vào trong title
    const [name, setName] = useState('')


    return (
        <div>
            <Header></Header>
            <div className="app-body" style={{ display: 'flex' }}>

                <div className="body-left">
                    <SideBar />
                </div>

                <div className="body-right-access">
                    {
                        (pathName === "/account/form" || pathName.includes('account-detail'))
                            ? null
                            : (
                                <div className="right-title">
                                    <Title />
                                </div>
                            )
                    }
                    <div className="right-wrapper">
                        <Outlet />
                    </div>
                </div>

            </div >
        </div>
    )
}

export default AdminLayout