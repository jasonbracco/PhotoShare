import React, {useContext} from "react";
import {Link} from "react-router-dom"
import {UserContext} from "./UserContext"
import {CartContext} from "./CartContext"

function NavBar(){

    const {user, setUser} = useContext(UserContext)
    const {cart, updateCart} = useContext(CartContext)


    const cartCount = cart.length

    function handleLogout(){
        fetch("/logout", {
            method: "DELETE"})
        .then((response) => {
            if (response.ok){
                updateCart([]);
                setUser(null);
            }
        })
    }

    return(
        <div>
            <div className="Navbar">
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
                    <Link to="/" onClick={handleLogout} className="nav-link">Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar