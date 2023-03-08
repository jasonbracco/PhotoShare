import React from "react"

function SellerCard({user}){

    return(
        <div>
            <div>
                Photographer {user.id}
                <br></br>
                <img className="profile-pic" alt="seller" src={user.image} />
                <div classame="user-bio">
                    {user.bio}
                </div>
                </div>
                <br></br>
                <br></br>
        </div>

    )
}

export default SellerCard