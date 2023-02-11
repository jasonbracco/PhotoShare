import React from "react"

function SignupPage(){


    return (


        <div>
            Signup Here!
            <form>
                <fieldset>
                    <label>
                        <p>First Name</p>
                        <input 
                            name="firstname" 
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input 
                            name="lastname" 
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>City</p>
                        <input 
                            name="city" 
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>State/Province</p>
                        <input 
                            name="state-province" 
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>Country</p>
                        <input 
                            name="country" 
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>Bio</p>
                        <textarea
                            name="bio"
                            autoComplete="off"
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <p>Username</p>
                        <input 
                            name="username" 
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input 
                            name="password" 
                            type="password"                            
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>Password Confirmation</p>
                        <input 
                            name="password-confirmation" 
                            type="password"                            
                            autoComplete="off"
                        />
                    </label>
                </fieldset>
            </form>
        </div>

    )
}

export default SignupPage