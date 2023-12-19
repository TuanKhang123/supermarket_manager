import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.scss';
import Home from "./features/Home";
import Login from "./features/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Import from "./features/Import";
import { ToastContainer } from "react-toastify";
import Register from "./features/Register";


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/import" element={<Import />}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
      <ToastContainer />

    </div>

  );
}

export default App;
