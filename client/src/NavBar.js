import React, {useContext, useState} from "react";
import {Link} from "react-router-dom"
import {UserContext} from "./UserContext"
import {CartContext} from "./CartContext"
import { Menu } from 'semantic-ui-react';


function NavBar(){

    const {setUser} = useContext(UserContext)
    const {cart, updateCart} = useContext(CartContext)
    
    const[loggedOut, setLoggedOut] = useState(true)

    const cartCount = cart.length


    function handleLogout(){ 
        fetch("/logout", {
            method: "DELETE"})
        .then((response) => {
            if (response.ok){
                updateCart([]);
                setUser(null);
                setLoggedOut(false)
            }
        })
    }

    return(
            <div className="nav-bar">
                {loggedOut ? (
                    <Menu vertical>
                        <Menu.Item>
                            <Link to="/" className="nav-link">Homepage</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/shop" className="nav-link">Shop</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/sellers" className="nav-link">Photographers</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/orders" className="nav-link">Orders</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/cart" className="nav-link">Cart ({cartCount})</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/" onClick={handleLogout} className="nav-link">Logout</Link>
                        </Menu.Item>
                    </Menu>
                ) : ( 
                    <div>
                        Logging Out - Seeya!
                    </div>
                )}
            </div>
    )
}

export default NavBar