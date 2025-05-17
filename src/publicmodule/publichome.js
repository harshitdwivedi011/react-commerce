import { HashRouter, Routes, Route, Link } from "react-router-dom";
import MyHome from "./home";
import MyLogin from "./login";
import MyCart from "./cart";
import Register from "./signup";

const PublicModule = () => {
  return (
    <HashRouter>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand">
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
                <Link className="nav-link active" to="/">
                  {" "}
                  <i className="fa fa-home"></i> Home{" "}
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link active" to="/cart">
                  {" "}
                  <i className="fa fa-shopping-cart"></i> My Cart{" "}
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link active" to="/login">
                  {" "}
                  <i className="fa fa-lock"></i> Login{" "}
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link active" to="/signup">
                  {" "}
                  <i className="fa fa-user-plus"></i> Create Account{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<MyHome />} />
        <Route exact path="/login" element={<MyLogin />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/cart" element={<MyCart />} />
      </Routes>
    </HashRouter>
  );
};

export default PublicModule;
