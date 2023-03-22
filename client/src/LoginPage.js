import React, {useState} from "react"
import { Button, Icon, Form } from 'semantic-ui-react'
import Error from "./Error"

 
function LoginPage({setUser, setLoggingIn, setSigningUp, setShowButtons}){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]) 

    function undoClick(){
        setLoggingIn(false);
        setSigningUp(false);
        setShowButtons(true)
    }

    function handleLogin(e){
        e.preventDefault()
        fetch ("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: 
                JSON.stringify({
                    username,
                    password
                }),
        })
        .then((response) => {
            if (response.ok){
                response.json().then((user) => {
                    setUser(user)
                })
            }
            else{
                response.json().then((error) => {
                    console.log(error)
                    setErrors(error.errors)
                })
            }
        })
    }
    return (
        <div>
            <Form onSubmit={handleLogin}>
                <fieldset>
                    <Form.Field>
                        <p>Username</p>
                        <input 
                            name="username" 
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={{
                                content: 'Please enter a valid email address',
                                pointing: 'below',
                              }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <p>Password</p>
                        <input 
                            name="password" 
                            type="password"                            
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Field>
                </fieldset>
                <Button  animated primary type="submit">
                    <Button.Content visible>Enter Photo Share!</Button.Content>
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
            </Form>
            <div>
                {errors.map((error) => (
                    <Error key={error} error={error} />
                ))}
            </div>
        </div>

    )
}

export default LoginPage