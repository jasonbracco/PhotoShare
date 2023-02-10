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
                        <p>Hometown</p>
                        <input 
                            name="hometown" 
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>State</p>
                        <input 
                            name="state" 
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
                            autoComplete="off"
                        />
                    </label>
                    <label>
                        <p>Password Confirmation</p>
                        <input 
                            name="password-confirmation" 
                            autoComplete="off"
                        />
                    </label>
                </fieldset>
            </form>
        </div>

    )
}

export default SignupPage