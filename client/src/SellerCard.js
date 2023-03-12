import React from "react"

function SellerCard({user}){

    return(
        <div>
            <div>
                {user.first_name}
                <br></br>
                <img className="profile-pic" alt="seller" src={user.image} />
                </div>
        </div>

    )
}

export default SellerCard