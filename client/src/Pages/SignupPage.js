import React, {useState} from "react"
import Error from "../Error"

function SignupPage(){

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [stateProvince, setStateProvince] = useState("")
    const [country, setCountry] = useState("")
    const [bio, setBio] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])

    function handleSignupSubmit(e){
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                city,
                state_province: stateProvince,
                country,
                bio,
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        })
        .then((response) => {
            if (response.ok){
                response.json().then((user) => console.log(user))
            }
            else{
                response.json().then((error) => console.log(error))
            }
        })
    }

    return (
        <div>
            Signup Here!
            <form onSubmit={handleSignupSubmit}>
                <fieldset>
                    <label>
                        <p>First Name</p>
                        <input 
                            name="firstname"
                            autoComplete="off"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input 
                            name="lastname" 
                            autoComplete="off"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>City</p>
                        <input 
                            name="city" 
                            autoComplete="off"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>State/Province</p>
                        <input 
                            name="state-province" 
                            autoComplete="off"
                            value={stateProvince}
                            onChange={(e) => setStateProvince(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Country</p>
                        <input 
                            name="country" 
                            autoComplete="off"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Bio</p>
                        <textarea
                            name="bio"
                            autoComplete="off"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <p>Username</p>
                        <input 
                            name="username" 
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input 
                            name="password" 
                            type="password"                            
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Password Confirmation</p>
                        <input 
                            name="password-confirmation" 
                            type="password"                            
                            autoComplete="off"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </label>
                </fieldset>
                <button type="submit">
                    Sign Up!
                </button>
                <div>
                    {errors.map((error) => (
                        <Error key={error} error={error} />
                    ))}
                </div>
            </form>
        </div>

    )
}

export default SignupPage