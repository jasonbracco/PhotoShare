import React, {useState} from "react" 
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"
import { Button } from 'semantic-ui-react'


function SignInSignUp({setUser}){

    const [loggingIn, setLoggingIn] = useState(false)
    const [signingUp, setSigningUp] = useState(false)
    const [showButtons, setShowButtons] = useState(true)


    function loginClick(){
        setLoggingIn(true);
        setSigningUp(false);
        setShowButtons(false)
    }

    function signupClick(){
        setSigningUp(true);
        setLoggingIn(false);
        setShowButtons(false)
    } 

    function undoClick(){
        setLoggingIn(false);
        setSigningUp(false);
        setShowButtons(true)
    }

    return(
        <div>
            <p>Welcome To PhotoShare</p>
            <p>Login Below, Or Create a New Account</p>
            {loggingIn ?
                <div>
                    <LoginPage setUser={setUser} setLoggingIn={setLoggingIn} setSigningUp={setSigningUp} setShowButtons={setShowButtons}/>
                </div>
            :
            null
            }
            {signingUp ? 
                <div>
                    <SignupPage setUser={setUser} setLoggingIn={setLoggingIn} setSigningUp={setSigningUp} setShowButtons={setShowButtons}/>
                </div>
            :
            null
            }
            {showButtons ? 
            <div>
                <Button primary onClick={loginClick} className="login-button">Login</Button> 
                <Button primary onClick={signupClick} className="signup-button">Sign Up</Button>
            </div>
            :
            null
            }
        </div>
    )
}

export default SignInSignUp