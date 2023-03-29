import React, {useContext} from "react"
import {UserContext} from "./UserContext"


function Homepage(){

    const {user} = useContext(UserContext) 

    return(
        <div className="homepage">
            <h2>Welcome to PhotoShare, {user.first_name}!</h2>
            <h3>Step In And Find Your Next Favorite Photographer</h3>
            <p></p>
            <h4>Discover New Artists</h4>
            <h4>Build Your Collection </h4>  
            <h4>Get Discovered</h4>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Homepage