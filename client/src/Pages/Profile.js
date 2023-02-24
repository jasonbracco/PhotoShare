import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../UserContext"


function Profile(){

    const {user, setUser} = useContext(UserContext)
    
    console.log(user)
    

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