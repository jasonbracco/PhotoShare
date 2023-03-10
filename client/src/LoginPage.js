import React, {useState} from "react"
import Error from "./Error"
 
function LoginPage({setUser}){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]) 

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
                response.json().then((error) => setErrors(error.errors))
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
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
                </fieldset>
                <button type="submit">
                    Enter Photo Share!
                </button>
            </form>
            <div>
                {errors.map((error) => (
                    <Error key={error} error={error} />
                ))}
            </div>
        </div>

    )
}

export default LoginPage