import React, {useContext} from "react"
import {CartContext} from "./CartContext"


function AllPhotoCard({photograph}){

    const {cart, updateCart} = useContext(CartContext)

    function handleAddToCart(e){
        e.preventDefault()
        updateCart([...cart, photograph])    
    }
 
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
            <button onClick={handleAddToCart}>Add To Cart</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default AllPhotoCard