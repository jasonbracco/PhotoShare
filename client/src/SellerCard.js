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
                {/* <div className="peronal-listed-items">
                    {userPhotos.map((photograph) => {
                        return <UserPhotoCard key={photograph.id} photograph={photograph} deleteUserPhoto={handleDeleteUserPhoto} updateUserPhoto={handleEditUserPhoto}/>
                    })}
                </div> */}
                </div>
                <br></br>
                <br></br>
        </div>

    )
}

export default SellerCard