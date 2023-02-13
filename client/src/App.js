import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import NavBar from "./NavBar"
import Homepage from "./Homepage"
import Profile from "./Pages/Profile"
import Shop from "./Pages/Shop"
import Orders from "./Pages/Orders"


function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch ("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user);
        })
      }
    })
  }, [])

  console.log(user)

  return (
    <div>
      <div className="header">Header</div>
      <div>Cart</div>
      <div className="side-navbar">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Homepage user={user} setUser={setUser} />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
