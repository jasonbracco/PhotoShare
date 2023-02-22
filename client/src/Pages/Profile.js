import React, {useContext} from "react"
import {UserContext} from "../UserContext"


function Profile(){

    const {user, setUser} = useContext(UserContext)

    console.log(user)

    return (
        <div>
            Image: 
        </div>
    )
}

export default Profile