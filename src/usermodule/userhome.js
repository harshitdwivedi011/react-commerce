import { HashRouter, Routes, Route, Link } from "react-router-dom";
import useLogout from "../logout";
import MyOrder from "./myorder";
import MyProfile from "./userProfile";
import MyHome from "../publicmodule/home";
import MyCart from "../publicmodule/cart";

const UserModule = () => {
  return (
    <HashRouter>
      <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
        <div className="container">
          <Link className="navbar-brand me-auto">
            {" "}
            <i className="fa fa-shopping-bag fa-lg"></i> React Shopping{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item me-4">
                <Link to="/" className="toplink">
                  <i className="fa fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link to="/mycart" className="toplink">
                  <i className="fa fa-shopping-cart"></i> My Cart
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link to="/profile" className="toplink">
                  <i className="fa fa-edit"></i> My Profile
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link to="/orders" className="toplink">
                  <i className="fa fa-headset"></i> My Orders
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link className="toplink">
                  <i className="fa fa-user"></i>
                  {localStorage.getItem("name")}
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link className="toplink" onClick={useLogout}>
                  {" "}
                  <i className="fa fa-power-off"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<MyHome />} />
        <Route exact path="/mycart" element={<MyCart />} />
        <Route exact path="/profile" element={<MyProfile />} />
        <Route path="/orders" element={<MyOrder />} />
      </Routes>
    </HashRouter>
  );
};

export default UserModule;
