import React, {useContext} from "react"
import {CartContext} from "./CartContext"
import CartCard from "./CartCard"

function Cart(){

    const {cart, setCart} = useContext(CartContext)

    const uniqueItems = cart.reduce((accumulator, currentValue) => {
        const find = accumulator.find(item => item.id === currentValue.id);
        if (find){
            find.count +=1;
        }
        else {
            accumulator.push({...currentValue, count: 1});
        }
        return accumulator;
    }, []);

    const cartPrice = cart.reduce((total, item) => parseFloat(total)+parseFloat(item.price), 0)
    console.log(cartPrice)

    console.log(cart)
    console.log(uniqueItems)

    return (
        <div>
            Items in your cart:
            <br></br>
            {uniqueItems.map((item) => {
               return <CartCard key={item.id} item={item} />
            })}
            <div>
                Total Price: ${cartPrice}
            </div>
        </div>

    )
}

export default Cart