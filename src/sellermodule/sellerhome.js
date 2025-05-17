import { HashRouter, Routes, Route, Link } from "react-router-dom";
import useLogout from "../logout";
import Newproduct from "./newproduct";
import Productlist from "./productlist";
import Mydashboard from "./dashboard";
import Orderlist from "./orderlist";
const SellerModule = () => {
  return (
    <HashRouter>
      <nav className="bg-dark">
        <Link to="/" className="toplink">
          <i className="fa fa-home"></i> Dashboard
        </Link>
        <Link to="/productlist" className="toplink">
          <i className="fa fa-database"></i> Product List
        </Link>
        <Link to="/newproduct" className="toplink">
          <i className="fa fa-plus"></i> New Inventory
        </Link>
        <Link to="/orderlist" className="toplink">
          <i className="fa fa-suitcase"></i> Orderlist
        </Link>
        <Link onClick={useLogout} className="toplink">
          <i className="fa fa-user"></i> {localStorage.getItem("name")}
          <i className="fa fa-power-off ms-2"></i> Logout
        </Link>
      </nav>
      <Routes>
        <Route exact path="/" element={<Mydashboard />} />
        <Route exact path="/newproduct" element={<Newproduct />} />
        <Route exact path="/productlist" element={<Productlist />} />
        <Route exact path="/orderlist" element={<Orderlist />} />
      </Routes>
    </HashRouter>
  );
};

export default SellerModule;
