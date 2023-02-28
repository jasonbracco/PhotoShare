import React, {useContext} from "react"
import {CartContext} from "./CartContext"

function Cart(){

    const {cart, setCart} = useContext(CartContext)

    console.log(cart)

    return (
        <div>
            Items in your cart:
        </div>
    )
}

export default Cart