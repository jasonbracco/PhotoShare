import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';
import {UserContext} from "./UserContext";  
import {CartContext} from "./CartContext";
import SignInSignUp from "./SignInSignUp";
// import header from './HeaderPhoto.jpeg'
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import Profile from "./Profile";
import Shop from "./Shop";
import PhotoPage from "./PhotoPage";
import Orders from "./Orders";
import Cart from "./Cart";
import Sellers from "./Sellers";
import SellerPage from "./SellerPage";

 
function App() {

  const [user, setUser] = useState();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  function updateCart(updatedCart){
    setCart(updatedCart);
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
 
  if(!user) return <SignInSignUp setUser={setUser} />

  return (
      <div>
        <img className="header-image" src="https://play-lh.googleusercontent.com/z-y8TtRa_oG0JEdJuVnOEyPBTjGn3-IGUSWyQGTulFuQzERfbEHUJFJSGchEDzQNEcQ" alt="Header"/>
        <br></br>
        <br></br>
        <div className="whole-page">
          <UserContext.Provider value={{user, setUser}}>
            <CartContext.Provider value={{cart, updateCart}}>
                <NavBar/>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/photographs/:photoID" element={<PhotoPage />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/sellers" element={<Sellers />} />
                  <Route path="/sellerprofile/:userID" element={<SellerPage />} />
                </Routes>
            </CartContext.Provider>
          </UserContext.Provider >
        </div>
      </div>
  );
}

export default App;
