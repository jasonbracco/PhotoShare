import React from "react"

function AllPhotoCard({photograph}){

    return(
        <div>
            <img className="selling-pic" src={photograph.image} />
            <br></br>
            Seller: 
            <br></br>
            Name: {photograph.name}
            <br></br>
            Description: {photograph.description}
            <br></br>
            Price: ${photograph.price}
            <br></br>
            <button>More Info</button>
            <button>Add To Cart</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default AllPhotoCard