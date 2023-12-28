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
// import InventoryAuditInfo from "./features/InventoryAuditInfo";
// import SideBar from "./components/SideBar";
// import DashBoard from "./features/DashBoard";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import Title from "./components/Title";
import { privateRouter, publicRouter } from "./config/routes";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "./redux/aciton/user";
import { useEffect } from "react";

function App() {
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (auth.isLoading) {
    dispatch(getUserThunk())
    return <div></div>;
  }

  return (
    <>
      <Router>
        <Routes>

          {
            !auth.accessToken
              ? publicRouter.map((routers) => {
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

              : privateRouter.map((routers) => {
                return routers.map((route, index) => {
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
    </>
  );
}

export default App;
