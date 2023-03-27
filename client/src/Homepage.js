import React, {useContext} from "react"
import {UserContext} from "./UserContext"

function Homepage(){

    const {user} = useContext(UserContext) 

    return(
        <div className="homepage">
            <p>Welcome to PhotoShare, {user.first_name}!</p>
            <p>Where Photographers Come to Find Their Next Favorite Photographer</p>
            <p></p>
            <p>Discover New Artists</p>
            <p>List Your Work</p>
            <p>Build Your Collection</p>  
            <p>Scroll Bar of photographs here?</p>
        </div>
    )
}

export default Homepage