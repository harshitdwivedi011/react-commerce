import React, { useEffect, useState } from "react";

const MyOrder = () => {
  let [itemList, setItemList] = useState([]);
  const getItem = async () => {
    try {
      await fetch(
        "http://localhost:1234/orders?userId=" + localStorage.getItem("token")
      )
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
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Order Summary</h1>
      {itemList.map((items, id) => {
        return (
          <div className="row mb-5 p-4 bg-light rounded shadow-lg" key={id}>
            <div className="col-xl-3">
              <h5>Full Name: {items.customerName}</h5>
              <p>Mobile: {items.mobile}</p>
              <p>Address: {items.address}</p>
            </div>
            <div className="col-xl-9">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Photo</th>
                    <th>Item Price</th>
                    <th>Item Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.orderItems.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.Name}</td>
                        <td>
                          <img src={item.Image} alt="" height={40} width={60} />
                        </td>
                        <td>{item.Price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.quantity * item.Price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrder;
