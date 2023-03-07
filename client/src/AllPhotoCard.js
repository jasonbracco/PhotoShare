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
            <div>
                <img className="selling-pic" alt="What I am Selling" src={photograph.image} />
                <br></br>
                Name: {photograph.name}
                <br></br>
                Price: ${photograph.price}
                <br></br>
            </div>
            <button onClick={handleAddToCart}>Add To Cart</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default AllPhotoCard