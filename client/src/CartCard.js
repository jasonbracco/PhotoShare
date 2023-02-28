import React, {useContext} from "react"
import {CartContext} from "./CartContext"

function CartCard({item}){

    const {cart, updateCart} = useContext(CartContext)

    function handleRemoveAllFromCart(){
        console.log("Removed!")
        const newCart = cart.filter((cartItem) => cartItem.id !== item.id)
        updateCart(newCart)
    }

    function addOneToCart(e){
        e.preventDefault()
        updateCart([...cart, item])
    }

    return(
        <div>
            <img className= "selling-pic" src={item.image} />
            <br></br>
            <button>Minus</button>{item.count}<button onClick={addOneToCart}>Plus</button>
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