import React, {useContext} from "react"
import {CartContext} from "./CartContext"
import CartCard from "./CartCard"

function Cart(){

    const {cart, updateCart} = useContext(CartContext)

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

    const cartPrice = cart.reduce((total, item) => parseFloat(total)+parseFloat(item.price), 0);
    const sortedItems = uniqueItems.sort((itemA, itemB) => itemA.id - itemB.id)

    return (
        <div>
            Items in your cart:
            <br></br>
            {sortedItems.map((item) => {
               return <CartCard key={item.id} item={item} uniqueItems={uniqueItems}/>
            })}
            <div>
                Total Price: ${cartPrice}
            </div>
            <button>Place Order Now</button>
        </div>

    )
}

export default Cart