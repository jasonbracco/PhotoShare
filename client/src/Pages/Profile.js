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
            <button className="list-work-button">List Work</button>
            <img className="profile-pic" src={user.image} />
            <div classame="user-bio">
                {user.bio}
            </div>
            <div className="peronal-listed-items">
                All of the works that I am selling will go here
            </div>
        </div>
    )
}

export default Profile 