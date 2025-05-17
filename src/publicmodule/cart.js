import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  let [itemList, setItemList] = useState([]);
  const getItem = async () => {
    try {
      await fetch("http://localhost:1234/carts")
        .then((response) => response.json())
        .then((itemArray) => {
          setItemList(itemArray);
        });
    } catch (error) {
      console.log("Error :" + error);
    }
  };
  useEffect(() => {
    getItem();
  }, []);
  const navigate = useNavigate();
  const deleteFromCart = (id) => {
    let url = "http://localhost:1234/carts/" + id;
    let postData = { method: "delete" };
    fetch(url, postData)
      .then((response) => response.json())
      .then((info) => {
        getItem();
      });
  };
  const updateQty = (item, str) => {
    if (str === "D") item["quantity"] = item.quantity - 1;
    else item["quantity"] = item.quantity + 1;

    if (item.quantity === 0) deleteFromCart(item.id);

    let url = "http://localhost:1234/carts/" + item.id;
    let putData = {
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(item),
    };
    fetch(url, putData)
      .then((response) => response.json())
      .then((info) => getItem());
  };
  let totalAmount = 0;
  let [fullName, setName] = useState(localStorage.getItem("name"));
  let [mobile, setMobile] = useState(localStorage.getItem("mobile"));
  let [address, setAddress] = useState("");
  const loginCheck = () => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      let url = "http://localhost:1234/orders";
      let orderData = {
        customerName: fullName,
        mobile: mobile,
        address: address,
        userId: localStorage.getItem("token"),
        orderItems: itemList,
      };
      let postData = {
        headers: { "content-type": "application/json" },
        method: "post",
        body: JSON.stringify(orderData),
      };
      fetch(url, postData)
        .then((response) => response.json())
        .then(() => {
          alert("Order Placed Successfully.");
          setName("");
          setAddress("");
          setMobile("");
          setItemList([])
        });
    }
  };

  let showBlock = "";
  if (!localStorage.getItem("token")) {
    showBlock = "d-none";
  } else {
    showBlock = "d-block";
  }
  return (
    <section className="container mt-5 mb-5">
      <div className="row">
        <div className="col-xl-12">
          <h3 className="text-center mb-4">{itemList.length}: Items in Cart</h3>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Photo</th>
                <th>Item Price</th>
                <th>Item Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item, index) => {
                totalAmount += item.quantity * item.Price;
                return (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td>
                      <img src={item.Image} alt="" height={40} width={60} />
                    </td>
                    <td>{item.Price}</td>
                    <td className="input-group">
                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => updateQty(item, "D")}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="btn btn-success btn-sm ms-1"
                        onClick={() => updateQty(item, "I")}
                      >
                        +
                      </button>
                    </td>
                    <td>{item.quantity * item.Price}</td>
                    <td>
                      <button
                        className="btn btn-danger text-white"
                        onClick={() => deleteFromCart(item.id)}
                      >
                        <i className="fa fa-trash fa-lg"></i> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-center">
            <b> Total Amount: {totalAmount} </b>
          </p>
          <div className={showBlock}>
            <div className="row p-4 bg-light rounded">
              <h3 className="mb-4 text-center text-primary">
                Enter Delivery Details
              </h3>
              <div className="col-xl-4">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-xl-4">
                <label>Mobile No.</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="col-xl-4">
                <label>Delivery Address</label>
                <textarea
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="text-center mt-1 mb-5">
            <button
              className="btn btn-primary me-2 btn-lg"
              onClick={loginCheck}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCart;
