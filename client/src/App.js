import './App.css';
import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {UserContext} from "./UserContext";  
import {CartContext} from "./CartContext";
import SignInSignUp from "./SignInSignUp";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import Profile from "./Profile";
import Shop from "./Shop";
import PhotoPage from "./PhotoPage";
import Orders from "./Orders";
import Cart from "./Cart";
import Sellers from "./Sellers";
import SellerPage from "./SellerPage";
import 'semantic-ui-css/semantic.min.css'
 
function App() {

  const [user, setUser] = useState()
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
      <div className="whole-page">
        <header className="header">PhotoShare Header</header>
        <br></br>
        <br></br>
        <div>
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
