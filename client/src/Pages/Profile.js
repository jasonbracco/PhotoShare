import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../UserContext"


function Profile(){

    const {user, setUser} = useContext(UserContext)
    const [testUser, setTestUser] = useState(null)

    useEffect(() => {
        fetch (`/usertest`).then((response) => {
          if (response.ok) {
            response.json().then((usertest) => {
                setTestUser(usertest)
            })
            }
        });
      }, []);
    console.log(user)
    console.log(testUser)
    

    return (
        <div>
            <img src={user.image} />
        </div>
    )
}

export default Profile 