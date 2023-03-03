import React, {useContext, useState} from "react"
import {CartContext} from "./CartContext"
import {UserContext} from "./UserContext"
import CartCard from "./CartCard"

function Cart(){

    const {cart, updateCart} = useContext(CartContext)
    const {user, setUser} = useContext(UserContext)

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

    const cartPrice = cart.reduce((total, item) => parseFloat(total)+parseFloat(item.price), 0);
    const sortedItems = uniqueItems.sort((itemA, itemB) => itemA.id - itemB.id)

    function handlePlaceOrder(e){
        e.preventDefault()
        if (cart.length > 0){
            cart.forEach((item) => {
                fetch("/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        photograph_id: item.id
                    })
                })
                .then((response) => {
                    if (response.ok){
                        response.json().then((order) => {
                            console.log(order)
                            setOrdering(false)
                            updateCart([])
                            
                        })
                    }
                })
            })
        }  
        else{
            console.log("add Something to your cart bro")
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
                    Total Price: ${cartPrice}
                </div>
                <button onClick={handlePlaceOrder}>Place Order Now</button>
            </div>  
        ) : (
            <div>
                Thanks for your order!
                <br></br>
                <button onClick={() => setOrdering(true)}>Back to your cart</button>
            </div>  
        )}        
        </div>

    )
}

export default Cart