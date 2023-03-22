import React, {useState} from "react";
import { Button, Icon, Form } from 'semantic-ui-react';
import Error from "./Error";
 
function SignupPage({setUser, setLoggingIn, setSigningUp, setShowButtons}){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [stateProvince, setStateProvince] = useState("");
    const [country, setCountry] = useState("");
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(null);

    function undoClick(){
        setLoggingIn(false);
        setSigningUp(false);
        setShowButtons(true);
    }

    function handleSignupSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('city', city)
        formData.append('state_province', stateProvince)
        formData.append('country', country)
        formData.append('bio', bio)
        formData.append('username', username)
        formData.append('password', password)
        formData.append('password_confirmation', passwordConfirmation)
        fetch("/signup", {
            method: "POST",
            body: formData
        })
        .then((response) => {
            if (response.ok){
                response.json().then((user) => setUser(user))
            }
            else{
                response.json().then((error) => {
                    console.log(error);
                    setErrors(error.errors);
                })
            }
        })
    }

    return (
        <div>
            <Form onSubmit={handleSignupSubmit} className="signup-form">
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
                    <label>
                        <p>Upload Profile Picture</p>
                        <input
                            name="profile-pic"
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            accept= ".jpg, .jpeg, .png"
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
                <Button  animated primary type="submit">
                    <Button.Content visible>SignUp!</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
                <Button animated primary onClick={undoClick}>
                    <Button.Content visible>Back</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left' />
                    </Button.Content>
                </Button>
                <div>
                    {errors.map((error) => (
                        <Error key={error} error={error} />
                    ))}
                </div>
            </Form>
        </div>

    )
}

export default SignupPage