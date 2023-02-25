import React from "react"

function UserPhotoCard({photograph}){

    console.log(photograph)

    return(
        <div>
            <img className="selling-pic" src={photograph.image} />
            <br></br>
            {photograph.name}
            <br></br>
            {photograph.description}
            <br></br>
            {photograph.price}
            <br></br>
            <br></br>
        </div>
    )
}

export default UserPhotoCard