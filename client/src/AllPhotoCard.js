import React from "react"
 
function AllPhotoCard({photograph}){

    return(
        <div>  
            <div className="shop-card-picture-space">
                <img className="selling-pic" alt="What I am Selling" src={photograph.image} />
            </div>
            <div className="shop-card-text-space">
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