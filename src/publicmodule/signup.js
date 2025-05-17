import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const createAccount = () => {
    const newUserDetails = {
      fullName: userName,
      email: userEmail,
      password: password,
      mobile: mobile,
      type: role,
    };
    try {
      fetch("http://localhost:1234/account", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(newUserDetails),
      })
        .then((response) => response.json())
        .then(() => alert("Account Created Successfully"));
      setUserName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setRole("");
      navigate("/login");
    } catch (err) {
      console.log("Error in Sign Up !", err);
    }
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-xl-3"></div>
        <div className="col-xl-6">
          <form onSubmit={createAccount}>
            <div className="card bg-light rounded shadow-lg border-1">
              <div className="card-header bg-danger text-white text-center p-3 fs-5">
                <i className="fa fa-user-plus"></i> Create Account
              </div>
              <div className="row m-4">
                <div className="col-xl-3">Full Name</div>
                <div className="col-xl-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row m-4">
                <div className="col-xl-3">Mobile No.</div>
                <div className="col-xl-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Contact Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row m-4">
                <div className="col-xl-3">Email</div>
                <div className="col-xl-9">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter valid Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={userEmail}
                    required
                  />
                </div>
              </div>
              <div className="row m-4">
                <div className="col-xl-3">Password</div>
                <div className="col-xl-9">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row m-4">
                <div className="col-xl-3">Select Role:</div>
                <div className="col-xl-9">
                  <select
                    className="form-select"
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Choose Role</option>
                    <option value="USER">User</option>
                  </select>
                </div>
              </div>
              <div className="text-center mb-4">
                <button className="btn btn-success me-2">Create Account</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xl-3"></div>
      </div>
    </div>
  );
};

export default Register;
