import React from "react"
 
function AllPhotoCard({photograph}){

    return(
        <div>
            <div>
                <img className="selling-pic" alt="What I am Selling" src={photograph.image} />
                <br></br>
                {photograph.name}
                <br></br>
                ${photograph.formatted_price}
                <br></br>
            </div>
        </div>
    )
}

export default AllPhotoCard