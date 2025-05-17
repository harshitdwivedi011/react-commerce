import PublicModule from "./publicmodule/publichome";
import UserModule from "./usermodule/userhome";
import SellerModule from "./sellermodule/sellerhome";

function App() {
  let id = localStorage.getItem("token");
  if (id != null) {
    let role = localStorage.getItem("usertype");
    switch (role) {
      case "USER":
        return <UserModule />;

      case "SELLER":
        return <SellerModule />;

      default:
        return <UserModule />;
    }
  } else {
    return <PublicModule />;
  }
}

export default App;
