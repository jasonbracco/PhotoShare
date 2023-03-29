import React from "react"

 
function SellerCard({user}){ 

    return(
        <div>
            <h4>{user.first_name}:</h4>
            <img className="profile-pic" alt="seller" src={user.image} />
        </div>
    )
}

export default SellerCard