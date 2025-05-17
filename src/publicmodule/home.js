import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const MyHome = () => {
  let [porder, setPorder] = useState("asc");
  let [itemList, setItemList] = useState([]);
  let [addedItems, setAddedItems] = useState([]);
  const PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(itemList.length / PER_PAGE);
  const getItem = async () => {
    try {
      await fetch("http://localhost:1234/products")
        .then((response) => response.json())
        .then((itemArray) => {
          if (porder === "asc") {
            itemArray.sort((a, b) => {
              return a.Price - b.Price;
            });
            setItemList(itemArray);
            setPorder("desc");
          } else {
            itemArray.sort((a, b) => {
              return b.Price - a.Price;
            });
            setItemList(itemArray);
            setPorder("asc");
          }
        });
    } catch (error) {
      alert("Error :" + error);
    }
  };

  const getAddedCartItems = () => {
    try {
      fetch("http://localhost:1234/carts")
        .then((response) => response.json())
        .then((items) => {
          const formattedItems = items.map((item) => ({
            name: item.Name,
            quantity: item.quantity,
          }));
          setAddedItems(formattedItems);
        });
    } catch (err) {
      console.log("Error in Getting Added Cart Items: ", err);
    }
  };
  const addToCart = (item) => {
    try {
      const isItemPresentInCart = addedItems.filter((items, id) => {
        return items.name === item.Name;
      });
      if (isItemPresentInCart.length === 0) {
        let quantity = 1;
        let modifiedItem = {
          ...item,
          quantity: quantity,
        };
        fetch("http://localhost:1234/carts", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(modifiedItem),
        })
          .then((response) => response.json())
          .then((info) => alert("Item added to Cart !"));
      } else {
        let updatedItem = {
          ...item,
          Name: isItemPresentInCart[0].name,
          quantity: isItemPresentInCart[0].quantity + 1,
        };
        let url = "http://localhost:1234/carts/" + item.id;
        let putData = {
          headers: {
            "content-type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(updatedItem),
        };
        fetch(url, putData)
          .then((response) => response.json())
          .then((info) => alert("Item Updated!"));
      }
    } catch (error) {
      console.log("Error in adding products to Cart", error);
    }
  };
  useEffect(() => {
    getItem();
    getAddedCartItems();
  }, []);
  let [keyword, setKeyword] = useState("");
  const filteredItems = keyword
    ? itemList.filter(
        (item) =>
          item.Name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.Price.toString().includes(keyword)
      )
    : itemList;
  return (
    <div classsName="container mt-5 mb-5">
      <div className="d-flex justify-content-center mb-5 mt-3 flex-wrap">
        <div className="col-xl-4"></div>
        <div className="col-xl-4">
          <div className="input-group">
            <label className="input-group-text">
              <i className="fa fa-search"></i>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search..."
              onChange={(obj) => setKeyword(obj.target.value)}
            />
          </div>
        </div>
        <div className="col-xl-4"></div>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {filteredItems.slice(offset, offset + PER_PAGE).map((item, index) => {
          return (
            <div className="m-3" style={{ width: "22%" }} key={index}>
              <div
                className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={item.Image}
                  className="card-img-top"
                  alt={item.Name}
                  style={{
                    height: "230px",
                    objectFit: "cover",
                    borderBottom: "1px solid #ddd",
                  }}
                />
                <div className="card-body text-center px-3 py-3">
                  <h5 className="card-title fw-semibold">{item.Name}</h5>
                  <p className="card-text text-muted small mb-2">
                    {item.Details}
                  </p>
                  <p className="card-text fw-bold fs-5 text-primary">
                    ₹{item.Price}
                  </p>
                </div>
                <div className="card-footer text-center bg-white border-0">
                  <button
                    className="btn btn-outline-warning btn-sm mb-3"
                    onClick={() => addToCart(item)}
                  >
                    <i className="fa fa-shopping-cart me-1"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filteredItems.length === 0 && (
          <div className="text-center mt-5">
            <h5 className="text-muted">No results found.</h5>
          </div>
        )}
      </div>
      <div className="mb-4 mt-4 text-center">
        {filteredItems.length > 0 && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination  justify-content-center"}
            pageClassName={"page-item "}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active primary"}
          />
        )}
      </div>
    </div>
  );
};

export default MyHome;
