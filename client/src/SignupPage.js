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

    // function handleSignupSubmit(e){
    //     e.preventDefault()
    //     const formData = {
    //         'image': image,
    //         'first_name': firstName,
    //         'last_name': lastName,
    //         'city': city,
    //         'state_province': stateProvince,
    //         'country': country,
    //         'bio': bio,
    //         'username': username,
    //         'password': password,
    //         'password_confirmation': passwordConfirmation
    //     }

    //     console.log(formData)
    //     fetch("/signup", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: formData
    //     })
    //     .then((response) => {
    //         console.log(response)
    //         if (response.ok){
    //             response.json().then((user) => setUser(user))
    //         }
    //         else{
    //             response.json().then((error) => {
    //                 console.log(error);
    //                 setErrors(error.errors);
    //             })
    //         }
    //     })
    // }

    async function handleSignupSubmit(e) {
        e.preventDefault();
    
        const formData = {
            'image': image,
            'first_name': firstName,
            'last_name': lastName,
            'city': city,
            'state_province': stateProvince,
            'country': country,
            'bio': bio,
            'username': username,
            'password': password,
            'password_confirmation': passwordConfirmation
        };
    
        console.log(formData);
    
        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            console.log(response);
    
            if (response.ok) {
                const user = await response.json();
                setUser(user);
            } else {
                const error = await response.json();
                console.log(error);
                setErrors(error.errors);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
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
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input 
                            name="lastname" 
                            placeholder="Last Name"
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
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>State/Province</p>
                        <input 
                            name="state-province" 
                            autoComplete="off"
                            placeholder="State/Province"
                            value={stateProvince}
                            onChange={(e) => setStateProvince(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Country</p>
                        <input 
                            name="country" 
                            autoComplete="off"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Bio</p>
                        <textarea
                            name="bio"
                            autoComplete="off"
                            placeholder="As much or as little as you like"
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