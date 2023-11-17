import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.scss';
import Home from "./features/Home";
import Login from "./features/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
      <ToastContainer />

    </div>

  );
}

export default App;
