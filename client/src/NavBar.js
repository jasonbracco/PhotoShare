import React, {useContext} from "react";
import {Link} from "react-router-dom"
import {CartContext} from "./CartContext"

function NavBar(){

    const {cart} = useContext(CartContext)

    const cartCount = cart.length

    return(
        <div>
            <div className="Navbar">
                <p className="NavBar-image">Image here</p>
                <div className="NavBar-options">
                    <Link to="/" className="nav-link">Homepage</Link>
                    <br></br>
                    <br></br>
                    <Link to="/profile" className="nav-link">Profile</Link>
                    <br></br>
                    <br></br>
                    <Link to="/shop" className="nav-link">Shop</Link>
                    <br></br>
                    <br></br>
                    <Link to="/sellers" className="nav-link">Photographers</Link>
                    <br></br>
                    <br></br>
                    <Link to="/orders" className="nav-link">Orders</Link>
                    <br></br>
                    <br></br>
                    <Link to="/cart" className="nav-link">Cart ({cartCount})</Link>
                    <br></br>
                    <br></br>
                </div>
            </div>
        </div>
    )
}

export default NavBar