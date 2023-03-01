import React, {useEffect, useState, useContext} from "react"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"
import {UserContext} from "./UserContext"
import {CartContext} from "./CartContext"



function Homepage(){

    const { user, setUser } = useContext(UserContext)
    const {cart, updateCart} = useContext(CartContext)

    const [loggedIn, setLoggedIn] = useState(true)
    
    useEffect(() => {
        if (user) setLoggedIn(false)
    }, [user])

    function handleLogout(){
        fetch("/logout", {
            method: "DELETE"})
        .then((response) => {
            if (response.ok){
                updateCart([]);
                setUser(null);
                setLoggedIn(true);
            }
        })
    }

    const [loggingIn, setLoggingIn] = useState(false)
    const [signingUp, setSigningUp] = useState(false)

    function loginClick(){
        setLoggingIn(true);
        setSigningUp(false);
    }

    function signupClick(){
        setSigningUp(true);
        setLoggingIn(false);
    }

    function undoClick(){
        setLoggingIn(false);
        setSigningUp(false);
    }

    return(
        <div>
        {loggedIn ?
        <div>
            <p>Welcome to PhotoShare</p>
            <p>Discover New Artists</p>
            <p>List Your Work</p>
            <p>Build Your Collection</p>  
            <div>
                <button onClick={loginClick} className="login-button">Login</button> 
            </div>
            <div>
                <button onClick={signupClick} className="signup-button">Sign Up</button>
            </div>
            {loggingIn ?
                <div>
                    <LoginPage setUser={setUser}/>
                    <button onClick={undoClick}>Undo</button>
                </div>
            :
            null
            }
            {signingUp ? 
                <div>
                    <SignupPage setUser={setUser}/>
                    <button onClick={undoClick} >Undo</button>
                </div>
            :
            null
            }
        </div>
        :
        <div>
            <p>Thank you for being a member!</p>
            <p>Welcome to PhotoShare</p>
            <p>Discover New Artists</p>
            <p>List Your Work</p>
            <p>Build Your Collection</p>  
            <button onClick={handleLogout}>Logout</button>
        </div>

        }
        </div>
    )
}

export default Homepage