import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.scss';
import Home from "./features/Home";
import Login from "./features/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResetPassword from "./features/ResetPassword";
import InventoryAuditForm from "./features/InventoryAuditForm";
import InventoryAuditDetail from "./features/InventoryAuditDetail";
import InventoryAuditInfo from "./features/InventoryAuditInfo";
import SideBar from "./components/SideBar";
import DashBoard from "./features/DashBoard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Title from "./components/Title";
import { privateRouter, publicRouter } from "./config/routes";

function App() {

  // const { accessToken } = useSelector(state => state.user)
  const accessToken = localStorage.getItem('accessToken');
  // const [accessToken, setAccessToken] = useState()
  const pathName = window.location.pathname
  // const navigate = useNavigate()
  console.log(accessToken);
  console.log(pathName);


  // useEffect(() => {
  //   setAccessToken(localStorage.getItem('accessToken'))
  // }, [localStorage.getItem('accessToken')])


  return (
    <>

      {/* {accessToken && } */}

      {/* <div>
        <Header></Header>
        <div className="app-body" style={accessToken ? { display: 'flex' } : null}>
          <div className="body-left">
            <SideBar />
          </div>
          <div className="body-right-access">

            {accessToken && (
              <div className="right-title">
                < Title />
              </div>
            )}

            <div className="right-wrapper">
              <Router >
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
                  <ToastContainer />
                </div>
              </Router>
            </div>
          </div>

        </div >
      </div> */}

      <Router>
        <Routes>
          {
            publicRouter.map((routers) => {
              return routers.map((route, index) => {

                return (
                  <Route path={route.path} element={route.element} key={index}>
                    {
                      route.children
                        ? route.children.map(({ path, Component }, index) => {
                          return (

                            <Route
                              path={path}
                              element={<Component />}
                              key={index}
                            />
                          );
                        })
                        : null
                    }
                  </Route>
                );
              });
            })
          }

          {
            privateRouter.map((routers) => {
              return routers.map((route, index) => {
                console.log(route, index);
                return route.role === "ADMIN" ? (
                  // Admin Layout
                  <Route path={route.path ? route?.path : null} element={route.element} key={index}>

                    {
                      route.children
                        ? route.children.map(({ path, Component }, index) => {
                          return (
                            <Route
                              path={path}
                              element={<Component />}
                              key={index}
                            />
                          );
                        })
                        : null
                    }
                  </Route>
                ) : null;
              });
            })
          }
        </Routes>
      </Router>

      <ToastContainer />



      {/* <Footer></Footer> */}


    </>
  );
}

export default App;
