import React, {useContext, useState, useEffect} from "react"
import {CartContext} from "./CartContext"
import CartCard from "./CartCard"
import CheckoutForm from "./CheckoutForm"

function Cart(){

    const {cart} = useContext(CartContext)

    const [ordering, setOrdering] = useState(true)
    const [nothingInCart, setNothingInCart] = useState(false)

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

    const cartPrice = cart.reduce((total, item) => parseFloat(total)+parseFloat(item.formatted_price), 0);
    const formattedCartPrice = cartPrice.toFixed(2)

    const sortedItems = uniqueItems.sort((itemA, itemB) => itemA.id - itemB.id)

    useEffect(() => {
        if(cartPrice > 0){
            setNothingInCart(true)
        }
        else{
            setNothingInCart(false)
        }
    }, [cartPrice])

    return (
        <div>
            {ordering ? (
                <div>
                    {nothingInCart ? (
                        <div>
                            <p>Your Cart:</p>
                            <br></br>
                            {sortedItems.map((item) => {
                                return <CartCard key={item.id} item={item} uniqueItems={uniqueItems}/>
                            })}
                            Total Price: ${formattedCartPrice}
                            <br></br>
                            <button onClick={(() => setOrdering(false))}>Place Order Now</button>
                        </div>
                    ) : (
                        <div>
                            <br></br>
                            <br></br>
                            Nothing in Your Cart!  Head Over To The Shop to Browse Some Photographs!
                        </div>
                    )}
                </div>  
            ) : (
                <div>
                    {nothingInCart ? (
                        <div>
                            Your Items:
                            <br></br>
                            {sortedItems.map((item) => {
                                return <CartCard key={item.id} item={item} uniqueItems={uniqueItems}/>
                            })}
                            <p>Total Price: ${formattedCartPrice}</p>
                            <CheckoutForm cartPrice={cartPrice}/> 
                            <button onClick= {(() => setOrdering(true))}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <br></br>
                            <br></br>
                            Nothing in Your Cart!  Head Over To The Shop to Browse Some Photographs!
                        </div>
                    )}
                </div>
            )}        
        </div>

    ) 
}

export default Cart