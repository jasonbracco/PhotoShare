import React from "react";
import {Link} from "react-router-dom"

function NavBar(){

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
                    <Link to="/orders" className="nav-link">Orders</Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar