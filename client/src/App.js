import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import {UserContext} from "./UserContext"
import {CartContext} from "./CartContext"
import NavBar from "./NavBar"
import Homepage from "./Homepage"
import Profile from "./Profile"
import Shop from "./Shop"
import PhotoPage from "./PhotoPage"
import Orders from "./Orders"
import Cart from "./Cart"
import Sellers from "./Sellers"

function App() {

  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  console.log(user)

  function updateCart(updatedCart){
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  useEffect(() => {
    fetch ("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user);
        })
      }
    })
  }, [])
 
  return (
    <div>
      <div className="header">Header</div>
      <div>Cart</div>
      <div className="side-navbar">
        <UserContext.Provider value={{user, setUser}}>
          <CartContext.Provider value={{cart, updateCart}}>
            <NavBar/>
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route exact path="/shop" element={<Shop />}>
                <Route path=":id" element={<PhotoPage />}/>
              </Route>
              <Route path="/orders" element={<Orders />}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/sellers" element={<Sellers />}/>
            </Routes>
          </CartContext.Provider>
        </UserContext.Provider >
      </div>
    </div>
  );
}

export default App;
