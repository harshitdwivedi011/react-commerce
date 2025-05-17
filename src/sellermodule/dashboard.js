import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Mydashboard = () => {
  let [itemList, setItemList] = useState([]);
  let [orderList, setOrderList] = useState([]);
  const getItem = () => {
    fetch("http://localhost:1234/products")
      .then((response) => response.json())
      .then((itemArray) => {
        setItemList(itemArray);
      });
  };
  const getOrder = async () => {
    try {
      await fetch("http://localhost:1234/orders")
        .then((response) => response.json())
        .then((itemArray) => {
          setOrderList(itemArray.reverse());
        });
    } catch (error) {
      console.log("Error :" + error);
    }
  };
  useEffect(() => {
    getItem();
    getOrder()
  }, []);

  return (
    <section>
      <h1 className="heading">Seller Dashboard</h1>
      {
        <div className="container2">
          <Link className="text-decoration-none" to="/productlist">
            <div className="text-primary">
              <i className="fa fa-suitcase text-primary bg-white p-3 rounded"></i>
              <br />
              Total Product({itemList.length})
            </div>
          </Link>
          <Link className="text-decoration-none" to="/orderlist">
            <div className="text-warning">
              <i className="fa fa-headset text-warning bg-white p-3 rounded"></i>
              <br />
              Order Received ({orderList.length})
            </div>{" "}
          </Link>
          <Link className="text-decoration-none" to="/newproduct">
            <div className="text-success">
              <i className="fa fa-plus text-success bg-white p-3 rounded"></i>
              <br />
              Add New Product
            </div>{" "}
          </Link>
        </div>
      }
    </section>
  );
};
export default Mydashboard;
