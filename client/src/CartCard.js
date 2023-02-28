import React, {useContext} from "react"
import {CartContext} from "./CartContext"

function CartCard({item}){

    const {cart, updateCart} = useContext(CartContext)

    function handleRemoveAllFromCart(){
        console.log("Removed!")
        console.log(item)
        const newCart = cart.filter((cartItem) => cartItem.id !== item.id)
        updateCart(newCart)
    }

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
            <button onClick={handleRemoveAllFromCart}>Remove All From Cart</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default CartCard