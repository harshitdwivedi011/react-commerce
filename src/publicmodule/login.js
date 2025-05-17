import { useState, useRef } from "react";

const MyLogin = () => {
  let emailid = useRef("");
  let password = useRef("");
  let [message, setMessage] = useState("Enter Login Details");

  const loginCheck = (obj) => {
    obj.preventDefault(); // it stop default form behavior (refresh)
    let email = emailid.current.value;
    let pswd = password.current.value;
    setMessage("Please Wait Authenticating...");
    // alert( emailid.current.value + password.current.value );
    fetch("http://localhost:1234/account")
      .then((res) => res.json())
      .then((data) => {
        let success = data.filter((account, index) => {
          if (account.email === email && account.password === pswd)
            return account;
        });
        if (success.length > 0) {
          setMessage("Success, Redirecting...");
          localStorage.setItem("token", success[0].id);
          localStorage.setItem("usertype", success[0].type);
          localStorage.setItem("name", success[0].fullName);
          localStorage.setItem("mobile", success[0].mobile);
          window.location.reload();
        } else {
          setMessage("Failed, Invalid Email or Password!");
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-xl-4 pt-5"></div>
        <div className="col-xl-4">
          <p className="text-center">{message}</p>
          <form onSubmit={loginCheck}>
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-danger text-white">
                <i className="fa fa-lock"></i> Login
              </div>
              <div className="card-body">
                <p className="text-center text-info m-0"> </p>
                <div className="mb-4">
                  <p> Email Id </p>
                  <input type="text" className="form-control" ref={emailid} />
                </div>

                <div className="mb-4">
                  <p> Password </p>
                  <input
                    type="password"
                    className="form-control"
                    ref={password}
                  />
                </div>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-info">
                  {" "}
                  Login <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xl-4"></div>
      </div>
    </div>
  );
};

export default MyLogin;
