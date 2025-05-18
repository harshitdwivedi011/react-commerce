# 🛒 React E-Commerce Platform with Role-Based Access

A full-fledged e-commerce web application built with React that supports both Buyer and Seller roles. This project simulates product browsing, cart management, and order handling using a static JSON file as a mock backend.

---

## 🧰 Tech Stack

- **Frontend:** React.js, React Router DOM  
- **Backend (Mock):** Static `data.json` file (acts as a mock DB)  
- **Authentication:** Role-based (USER & SELLER)  
- **State Management:** Component-level state and props

---

## 🚀 Key Features

- 🔐 **Authentication System** with role-based redirection  
- 🧑‍💼 **Separate Dashboards** for Buyers & Sellers  
- 🛒 **Cart System** for Buyers  
- 📦 **Product Management** for Sellers  
- 📜 **Order Tracking** for Both Roles  
- 🔄 Basic Routing using React Router DOM

---

## 📁 Folder Structure

```
📦 react-commerce/
├── App.js                 # Route configuration and redirection
├── index.js               # React entry point
├── publicmodule/          # Login, Signup, Cart, Home (Buyer-facing)
├── sellermodule/          # Dashboard, Orders, Product Management (Seller-facing)
├── usermodule/            # My Orders, Profile, Dashboard (Buyer-facing)
├── logout.js              # Logout handler
└── api/data.json          # Static mock database for users, products, and orders
```

---

## 🔄 Data Flow Overview

### 🧑‍💼 1. **Authentication Flow**

- On login/signup (via `login.js` or `signup.js`), the app verifies credentials against user records from `data.json`.
- Based on the `role` (`USER` or `SELLER`), the user is routed to their respective dashboard via `App.js`.

---

### 🛒 2. **Buyer (USER) Data Flow**

1. **Landing Page →** `publichome.js` fetches and displays available products from `data.json`.

2. **Product Interaction →** `home.js` allows buyers to view and add products to the cart.

3. **Cart →** `cart.js` maintains an array of selected items (stored in local state or context).

4. **Placing an Order →**
   - Once the buyer checks out, order details are appended to their record in `data.json`.
   - An entry is also logged under the associated seller for tracking.

5. **Order History →** `myorder.js` filters and displays orders linked to the logged-in buyer's ID.

---

### 🧑‍🔧 3. **Seller (SELLER) Data Flow**

1. **Seller Dashboard →** `dashboard.js` presents quick stats (orders, product count, etc.).

2. **Product Management →**
   - `newproduct.js` allows form-based entry to add a product into the global product list (stored in `data.json`).
   - `productlist.js` fetches and displays all products by the current seller.

3. **Order Tracking →** `orderlist.js` filters and shows orders where the seller's products were bought.

## 📦 Module Responsibilities

### 🔓 publicmodule/

| Component        | Description                                      |
|------------------|--------------------------------------------------|
| `login.js`       | Authenticates user and sets role                 |
| `signup.js`      | Registers new user (USER or SELLER)              |
| `publichome.js`  | App landing page and d isplays top products with pagination                              |
| `home.js`        | Product listing and “Add to Cart” Uses filtering and sorting.             |
| `cart.js`        | Displays cart, triggers mock order placement     |

### 👤 usermodule/

| Component        | Description                                      |
|------------------|--------------------------------------------------|
| `userhome.js`    | Dashboard showing user-specific stats            |
| `myorder.js`     | Displays past orders for the user                |
| `userProfile.js` | Displays/editable profile (static version)       |

### 🛍️ sellermodule/

| Component        | Description                                      |
|------------------|--------------------------------------------------|
| `dashboard.js`   | Seller overview panel                            |
| `newproduct.js`  | Adds new products to inventory                   |
| `productlist.js` | Shows/edit seller's own products                 |
| `orderlist.js`   | Filters and shows seller-related orders          |

---

## 🧪 How to Run the Project Locally

```bash
# 1. Go to frontend directory
cd react-commerce

# 2. Install dependencies
npm install

# 3. Run the development server
npm start
```

📌 Note: This project does not persist data beyond session refresh.
