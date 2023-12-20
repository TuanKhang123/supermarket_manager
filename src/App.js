import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.scss';
import Home from "./features/Home";
import Login from "./features/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./features/ResetPassword";
import InventoryAuditForm from "./features/InventoryAuditForm";
import InventoryAuditDetail from "./features/InventoryAuditDetail";
import InventoryAuditInfo from "./features/InventoryAuditInfo";


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>

          <Route path="/inventory-audit-form" element={<InventoryAuditForm />}></Route>
          <Route path="/inventory-audit-detail/:id" element={<InventoryAuditDetail />}></Route>
          <Route path="/inventory-audit-info" element={<InventoryAuditInfo />}></Route>

        </Routes>
      </Router>
      <Footer></Footer>

      <ToastContainer />
    </div>

  );
}

export default App;
