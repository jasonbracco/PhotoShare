import React, {useContext} from "react"
import {CartContext} from "./CartContext"

function CartCard({item}){

    const {cart, setCart} = useContext(CartContext)


    return(
        <div>
            <img className= "selling-pic" src={item.image} />
            <br></br>
            Number: {item.count}
            <br></br>
            Name: {item.name}
            <br></br>
            Description: {item.description}
            <br></br>
            Price: ${item.price}
            <br></br>
            <br></br>
        </div>
    )
}

export default CartCard