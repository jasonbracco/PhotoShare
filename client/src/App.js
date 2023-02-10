import NavBar from "./NavBar"
import {Route, Routes} from "react-router-dom"
import Homepage from "./Homepage"
import Profile from "./Pages/Profile"
import Shop from "./Pages/Shop"
import Orders from "./Pages/Orders"


function App() {

  return (
    <div>
      <div className="header">Header</div>
      <div>Cart</div>
      <div className="side-navbar">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
