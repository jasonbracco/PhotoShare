import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import {UserContext} from "./UserContext"
import NavBar from "./NavBar"
import Homepage from "./Homepage"
import Profile from "./Pages/Profile"
import Shop from "./Pages/Shop"
import Orders from "./Pages/Orders"


function App() {

  const [user, setUser] = useState(null)
  console.log(user)

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
        <UserContext.Provider value={{user, setUser}} />
        <NavBar/>
        <Routes>
          <Route path="/" element={<Homepage user={user} setUser={setUser} />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <UserContext.Provider />
      </div>
    </div>
  );
}

export default App;
