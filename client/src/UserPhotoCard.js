import React from "react"

function UserPhotoCard({photograph}){

    return(
        <div>
            <img className="selling-pic" src={photograph.image} />
            <br></br>
            Name: {photograph.name}
            <br></br>
            Description: {photograph.description}
            <br></br>
            Price: ${photograph.price}
            <br></br>
            <br></br>
        </div>
    )
}

export default UserPhotoCard