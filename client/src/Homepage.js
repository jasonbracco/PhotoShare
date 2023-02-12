import React, {useEffect, useState} from "react"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"


function Homepage({user, setUser}){

    const [loggedIn, setLoggedIn] = useState(true)

    useEffect(() => {
        if (user) setLoggedIn(false)
        console.log(user)
    })

    const [loggingIn, setLoggingIn] = useState(false)
    const [signingUp, setSigningUp] = useState(false)

    function loginClick(){
        setLoggingIn(true)
        setSigningUp(false)
    }

    function signupClick(){
        setSigningUp(true)
        setLoggingIn(false)
    }

    function undoClick(){
        setLoggingIn(false)
        setSigningUp(false)
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
                    <LoginPage />
                    <button onClick={undoClick}>Undo</button>
                </div>
            :
            null
            }
            {signingUp ? 
                <div>
                    <SignupPage />
                    <button onClick={undoClick} setUser={setUser}>Undo</button>
                </div>
            :
            null
            }
        </div>
        :
        <div>
            
            <p>Welcome to PhotoShare</p>
            <p>Discover New Artists</p>
            <p>List Your Work</p>
            <p>Build Your Collection</p>  
            <button>Logout</button>
        </div>

        }
        </div>
    )
}

export default Homepage