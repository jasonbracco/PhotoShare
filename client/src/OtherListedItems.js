import React, {useContext} from "react"
import {CartContext} from "./CartContext"
 
function OtherListedItems({photograph}){

    const {cart, updateCart} = useContext(CartContext)

    return(
        <div>
            <img className="selling-pic" alt="item" src={photograph.image} />
            <br></br>
            Name: {photograph.name}
            <br></br>
            Description: {photograph.description}
            <br></br>
            Price: ${photograph.formatted_price}
            <br></br>
            <button onClick={(() => updateCart([...cart, photograph]))}>Add To Cart</button>
            <br></br>
        </div>
    )
}

export default OtherListedItems