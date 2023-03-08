import React from "react"
 
function AllPhotoCard({photograph}){

    return(
        <div>
            <div>
                <img className="selling-pic" alt="What I am Selling" src={photograph.image} />
                <br></br>
                Name: {photograph.name}
                <br></br>
                Price: ${photograph.price}
                <br></br>
            </div>
        </div>
    )
}

export default AllPhotoCard