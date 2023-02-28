import React, {useContext} from "react"
import {CartContext} from "./CartContext"

function CartCard({item}){

    const {cart, updateCart} = useContext(CartContext)


    return(
        <div>
            <img className= "selling-pic" src={item.image} />
            <br></br>
            <button>Minus</button>{item.count}<button>Plus</button>
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