import React, {useContext, useState} from "react"
import {CartContext} from "./CartContext"
import {UserContext} from "./UserContext" 
import CartCard from "./CartCard"
import CheckoutForm from "./CheckoutForm"

function Cart(){

    const {cart, updateCart} = useContext(CartContext)
    const {user} = useContext(UserContext)

    const [ordering, setOrdering] = useState(true)

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

    function handleGoToCheckout(e){
        e.preventDefault()
        if (cart.length > 0){
            // cart.forEach((item) => {
            //     fetch("/orders", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify({
            //             user_id: user.id,
            //             photograph_id: item.id
            //         })
            //     })
                // .then((response) => {
                //     if (response.ok){
                        // response.json().then((order) => {
                            setOrdering(false)
                        // })
        }
        //         })
        //     })
        // }  
        else{
            alert("Your cart is empty!  Head over to the Shop to buy some photos.")
        } 
        
    }

    return (
        <div>
            {ordering ? (
                <div>
                    Items in your cart:
                    <br></br>
                    {sortedItems.map((item) => {
                        return <CartCard key={item.id} item={item} uniqueItems={uniqueItems}/>
                    })}
                    <div>
                        Total Price: ${formattedCartPrice}
                    </div>
                    <button onClick={handleGoToCheckout}>Place Order Now</button>
                </div>  

            ) : (
                <div>
                    Items in your cart:
                    <br></br>
                    {sortedItems.map((item) => {
                        return <CartCard key={item.id} item={item} uniqueItems={uniqueItems}/>
                    })}
                    <p>Total Price: ${formattedCartPrice}</p>
                    <CheckoutForm cartPrice={cartPrice}/> 
                    <button onClick= {(() => setOrdering(true))}>Cancel</button>
                </div>
            )}        
        </div>

    ) 
}

export default Cart