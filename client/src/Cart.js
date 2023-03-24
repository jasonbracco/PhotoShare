import React, {useContext, useState, useEffect} from "react"
import {CartContext} from "./CartContext"
import CartCard from "./CartCard"
import CheckoutForm from "./CheckoutForm"
import {Grid, Button} from 'semantic-ui-react'

function Cart(){

    const {cart} = useContext(CartContext);

    const [ordering, setOrdering] = useState(true);
    const [nothingInCart, setNothingInCart] = useState(false);

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
    const formattedCartPrice = cartPrice.toFixed(2);

    const sortedItems = uniqueItems.sort((itemA, itemB) => itemA.id - itemB.id);
 
    useEffect(() => {
        if(cartPrice > 0){
            setNothingInCart(true);
        }
        else{
            setNothingInCart(false);
        }
    }, [cartPrice])

    return (
        <div className="cart">
            {ordering ? (
                <div>
                    {nothingInCart ? (
                        <div className="user=photos">
                            <h2>Your Cart (${formattedCartPrice}):</h2>
                            <br></br>
                            <Button color="blue" animated='fade' onClick={(() => setOrdering(false))}>
                                <Button.Content visible>Place Order</Button.Content>
                                <Button.Content hidden>${formattedCartPrice}</Button.Content>
                            </Button>
                            <br></br>
                            <br></br>
                            <Grid container columns={3}>
                                {sortedItems.map((item) => {
                                    return <Grid.Column key={item.id}>
                                        <CartCard key={item.id} item={item} uniqueItems={uniqueItems}/>
                                    </Grid.Column>
                                })}
                            </Grid>
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
                            <h2>Your Cart (${formattedCartPrice}):</h2>
                            <br></br>
                            <Button color="blue" animated='fade' onClick={(() => setOrdering(false))}>
                                <Button.Content visible>Place Order</Button.Content>
                                <Button.Content hidden>${formattedCartPrice}</Button.Content>
                            </Button>
                            <br></br>
                            <br></br>
                            <Grid container columns={3}>
                                {sortedItems.map((item) => {
                                    return <Grid.Column key={item.id}>
                                        <CartCard key={item.id} item={item} uniqueItems={uniqueItems}/>
                                    </Grid.Column>
                                })}
                            </Grid>
                            <Button secondary onClick= {(() => setOrdering(true))}>Cancel</Button>
                            <br></br>
                            <br></br>
                            <CheckoutForm cartPrice={cartPrice}/> 
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