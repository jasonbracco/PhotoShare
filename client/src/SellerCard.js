import React from "react"

function SellerCard({user}){

    return(
        <div>
            <div>
                {user.first_name}
                <br></br>
                <img className="profile-pic" alt="seller" src={user.image} />
                </div>
                <br></br>
                <br></br>
        </div>

    )
}

export default SellerCard